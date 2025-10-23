# Jenkins Pipeline Configuration for Minizon E-commerce Frontend

## Prerequisites
- Jenkins with Docker plugin
- Kubernetes CLI (kubectl)
- Docker registry access
- Kubernetes cluster access

## Pipeline Features
- Automated testing and linting
- Docker image building and pushing
- Security scanning with Trivy
- Multi-environment deployment (staging/production)
- Slack notifications
- Code coverage reporting

## Required Jenkins Credentials
1. `kubeconfig` - Kubernetes configuration file
2. `docker-registry-credentials` - Docker registry username/password
3. `slack-token` - Slack webhook token for notifications

## Environment Variables
- `DOCKER_REGISTRY`: Your Docker registry URL
- `IMAGE_NAME`: Docker image name (minizon-frontend)
- `KUBECONFIG`: Path to Kubernetes config
- `DOCKER_CREDENTIALS`: Docker registry credentials

## Pipeline Stages
1. **Checkout**: Get source code
2. **Install Dependencies**: npm ci
3. **Lint**: Code quality checks
4. **Build**: Create production build
5. **Test**: Run tests with coverage
6. **Build Docker Image**: Create and push Docker image
7. **Security Scan**: Scan for vulnerabilities
8. **Deploy to Staging**: Deploy to staging environment (develop branch)
9. **Deploy to Production**: Deploy to production (main branch)

## Usage
1. Create a new Pipeline job in Jenkins
2. Point to this Jenkinsfile in your repository
3. Configure credentials as listed above
4. Set up webhooks for automatic builds on push
