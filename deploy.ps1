# Minizon E-commerce Deployment Script (PowerShell)
# This script automates the deployment process using all six DevOps tools

param(
    [string]$AWSAccountId = "",
    [string]$GitHubRepo = "",
    [string]$JenkinsUrl = "",
    [string]$AWSRegion = "us-west-2",
    [string]$ProjectName = "minizon-shop-spark",
    [string]$Namespace = "minizon"
)

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

# Functions
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

function Test-Prerequisites {
    Write-Info "Checking prerequisites..."
    
    $tools = @("git", "docker", "kubectl", "terraform", "ansible", "aws")
    foreach ($tool in $tools) {
        try {
            Get-Command $tool -ErrorAction Stop | Out-Null
        }
        catch {
            Write-Error "$tool is not installed. Please install it first."
            exit 1
        }
    }
    
    Write-Success "All prerequisites are installed"
}

function Initialize-Git {
    Write-Info "Setting up Git repository..."
    
    # Initialize git if not already done
    if (-not (Test-Path ".git")) {
        git init
        git add .
        git commit -m "Initial commit: Complete Minizon e-commerce website"
    }
    
    # Add remote if not exists
    $remotes = git remote -v
    if ([string]::IsNullOrEmpty($remotes)) {
        if ([string]::IsNullOrEmpty($GitHubRepo)) {
            Write-Warning "GitHubRepo not set. Please set it in the script or add remote manually."
        }
        else {
            git remote add origin $GitHubRepo
        }
    }
    
    Write-Success "Git repository setup complete"
}

function Build-DockerImage {
    Write-Info "Building Docker image..."
    
    # Build the image
    docker build -t "$ProjectName`:latest" .
    
    # Test the image
    Write-Info "Testing Docker image..."
    docker run -d -p 8080:80 --name test-container "$ProjectName`:latest"
    Start-Sleep -Seconds 5
    
    # Check if container is running
    $container = docker ps | Select-String "test-container"
    if ($container) {
        Write-Success "Docker image built and tested successfully"
        docker stop test-container
        docker rm test-container
    }
    else {
        Write-Error "Docker image test failed"
        exit 1
    }
}

function Setup-AWSECR {
    Write-Info "Setting up AWS ECR..."
    
    if ([string]::IsNullOrEmpty($AWSAccountId)) {
        Write-Warning "AWSAccountId not set. Please set it in the script."
        return
    }
    
    # Create ECR repository
    aws ecr create-repository --repository-name $ProjectName --region $AWSRegion 2>$null
    
    # Get login token
    $loginToken = aws ecr get-login-password --region $AWSRegion
    echo $loginToken | docker login --username AWS --password-stdin "$AWSAccountId.dkr.ecr.$AWSRegion.amazonaws.com"
    
    # Tag and push image
    docker tag "$ProjectName`:latest" "$AWSAccountId.dkr.ecr.$AWSRegion.amazonaws.com/$ProjectName`:latest"
    docker push "$AWSAccountId.dkr.ecr.$AWSRegion.amazonaws.com/$ProjectName`:latest"
    
    Write-Success "Docker image pushed to ECR"
}

function Deploy-Infrastructure {
    Write-Info "Deploying infrastructure with Terraform..."
    
    Set-Location terraform
    
    # Initialize Terraform
    terraform init
    
    # Plan deployment
    terraform plan
    
    # Apply infrastructure
    terraform apply -auto-approve
    
    Set-Location ..
    
    Write-Success "Infrastructure deployed successfully"
}

function Configure-Kubectl {
    Write-Info "Configuring kubectl..."
    
    # Update kubeconfig
    aws eks update-kubeconfig --region $AWSRegion --name minizon-eks-cluster
    
    # Verify cluster access
    try {
        kubectl get nodes | Out-Null
        Write-Success "kubectl configured successfully"
    }
    catch {
        Write-Error "Failed to configure kubectl"
        exit 1
    }
}

