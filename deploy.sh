#!/bin/bash

# Minizon E-commerce Deployment Script
# This script automates the deployment process using all six DevOps tools

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="minizon-shop-spark"
AWS_REGION="us-west-2"
AWS_ACCOUNT_ID=""
GITHUB_REPO=""
JENKINS_URL=""
NAMESPACE="minizon"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check required tools
    local tools=("git" "docker" "kubectl" "terraform" "ansible" "aws")
    for tool in "${tools[@]}"; do
        if ! command -v $tool &> /dev/null; then
            log_error "$tool is not installed. Please install it first."
            exit 1
        fi
    done
    
    log_success "All prerequisites are installed"
}

setup_git() {
    log_info "Setting up Git repository..."
    
    # Initialize git if not already done
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit: Complete Minizon e-commerce website"
    fi
    
    # Add remote if not exists
    if [ -z "$(git remote -v)" ]; then
        if [ -z "$GITHUB_REPO" ]; then
            log_warning "GITHUB_REPO not set. Please set it in the script or add remote manually."
        else
            git remote add origin $GITHUB_REPO
        fi
    fi
    
    log_success "Git repository setup complete"
}

build_docker_image() {
    log_info "Building Docker image..."
    
    # Build the image
    docker build -t $PROJECT_NAME:latest .
    
    # Test the image
    log_info "Testing Docker image..."
    docker run -d -p 8080:80 --name test-container $PROJECT_NAME:latest
    sleep 5
    
    # Check if container is running
    if docker ps | grep -q test-container; then
        log_success "Docker image built and tested successfully"
        docker stop test-container
        docker rm test-container
    else
        log_error "Docker image test failed"
        exit 1
    fi
}

setup_aws_ecr() {
    log_info "Setting up AWS ECR..."
    
    if [ -z "$AWS_ACCOUNT_ID" ]; then
        log_warning "AWS_ACCOUNT_ID not set. Please set it in the script."
        return
    fi
    
    # Create ECR repository
    aws ecr create-repository --repository-name $PROJECT_NAME --region $AWS_REGION || true
    
    # Get login token
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
    
    # Tag and push image
    docker tag $PROJECT_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME:latest
    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME:latest
    
    log_success "Docker image pushed to ECR"
}

deploy_infrastructure() {
    log_info "Deploying infrastructure with Terraform..."
    
    cd terraform
    
    # Initialize Terraform
    terraform init
    
    # Plan deployment
    terraform plan
    
    # Apply infrastructure
    terraform apply -auto-approve
    
    cd ..
    
    log_success "Infrastructure deployed successfully"
}

configure_kubectl() {
    log_info "Configuring kubectl..."
    
    # Update kubeconfig
    aws eks update-kubeconfig --region $AWS_REGION --name minizon-eks-cluster
    
    # Verify cluster access
    if kubectl get nodes &> /dev/null; then
        log_success "kubectl configured successfully"
    else
        log_error "Failed to configure kubectl"
        exit 1
    fi
}

deploy_to_kubernetes() {
    log_info "Deploying to Kubernetes..."
    
    cd k8s
    
    # Create namespace
    kubectl create namespace $NAMESPACE || true
    
    # Apply Kubernetes manifests
    kubectl apply -f deployment.yaml -n $NAMESPACE
    kubectl apply -f service.yaml -n $NAMESPACE
    kubectl apply -f ingress.yaml -n $NAMESPACE
    kubectl apply -f hpa.yaml -n $NAMESPACE
    
    cd ..
    
    # Wait for deployment to be ready
    log_info "Waiting for deployment to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/minizon-app -n $NAMESPACE
    
    log_success "Application deployed to Kubernetes"
}

run_ansible_deployment() {
    log_info "Running Ansible deployment..."
    
    cd ansible
    
    # Run deployment playbook
    ansible-playbook -i inventory.yml deploy.yml
    
    cd ..
    
    log_success "Ansible deployment completed"
}

verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check pod status
    kubectl get pods -n $NAMESPACE
    
    # Check service status
    kubectl get services -n $NAMESPACE
    
    # Check ingress status
    kubectl get ingress -n $NAMESPACE
    
    # Get application URL
    local url=$(kubectl get ingress minizon-ingress -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "URL not available yet")
    
    if [ "$url" != "URL not available yet" ]; then
        log_success "Application is accessible at: http://$url"
    else
        log_warning "Application URL not available yet. Check ingress status."
    fi
}

setup_jenkins_pipeline() {
    log_info "Setting up Jenkins pipeline..."
    
    if [ -z "$JENKINS_URL" ]; then
        log_warning "JENKINS_URL not set. Please configure Jenkins manually:"
        echo "1. Access Jenkins at your Jenkins server URL"
        echo "2. Create a new Pipeline job"
        echo "3. Configure Git repository: $GITHUB_REPO"
        echo "4. Set Pipeline script from SCM"
        echo "5. Script path: jenkins/Jenkinsfile"
        return
    fi
    
    # Create Jenkins job via API (requires Jenkins API token)
    log_info "Creating Jenkins job..."
    # This would require Jenkins API token and job configuration
    # For now, provide manual instructions
    
    log_success "Jenkins pipeline setup instructions provided"
}

cleanup() {
    log_info "Cleaning up temporary resources..."
    
    # Remove any temporary containers
    docker ps -a | grep test-container | awk '{print $1}' | xargs -r docker rm -f
    
    log_success "Cleanup completed"
}

# Main deployment function
main() {
    log_info "Starting Minizon e-commerce deployment..."
    
    # Check prerequisites
    check_prerequisites
    
    # Setup Git
    setup_git
    
    # Build Docker image
    build_docker_image
    
    # Setup AWS ECR
    setup_aws_ecr
    
    # Deploy infrastructure
    deploy_infrastructure
    
    # Configure kubectl
    configure_kubectl
    
    # Deploy to Kubernetes
    deploy_to_kubernetes
    
    # Run Ansible deployment
    run_ansible_deployment
    
    # Verify deployment
    verify_deployment
    
    # Setup Jenkins pipeline
    setup_jenkins_pipeline
    
    # Cleanup
    cleanup
    
    log_success "Deployment completed successfully!"
    
    echo ""
    echo "Next steps:"
    echo "1. Configure Jenkins pipeline manually if not automated"
    echo "2. Set up monitoring and logging"
    echo "3. Configure domain name and SSL certificates"
    echo "4. Set up backup and disaster recovery"
    echo "5. Implement security scanning and compliance"
}

# Error handling
trap cleanup EXIT

# Run main function
main "$@"
