# 🚀 Minizon E-commerce Deployment Guide

## Overview
This guide provides step-by-step instructions to deploy the Minizon e-commerce website using the six DevOps tools:
- **Git** - Version control and code management
- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **Terraform** - Infrastructure as Code
- **Jenkins** - CI/CD Pipeline
- **Ansible** - Configuration management

## Prerequisites

### Required Tools
- Git
- Docker & Docker Compose
- kubectl (Kubernetes CLI)
- Terraform
- Jenkins
- Ansible
- AWS CLI (for cloud deployment)

### Required Accounts
- AWS Account with appropriate permissions
- GitHub/GitLab account
- Jenkins server access

---

## Phase 1: Git Repository Setup

### 1.1 Initialize Git Repository
```bash
# Navigate to project directory
cd minizon-shop-spark

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Complete Minizon e-commerce website"

# Add remote repository (replace with your actual repo)
git remote add origin https://github.com/yourusername/minizon-shop-spark.git

# Push to remote
git push -u origin main
```

### 1.2 Create Branch Strategy
```bash
# Create development branch
git checkout -b develop
git push -u origin develop

# Create feature branch for new features
git checkout -b feature/new-feature
git push -u origin feature/new-feature
```

---

## Phase 2: Docker Containerization

### 2.1 Build Docker Image
```bash
# Build the Docker image
docker build -t minizon-shop:latest .

# Test the image locally
docker run -p 8080:80 minizon-shop:latest
```

### 2.2 Test with Docker Compose
```bash
# Test development environment
docker-compose -f docker/docker-compose.yml up -d

# Test production environment
docker-compose -f docker/docker-compose.prod.yml up -d
```

### 2.3 Push to Container Registry
```bash
# Tag image for ECR
docker tag minizon-shop:latest your-account-id.dkr.ecr.region.amazonaws.com/minizon-shop:latest

# Push to ECR
docker push your-account-id.dkr.ecr.region.amazonaws.com/minizon-shop:latest
```

---

## Phase 3: Terraform Infrastructure Setup

### 3.1 Configure AWS Credentials
```bash
# Configure AWS CLI
aws configure

# Set environment variables
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-west-2"
```

### 3.2 Initialize Terraform
```bash
cd terraform

# Initialize Terraform
terraform init

# Plan the infrastructure
terraform plan

# Apply the infrastructure
terraform apply
```

### 3.3 Infrastructure Components Created
- VPC with public/private subnets
- EKS cluster with managed node groups
- ECR repository for container images
- Security groups and IAM roles
- Load balancer and ingress controller

---

## Phase 4: Kubernetes Deployment

### 4.1 Configure kubectl
```bash
# Update kubeconfig
aws eks update-kubeconfig --region us-west-2 --name minizon-eks-cluster

# Verify cluster access
kubectl get nodes
```

### 4.2 Deploy Application
```bash
cd k8s

# Apply Kubernetes manifests
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
```

### 4.3 Verify Deployment
```bash
# Check pod status
kubectl get pods -n minizon

# Check service status
kubectl get services -n minizon

# Check ingress status
kubectl get ingress -n minizon

# Get application URL
kubectl get ingress minizon-ingress -n minizon -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

---

## Phase 5: Jenkins CI/CD Pipeline

### 5.1 Jenkins Server Setup
```bash
# Install Jenkins (Ubuntu/Debian)
sudo apt update
sudo apt install openjdk-11-jdk
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### 5.2 Configure Jenkins Pipeline
1. Access Jenkins at `http://your-jenkins-server:8080`
2. Install required plugins:
   - Docker Pipeline
   - Kubernetes CLI
   - AWS CLI
   - Terraform
   - Ansible

### 5.3 Create Jenkins Job
```bash
# Create new Pipeline job
# Configure Git repository: https://github.com/yourusername/minizon-shop-spark.git
# Pipeline script from SCM
# Script path: jenkins/Jenkinsfile
```

### 5.4 Pipeline Stages
The Jenkins pipeline includes:
- **Build**: Docker image creation
- **Test**: Unit tests and linting
- **Security Scan**: Vulnerability scanning
- **Deploy to Staging**: Deploy to staging environment
- **Integration Tests**: End-to-end testing
- **Deploy to Production**: Deploy to production environment

---

## Phase 6: Ansible Configuration Management

### 6.1 Install Ansible
```bash
# Install Ansible
sudo apt install ansible

# Verify installation
ansible --version
```

### 6.2 Configure Inventory
```bash
cd ansible

# Update inventory.yml with your server details
# Edit inventory.yml to include your Kubernetes cluster nodes
```

### 6.3 Run Ansible Playbooks
```bash
# Deploy application
ansible-playbook -i inventory.yml deploy.yml

# Perform rolling update
ansible-playbook -i inventory.yml rolling-update.yml

# Rollback if needed
ansible-playbook -i inventory.yml rollback.yml
```

