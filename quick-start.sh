#!/bin/bash

# Minizon E-commerce Quick Start Deployment Script
# This script provides a quick way to get started with the deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="minizon-shop-spark"
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

# Main menu
show_menu() {
    echo ""
    echo "🚀 Minizon E-commerce Deployment Menu"
    echo "======================================"
    echo "1. Check Prerequisites"
    echo "2. Build Docker Image"
    echo "3. Test Local Deployment"
    echo "4. Deploy to Kubernetes (Local)"
    echo "5. Run Full Deployment Script"
    echo "6. View Deployment Status"
    echo "7. Clean Up Resources"
    echo "8. Exit"
    echo ""
    read -p "Select an option (1-8): " choice
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local tools=("git" "docker" "kubectl" "terraform" "ansible")
    local missing_tools=()
    
    for tool in "${tools[@]}"; do
        if ! command -v $tool &> /dev/null; then
            missing_tools+=($tool)
        fi
    done
    
    if [ ${#missing_tools[@]} -eq 0 ]; then
        log_success "All prerequisites are installed"
    else
        log_warning "Missing tools: ${missing_tools[*]}"
        echo "Please install the missing tools before proceeding."
        echo "Refer to the COMPLETE_DEPLOYMENT_GUIDE.md for installation instructions."
    fi
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
        log_info "Application is running at http://localhost:8080"
        echo "Press Enter to stop the test container..."
        read
        docker stop test-container
        docker rm test-container
    else
        log_error "Docker image test failed"
        exit 1
    fi
}

test_local_deployment() {
    log_info "Starting local deployment with Docker Compose..."
    
    # Start the application
    docker-compose -f docker/docker-compose.yml up -d
    
    log_success "Local deployment started"
    log_info "Application is running at http://localhost:3000"
    log_info "Health check available at http://localhost:3000/health"
    
    echo "Press Enter to stop the local deployment..."
    read
    docker-compose -f docker/docker-compose.yml down
}

deploy_to_kubernetes_local() {
    log_info "Deploying to local Kubernetes..."
    
    # Check if kubectl is available
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed. Please install it first."
        return
    fi
    
    # Check if we can connect to a cluster
    if ! kubectl cluster-info &> /dev/null; then
        log_warning "Cannot connect to Kubernetes cluster"
        log_info "Please ensure you have a Kubernetes cluster running (e.g., minikube, kind, or cloud cluster)"
        return
    fi
    
    # Create namespace
    kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
    
    # Deploy the application
    kubectl apply -f k8s/deployment.yaml -n $NAMESPACE
    kubectl apply -f k8s/service.yaml -n $NAMESPACE
    kubectl apply -f k8s/ingress.yaml -n $NAMESPACE
    kubectl apply -f k8s/hpa.yaml -n $NAMESPACE
    
    # Wait for deployment
    log_info "Waiting for deployment to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/minizon-frontend -n $NAMESPACE
    
    log_success "Application deployed to Kubernetes"
    
    # Show status
    kubectl get pods -n $NAMESPACE
    kubectl get services -n $NAMESPACE
    kubectl get ingress -n $NAMESPACE
}

run_full_deployment() {
    log_info "Running full deployment script..."
    
    if [ -f "./deploy.sh" ]; then
        chmod +x ./deploy.sh
        ./deploy.sh
    else
        log_error "deploy.sh not found. Please ensure you're in the project root directory."
    fi
}

view_deployment_status() {
    log_info "Checking deployment status..."
    
    # Check Docker containers
    echo "=== Docker Containers ==="
    docker ps -a | grep $PROJECT_NAME || echo "No containers found"
    
    # Check Kubernetes resources
    if command -v kubectl &> /dev/null && kubectl cluster-info &> /dev/null; then
        echo ""
        echo "=== Kubernetes Pods ==="
        kubectl get pods -n $NAMESPACE 2>/dev/null || echo "No pods found or namespace doesn't exist"
        
        echo ""
        echo "=== Kubernetes Services ==="
        kubectl get services -n $NAMESPACE 2>/dev/null || echo "No services found or namespace doesn't exist"
        
        echo ""
        echo "=== Kubernetes Ingress ==="
        kubectl get ingress -n $NAMESPACE 2>/dev/null || echo "No ingress found or namespace doesn't exist"
    else
        log_warning "kubectl not available or no cluster connection"
    fi
}

cleanup_resources() {
    log_info "Cleaning up resources..."
    
    # Stop and remove Docker containers
    docker ps -a | grep $PROJECT_NAME | awk '{print $1}' | xargs -r docker rm -f
    
    # Remove Docker images
    docker images | grep $PROJECT_NAME | awk '{print $3}' | xargs -r docker rmi -f
    
    # Stop Docker Compose
    docker-compose -f docker/docker-compose.yml down 2>/dev/null || true
    
    # Remove Kubernetes resources
    if command -v kubectl &> /dev/null && kubectl cluster-info &> /dev/null; then
        kubectl delete namespace $NAMESPACE 2>/dev/null || true
    fi
    
    log_success "Cleanup completed"
}

# Main loop
main() {
    log_info "Welcome to Minizon E-commerce Deployment!"
    log_info "This script will help you deploy your application using various methods."
    
    while true; do
        show_menu
        
        case $choice in
            1)
                check_prerequisites
                ;;
            2)
                build_docker_image
                ;;
            3)
                test_local_deployment
                ;;
            4)
                deploy_to_kubernetes_local
                ;;
            5)
                run_full_deployment
                ;;
            6)
                view_deployment_status
                ;;
            7)
                cleanup_resources
                ;;
            8)
                log_info "Goodbye! 👋"
                exit 0
                ;;
            *)
                log_error "Invalid option. Please select 1-8."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Error handling
trap 'log_error "Script interrupted"; exit 1' INT TERM

# Run main function
main "$@"