function Deploy-ToKubernetes {
    Write-Info "Deploying to Kubernetes..."
    
    Set-Location k8s
    
    # Create namespace
    kubectl create namespace $Namespace 2>$null
    
    # Apply Kubernetes manifests
    kubectl apply -f deployment.yaml -n $Namespace
    kubectl apply -f service.yaml -n $Namespace
    kubectl apply -f ingress.yaml -n $Namespace
    kubectl apply -f hpa.yaml -n $Namespace
    
    Set-Location ..
    
    # Wait for deployment to be ready
    Write-Info "Waiting for deployment to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/minizon-app -n $Namespace
    
    Write-Success "Application deployed to Kubernetes"
}

function Invoke-AnsibleDeployment {
    Write-Info "Running Ansible deployment..."
    
    Set-Location ansible
    
    # Run deployment playbook
    ansible-playbook -i inventory.yml deploy.yml
    
    Set-Location ..
    
    Write-Success "Ansible deployment completed"
}

function Test-Deployment {
    Write-Info "Verifying deployment..."
    
    # Check pod status
    kubectl get pods -n $Namespace
    
    # Check service status
    kubectl get services -n $Namespace
    
    # Check ingress status
    kubectl get ingress -n $Namespace
    
    # Get application URL
    try {
        $url = kubectl get ingress minizon-ingress -n $Namespace -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>$null
        if ($url) {
            Write-Success "Application is accessible at: http://$url"
        }
        else {
            Write-Warning "Application URL not available yet. Check ingress status."
        }
    }
    catch {
        Write-Warning "Application URL not available yet. Check ingress status."
    }
}

function Setup-JenkinsPipeline {
    Write-Info "Setting up Jenkins pipeline..."
    
    if ([string]::IsNullOrEmpty($JenkinsUrl)) {
        Write-Warning "JenkinsUrl not set. Please configure Jenkins manually:"
        Write-Host "1. Access Jenkins at your Jenkins server URL"
        Write-Host "2. Create a new Pipeline job"
        Write-Host "3. Configure Git repository: $GitHubRepo"
        Write-Host "4. Set Pipeline script from SCM"
        Write-Host "5. Script path: jenkins/Jenkinsfile"
        return
    }
    
    Write-Success "Jenkins pipeline setup instructions provided"
}

function Invoke-Cleanup {
    Write-Info "Cleaning up temporary resources..."
    
    # Remove any temporary containers
    docker ps -a | Select-String "test-container" | ForEach-Object { 
        $containerId = ($_ -split '\s+')[0]
        docker rm -f $containerId
    }
    
    Write-Success "Cleanup completed"
}

# Main deployment function
function Start-Deployment {
    Write-Info "Starting Minizon e-commerce deployment..."
    
    try {
        # Check prerequisites
        Test-Prerequisites
        
        # Setup Git
        Initialize-Git
        
        # Build Docker image
        Build-DockerImage
        
        # Setup AWS ECR
        Setup-AWSECR
        
        # Deploy infrastructure
        Deploy-Infrastructure
        
        # Configure kubectl
        Configure-Kubectl
        
        # Deploy to Kubernetes
        Deploy-ToKubernetes
        
        # Run Ansible deployment
        Invoke-AnsibleDeployment
        
        # Verify deployment
        Test-Deployment
        
        # Setup Jenkins pipeline
        Setup-JenkinsPipeline
        
        # Cleanup
        Invoke-Cleanup
        
        Write-Success "Deployment completed successfully!"
        
        Write-Host ""
        Write-Host "Next steps:"
        Write-Host "1. Configure Jenkins pipeline manually if not automated"
        Write-Host "2. Set up monitoring and logging"
        Write-Host "3. Configure domain name and SSL certificates"
        Write-Host "4. Set up backup and disaster recovery"
        Write-Host "5. Implement security scanning and compliance"
    }
    catch {
        Write-Error "Deployment failed: $($_.Exception.Message)"
        Invoke-Cleanup
        exit 1
    }
}

# Run main function
Start-Deployment
