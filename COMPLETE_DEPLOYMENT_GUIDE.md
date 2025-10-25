# 🚀 Minizon E-commerce Complete Deployment Guide

## Overview
This guide provides a complete deployment setup for the Minizon e-commerce website using six essential DevOps tools:
- **Git** - Version control and code management
- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **Terraform** - Infrastructure as Code
- **Jenkins** - CI/CD Pipeline
- **Ansible** - Configuration management

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Developer     │    │   Git Repo      │    │   Jenkins       │
│   Workstation   │───▶│   (GitHub)      │───▶│   CI/CD         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AWS ECR       │◀───│   Docker        │◀───│   Build Stage   │
│   Registry      │    │   Build         │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AWS EKS       │◀───│   Terraform     │◀───│   Ansible       │
│   Cluster       │    │   Infrastructure│    │   Deployment    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

### Required Tools
- **Git** - Version control
- **Docker & Docker Compose** - Containerization
- **kubectl** - Kubernetes CLI
- **Terraform** - Infrastructure provisioning
- **Jenkins** - CI/CD automation
- **Ansible** - Configuration management
- **AWS CLI** - Cloud management

### Required Accounts
- AWS Account with appropriate permissions
- GitHub/GitLab account
- Jenkins server access
- Domain name (optional)

## 🚀 Quick Start Deployment

### Option 1: Automated Deployment (Recommended)

#### For Linux/macOS:
```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

#### For Windows:
```powershell
# Run the PowerShell deployment script
.\deploy.ps1 -AWSAccountId "your-account-id" -GitHubRepo "https://github.com/yourusername/minizon-shop-spark.git"
```

### Option 2: Manual Step-by-Step Deployment

## 📁 Project Structure

```
minizon-shop-spark/
├── src/                    # React application source code
├── docker/                 # Docker configuration
│   ├── Dockerfile         # Multi-stage Docker build
│   ├── docker-compose.yml # Local development
│   ├── docker-compose.prod.yml # Production setup
│   └── nginx.conf         # Nginx configuration
├── k8s/                   # Kubernetes manifests
│   ├── deployment.yaml    # Application deployment
│   ├── service.yaml       # Service definition
│   ├── ingress.yaml       # Ingress configuration
│   └── hpa.yaml          # Horizontal Pod Autoscaler
├── terraform/             # Infrastructure as Code
│   ├── main.tf           # Main Terraform configuration
│   ├── vpc.tf            # VPC and networking
│   ├── eks.tf            # EKS cluster configuration
│   ├── ecr.tf            # ECR repository setup
│   └── outputs.tf        # Terraform outputs
├── ansible/               # Configuration management
│   ├── deploy.yml        # Main deployment playbook
│   ├── rolling-update.yml # Rolling update playbook
│   ├── rollback.yml     # Rollback playbook
│   └── inventory.yml    # Server inventory
├── jenkins/               # CI/CD pipeline
│   └── Jenkinsfile       # Jenkins pipeline definition
├── deploy.sh              # Linux/macOS deployment script
├── deploy.ps1             # Windows deployment script
└── config.env.example     # Environment configuration template
```

## 🔧 Detailed Deployment Steps

### Phase 1: Environment Setup

#### 1.1 Clone and Configure
```bash
# Clone the repository
git clone https://github.com/yourusername/minizon-shop-spark.git
cd minizon-shop-spark

# Copy environment configuration
cp config.env.example config.env
# Edit config.env with your specific values
```

#### 1.2 Install Prerequisites
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Terraform
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Install Ansible
sudo apt update
sudo apt install ansible

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Phase 2: AWS Infrastructure Setup

#### 2.1 Configure AWS Credentials
```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, and region
```

#### 2.2 Deploy Infrastructure with Terraform
```bash
cd terraform

# Initialize Terraform
terraform init

# Plan the deployment
terraform plan

# Apply the infrastructure
terraform apply

# Note the outputs for next steps
terraform output
```

#### 2.3 Configure kubectl
```bash
# Update kubeconfig to connect to your EKS cluster
aws eks update-kubeconfig --region us-west-2 --name minizon-cluster

# Verify cluster access
kubectl get nodes
```

### Phase 3: Container Build and Push

#### 3.1 Build Docker Image
```bash
# Build the application image
docker build -t minizon-frontend:latest .

# Test the image locally
docker run -p 8080:80 minizon-frontend:latest
```

#### 3.2 Push to ECR
```bash
# Get ECR login token
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-west-2.amazonaws.com

# Tag and push image
docker tag minizon-frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-west-2.amazonaws.com/minizon-frontend:latest
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-west-2.amazonaws.com/minizon-frontend:latest
```

### Phase 4: Kubernetes Deployment

#### 4.1 Deploy Application
```bash
cd k8s

# Create namespace
kubectl create namespace minizon

# Update image reference in deployment.yaml
# Replace 'your-registry.com' with your actual ECR URL

# Deploy the application
kubectl apply -f deployment.yaml -n minizon
kubectl apply -f service.yaml -n minizon
kubectl apply -f ingress.yaml -n minizon
kubectl apply -f hpa.yaml -n minizon
```

#### 4.2 Verify Deployment
```bash
# Check pod status
kubectl get pods -n minizon

