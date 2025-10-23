# 🚀 Quick Start Deployment Guide

## Prerequisites Setup

### 1. Install Required Tools

#### Windows (PowerShell)
```powershell
# Install Chocolatey (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install tools
choco install git docker-desktop kubernetes-cli terraform ansible awscli -y
```

#### macOS (Homebrew)
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install tools
brew install git docker kubernetes-cli terraform ansible awscli
```

#### Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install tools
sudo apt install -y git docker.io docker-compose kubectl terraform ansible awscli

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 2. Configure AWS CLI
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-west-2)
# Enter your default output format (json)
```

### 3. Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Quick Deployment Steps

### Step 1: Clone and Setup
```bash
# Clone your repository
git clone https://github.com/yourusername/minizon-shop-spark.git
cd minizon-shop-spark

# Copy configuration file
cp config.env.example config.env
# Edit config.env with your values
```

### Step 2: Run Deployment Script

#### For Linux/macOS:
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

#### For Windows PowerShell:
```powershell
# Run deployment script
.\deploy.ps1 -AWSAccountId "your-account-id" -GitHubRepo "https://github.com/yourusername/minizon-shop-spark.git"
```

### Step 3: Manual Steps (if needed)

#### Configure Jenkins Pipeline
1. Access Jenkins at `http://your-jenkins-server:8080`
2. Create new Pipeline job
3. Configure Git repository
4. Set Pipeline script from SCM
5. Script path: `jenkins/Jenkinsfile`

#### Set up Domain and SSL
1. Configure your domain DNS to point to the load balancer
2. Update ingress.yaml with your domain
3. Apply SSL certificate

## Verification

### Check Deployment Status
```bash
# Check Kubernetes resources
kubectl get all -n minizon

# Check application logs
kubectl logs -f deployment/minizon-app -n minizon

# Get application URL
kubectl get ingress minizon-ingress -n minizon
```

### Test Application
```bash
# Get the application URL
APP_URL=$(kubectl get ingress minizon-ingress -n minizon -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

# Test the application
curl http://$APP_URL
```

## Troubleshooting

### Common Issues

#### Docker Issues
```bash
# Check Docker status
docker --version
docker ps

# Restart Docker if needed
sudo systemctl restart docker
```

#### Kubernetes Issues
```bash
# Check cluster connection
kubectl cluster-info

# Check node status
kubectl get nodes

# Check pod logs
kubectl logs -f pod-name -n minizon
```

#### Terraform Issues
```bash
# Check Terraform status
terraform version
terraform state list

# Reinitialize if needed
terraform init
```

#### Jenkins Issues
```bash
# Check Jenkins status
sudo systemctl status jenkins

# Check Jenkins logs
sudo journalctl -u jenkins -f
```

## Next Steps After Deployment

1. **Set up Monitoring**
   - Install Prometheus and Grafana
   - Configure alerting rules
   - Set up log aggregation

2. **Configure CI/CD**
   - Set up webhooks for automatic deployments
   - Configure staging environment
   - Set up automated testing

3. **Security Hardening**
   - Configure network policies
   - Set up secrets management
   - Enable security scanning

4. **Backup and Recovery**
   - Set up automated backups
   - Test disaster recovery procedures
   - Configure data retention policies

## Support

For issues and questions:
- Check the logs: `kubectl logs -f deployment/minizon-app -n minizon`
- Review the deployment guide: `DEPLOYMENT.md`
- Create an issue in the repository
- Contact the DevOps team

## Cost Optimization

### AWS Cost Management
- Use spot instances for non-critical workloads
- Set up auto-scaling policies
- Monitor costs with AWS Cost Explorer
- Use reserved instances for predictable workloads

### Resource Optimization
- Set appropriate resource limits
- Use horizontal pod autoscaling
- Implement cluster autoscaling
- Monitor resource utilization
