# Minizon E-commerce DevOps Pipeline

This repository contains a complete DevOps pipeline for the Minizon e-commerce frontend application, built with React, TypeScript, and modern DevOps tools.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Development   │    │     Jenkins     │    │   Kubernetes    │
│                 │    │                 │    │                 │
│  React + TS     │───▶│  CI/CD Pipeline │───▶│   Production    │
│  Vite + Tailwind│    │                 │    │   Deployment    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   AWS Cloud     │
                       │                 │
                       │  EKS + ECR +    │
                       │  Terraform     │
                       └─────────────────┘
```

## 📁 Project Structure

```
minizon-shop-spark/
├── src/                    # React application source code
├── docker/                 # Docker configuration
│   ├── Dockerfile         # Multi-stage Docker build
│   ├── nginx.conf         # Nginx configuration
│   ├── docker-compose.yml # Local development
│   └── docker-compose.prod.yml # Production setup
├── k8s/                   # Kubernetes manifests
│   ├── deployment.yaml    # Application deployment
│   ├── service.yaml       # Service configuration
│   ├── ingress.yaml       # Ingress and TLS
│   └── hpa.yaml          # Horizontal Pod Autoscaler
├── jenkins/               # Jenkins CI/CD
│   ├── Jenkinsfile       # Pipeline definition
│   └── README.md         # Jenkins setup guide
├── terraform/            # Infrastructure as Code
│   ├── main.tf          # Main configuration
│   ├── eks.tf           # EKS cluster setup
│   ├── vpc.tf           # VPC and networking
│   ├── ecr.tf           # Container registry
│   └── outputs.tf       # Terraform outputs
└── ansible/              # Configuration management
    ├── deploy.yml        # Main deployment
    ├── rolling-update.yml # Rolling updates
    ├── rollback.yml      # Rollback operations
    ├── inventory.yml     # Ansible inventory
    └── README.md         # Ansible guide
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- kubectl
- Terraform
- Ansible
- Jenkins (for CI/CD)
- AWS CLI

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd minizon-shop-spark

# Install dependencies
npm install

# Start development server
npm run dev

# Or use Docker
docker-compose -f docker/docker-compose.yml up
```

### 🚀 Automated Deployment

#### Option 1: Automated Script (Recommended)
```bash
# Linux/macOS
chmod +x deploy.sh
./deploy.sh

# Windows PowerShell
.\deploy.ps1 -AWSAccountId "your-account-id" -GitHubRepo "https://github.com/yourusername/minizon-shop-spark.git"
```

#### Option 2: Manual Step-by-Step Deployment

##### 1. Infrastructure Setup (Terraform)
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

##### 2. Build and Push Docker Image
```bash
# Build image
docker build -f docker/Dockerfile -t minizon-frontend:latest .

# Tag for registry
docker tag minizon-frontend:latest your-registry.com/minizon-frontend:latest

# Push to registry
docker push your-registry.com/minizon-frontend:latest
```

##### 3. Deploy to Kubernetes
```bash
# Apply manifests
kubectl apply -f k8s/

# Or use Ansible
ansible-playbook -i ansible/inventory.yml ansible/deploy.yml
```

### 📖 Detailed Deployment Guide
For comprehensive deployment instructions, see:
- [Complete Deployment Guide](DEPLOYMENT.md)
- [Quick Start Guide](QUICK_START.md)

## 🛠️ DevOps Tools Configuration

### Docker
- **Multi-stage build** for optimized production images
- **Nginx** for serving static files
- **Health checks** for container monitoring
- **Security headers** and optimizations

### Kubernetes
- **Deployment** with rolling updates
- **Service** for internal communication
- **Ingress** with TLS termination
- **HPA** for automatic scaling
- **Resource limits** and requests

### Jenkins
- **Pipeline as Code** with Jenkinsfile
- **Multi-environment** deployment (staging/production)
- **Security scanning** with Trivy
- **Slack notifications** for deployment status
- **Code coverage** reporting

### Terraform
- **EKS cluster** with managed node groups
- **VPC** with public/private subnets
- **ECR** repository for container images
- **IAM roles** and policies
- **CloudWatch** logging

### Ansible
- **Deployment automation** for Kubernetes
- **Rolling updates** with zero downtime
- **Rollback capabilities** for quick recovery
- **Environment-specific** configurations

## 🔧 Configuration

### Environment Variables
```bash
# Docker Registry
DOCKER_REGISTRY=your-registry.com

# Kubernetes
KUBECONFIG=/path/to/kubeconfig

# Domain
DOMAIN_NAME=minizon.example.com

# Build
BUILD_NUMBER=123
```

### Jenkins Credentials
- `kubeconfig`: Kubernetes configuration
- `docker-registry-credentials`: Docker registry access
- `slack-token`: Slack webhook for notifications

## 📊 Monitoring & Observability

### Health Checks
- **Liveness probe**: `/health` endpoint
- **Readiness probe**: Application startup check
- **Resource monitoring**: CPU and memory usage

### Logging
- **Structured logging** with JSON format
- **CloudWatch** integration for centralized logs
- **Log retention** policies

### Metrics
- **Prometheus** metrics collection
- **Grafana** dashboards
- **Alerting** rules for critical metrics

## 🔒 Security

### Container Security
- **Non-root user** execution
- **Minimal base images** (Alpine Linux)
- **Security scanning** with Trivy
- **Vulnerability management**

### Network Security
- **Private subnets** for application pods
- **Security groups** with minimal access
- **TLS encryption** for all communications
- **WAF** protection (optional)

### Access Control
- **IAM roles** with least privilege
- **RBAC** for Kubernetes resources
- **Secret management** with AWS Secrets Manager

## 🚦 CI/CD Pipeline

### Pipeline Stages
1. **Checkout**: Source code retrieval
2. **Dependencies**: npm install
3. **Lint**: Code quality checks
4. **Build**: Production build
5. **Test**: Unit tests with coverage
6. **Docker**: Image build and push
7. **Security**: Vulnerability scanning
8. **Deploy**: Environment-specific deployment

### Branch Strategy
- `main`: Production deployments
- `develop`: Staging deployments
- `feature/*`: Development branches

## 📈 Scaling

### Horizontal Pod Autoscaler (HPA)
- **CPU-based scaling**: 70% threshold
- **Memory-based scaling**: 80% threshold
- **Min replicas**: 2
- **Max replicas**: 10

### Cluster Autoscaler
- **Node group scaling**: Based on pod scheduling
- **Cost optimization**: Spot instances for non-critical workloads
- **Multi-AZ deployment**: High availability

## 🔄 Backup & Recovery

### Data Backup
- **ETCD backup**: Kubernetes cluster state
- **Application data**: Persistent volumes
- **Configuration**: Git-based version control

### Disaster Recovery
- **Multi-region deployment**: Cross-region replication
- **Automated failover**: Route53 health checks
- **Recovery procedures**: Documented runbooks

## 📚 Documentation

- [Docker Setup](docker/README.md)
- [Kubernetes Manifests](k8s/README.md)
- [Jenkins Pipeline](jenkins/README.md)
- [Terraform Infrastructure](terraform/README.md)
- [Ansible Playbooks](ansible/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the DevOps team
- Check the documentation

---

**Built with ❤️ using modern DevOps practices**