# Check service status
kubectl get services -n minizon

# Check ingress status
kubectl get ingress -n minizon

# Get application URL
kubectl get ingress minizon-frontend-ingress -n minizon -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

### Phase 5: Jenkins CI/CD Setup

#### 5.1 Install Jenkins
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

#### 5.2 Configure Jenkins Pipeline
1. Access Jenkins at `http://your-jenkins-server:8080`
2. Install required plugins:
   - Docker Pipeline
   - Kubernetes CLI
   - AWS CLI
   - Terraform
   - Ansible
3. Create new Pipeline job
4. Configure Git repository: `https://github.com/yourusername/minizon-shop-spark.git`
5. Set Pipeline script from SCM
6. Script path: `jenkins/Jenkinsfile`

### Phase 6: Ansible Configuration Management

#### 6.1 Configure Inventory
```bash
cd ansible

# Update inventory.yml with your server details
# For EKS, you can use localhost as the target
```

#### 6.2 Run Deployment Playbook
```bash
# Deploy application
ansible-playbook -i inventory.yml deploy.yml

# Perform rolling update
ansible-playbook -i inventory.yml rolling-update.yml

# Rollback if needed
ansible-playbook -i inventory.yml rollback.yml
```

## 🔄 CI/CD Pipeline Workflow

### Development Workflow
1. **Developer** creates feature branch
2. **Git** tracks changes and manages versions
3. **Pull Request** triggers code review
4. **Merge** to main branch triggers deployment

### Automated Pipeline
1. **Jenkins** detects code changes
2. **Docker** builds container image
3. **Tests** run automatically
4. **Security scan** checks for vulnerabilities
5. **Terraform** provisions/updates infrastructure
6. **Kubernetes** deploys application
7. **Ansible** manages configuration
8. **Health checks** verify deployment

## 📊 Monitoring and Maintenance

### Health Checks
```bash
# Check application health
kubectl get pods -n minizon
kubectl logs -f deployment/minizon-frontend -n minizon

# Check ingress status
kubectl describe ingress minizon-frontend-ingress -n minizon
```

### Scaling
```bash
# Manual scaling
kubectl scale deployment minizon-frontend --replicas=5 -n minizon

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
kubectl rollout undo deployment/minizon-frontend -n minizon
```

## 🔒 Security Considerations

### 1. Secrets Management
```bash
# Create Kubernetes secrets
kubectl create secret generic minizon-secrets \
  --from-literal=database-password=your-password \
  --from-literal=api-key=your-api-key \
  -n minizon
```

### 2. Network Security
- Private subnets for application pods
- Proper security group configuration
- VPC flow logs enabled

### 3. Container Security
- Non-root user in containers
- Image vulnerability scanning
- Regular base image updates

## 💰 Cost Optimization

### 1. Resource Management
```bash
# Set resource limits
kubectl patch deployment minizon-frontend -n minizon -p '{"spec":{"template":{"spec":{"containers":[{"name":"minizon-frontend","resources":{"limits":{"cpu":"500m","memory":"512Mi"}}}]}}}}'
```

### 2. Auto-scaling
- HPA for automatic pod scaling
- Cluster autoscaler for node scaling
- Cost monitoring and alerts

## 🚨 Troubleshooting

### Common Issues and Solutions

#### Docker Build Issues
```bash
# Check Docker daemon
sudo systemctl status docker

# Clean Docker cache
docker system prune -a
```

#### Kubernetes Deployment Issues
```bash
# Check pod logs
kubectl logs -f pod-name -n minizon

# Check events
kubectl get events -n minizon

# Describe resources
kubectl describe pod pod-name -n minizon
```

#### Jenkins Pipeline Issues
```bash
# Check Jenkins logs
sudo journalctl -u jenkins -f

# Check pipeline console output
# Access Jenkins web UI > Job > Console Output
```

#### Terraform Issues
```bash
# Check Terraform state
terraform state list

# Refresh state
terraform refresh

# Destroy and recreate
terraform destroy
terraform apply
```

## 📈 Next Steps

1. **Set up monitoring**: Implement Prometheus and Grafana
2. **Add logging**: Configure ELK stack or similar
3. **Implement security scanning**: Add security tools to CI/CD
4. **Performance testing**: Add load testing to pipeline
5. **Multi-environment**: Set up dev, staging, and production environments
6. **Backup strategy**: Implement automated backups
7. **Disaster recovery**: Create DR procedures

## 📚 Additional Resources

- **Jenkins Documentation**: https://jenkins.io/doc/
- **Kubernetes Documentation**: https://kubernetes.io/docs/
- **Terraform Documentation**: https://terraform.io/docs/
- **Docker Documentation**: https://docs.docker.com/
- **Ansible Documentation**: https://docs.ansible.com/
- **AWS EKS Documentation**: https://docs.aws.amazon.com/eks/

## 🆘 Support

For issues and support:
1. Check the troubleshooting section above
2. Review the logs and error messages
3. Create an issue in the project repository
4. Contact the DevOps team

---

**Congratulations!** 🎉 You now have a complete, production-ready deployment setup for your Minizon e-commerce website using all six DevOps tools. The system is designed to be scalable, secure, and maintainable.