---

## Complete Deployment Workflow

### Step-by-Step Deployment Process

#### 1. Development Workflow
```bash
# Developer makes changes
git checkout -b feature/new-feature
# Make changes to code
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Create Pull Request
# Code review and merge to develop
```

#### 2. CI/CD Pipeline Trigger
```bash
# Jenkins automatically triggers on:
# - Push to main branch
# - Pull request merge
# - Manual trigger
```

#### 3. Automated Deployment Process
1. **Git**: Code is pulled from repository
2. **Docker**: Application is containerized
3. **Jenkins**: Pipeline orchestrates the deployment
4. **Terraform**: Infrastructure is provisioned/updated
5. **Kubernetes**: Application is deployed to cluster
6. **Ansible**: Configuration management and updates

#### 4. Production Deployment
```bash
# Merge to main branch triggers production deployment
git checkout main
git merge develop
git push origin main

# Jenkins pipeline automatically:
# 1. Builds Docker image
# 2. Runs tests
# 3. Deploys to staging
# 4. Runs integration tests
# 5. Deploys to production
# 6. Runs health checks
```

---

## Monitoring and Maintenance

### Health Checks
```bash
# Check application health
kubectl get pods -n minizon
kubectl logs -f deployment/minizon-app -n minizon

# Check ingress status
kubectl describe ingress minizon-ingress -n minizon
```

### Scaling
```bash
# Scale application
kubectl scale deployment minizon-app --replicas=5 -n minizon

# Check HPA status
kubectl get hpa -n minizon
```

### Updates and Rollbacks
```bash
# Rolling update
ansible-playbook -i inventory.yml rolling-update.yml

# Rollback
ansible-playbook -i inventory.yml rollback.yml

# Kubernetes rollback
kubectl rollout undo deployment/minizon-app -n minizon
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Docker Build Issues
```bash
# Check Docker daemon
sudo systemctl status docker

# Clean Docker cache
docker system prune -a
```

#### 2. Kubernetes Deployment Issues
```bash
# Check pod logs
kubectl logs -f pod-name -n minizon

# Check events
kubectl get events -n minizon

# Describe resources
kubectl describe pod pod-name -n minizon
```

#### 3. Jenkins Pipeline Issues
```bash
# Check Jenkins logs
sudo journalctl -u jenkins -f

# Check pipeline console output
# Access Jenkins web UI > Job > Console Output
```

#### 4. Terraform Issues
```bash
# Check Terraform state
terraform state list

# Refresh state
terraform refresh

# Destroy and recreate
terraform destroy
terraform apply
```

---

## Security Considerations

### 1. Secrets Management
```bash
# Create Kubernetes secrets
kubectl create secret generic minizon-secrets \
  --from-literal=database-password=your-password \
  --from-literal=api-key=your-api-key \
  -n minizon
```

### 2. Network Security
- Use private subnets for application pods
- Configure security groups properly
- Enable VPC flow logs

### 3. Container Security
- Use non-root user in containers
- Scan images for vulnerabilities
- Keep base images updated

---

## Cost Optimization

### 1. Resource Management
```bash
# Set resource limits
kubectl patch deployment minizon-app -n minizon -p '{"spec":{"template":{"spec":{"containers":[{"name":"minizon-app","resources":{"limits":{"cpu":"500m","memory":"512Mi"}}}]}}}}'
```

### 2. Auto-scaling
- Configure HPA for automatic scaling
- Use cluster autoscaler for node scaling
- Implement cost monitoring

---

## Backup and Disaster Recovery

### 1. Data Backup
```bash
# Backup Kubernetes resources
kubectl get all -n minizon -o yaml > minizon-backup.yaml

# Backup Terraform state
terraform state pull > terraform-state-backup.json
```

### 2. Disaster Recovery Plan
1. Infrastructure recreation with Terraform
2. Application deployment with Kubernetes
3. Data restoration from backups
4. DNS and load balancer configuration

---

## Next Steps

1. **Set up monitoring**: Implement Prometheus and Grafana
2. **Add logging**: Configure ELK stack or similar
3. **Implement security scanning**: Add security tools to CI/CD
4. **Performance testing**: Add load testing to pipeline
5. **Multi-environment**: Set up dev, staging, and production environments

---

## Support and Documentation

- **Jenkins Documentation**: https://jenkins.io/doc/
- **Kubernetes Documentation**: https://kubernetes.io/docs/
- **Terraform Documentation**: https://terraform.io/docs/
- **Docker Documentation**: https://docs.docker.com/
- **Ansible Documentation**: https://docs.ansible.com/

For issues and support, contact the DevOps team or create an issue in the project repository.
