# Minizon E-commerce EC2 Deployment Script (PowerShell)
# This script deploys the Minizon app to AWS EC2 instance

param(
    [string]$InstanceType = "t3.medium",
    [string]$KeyName = "minizon-key",
    [string]$SecurityGroup = "minizon-sg",
    [string]$Region = "us-west-2",
    [string]$ProjectName = "minizon-shop-spark"
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
    
    # Check AWS CLI
    try {
        aws --version | Out-Null
    }
    catch {
        Write-Error "AWS CLI is not installed. Please install it first."
        Write-Info "Download from: https://aws.amazon.com/cli/"
        exit 1
    }
    
    # Check Docker
    try {
        docker --version | Out-Null
    }
    catch {
        Write-Error "Docker is not installed. Please install it first."
        Write-Info "Download from: https://www.docker.com/products/docker-desktop"
        exit 1
    }
    
    # Check AWS credentials
    try {
        aws sts get-caller-identity | Out-Null
    }
    catch {
        Write-Error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    }
    
    Write-Success "All prerequisites are installed"
}

function New-KeyPair {
    Write-Info "Creating EC2 key pair..."
    
    # Create key pair if it doesn't exist
    try {
        aws ec2 describe-key-pairs --key-names $KeyName --region $Region | Out-Null
        Write-Info "Key pair already exists"
    }
    catch {
        aws ec2 create-key-pair --key-name $KeyName --region $Region --query 'KeyMaterial' --output text | Out-File -FilePath "${KeyName}.pem" -Encoding ASCII
        Write-Success "Key pair created: ${KeyName}.pem"
    }
}

function New-SecurityGroup {
    Write-Info "Creating security group..."
    
    # Create security group if it doesn't exist
    try {
        $GroupId = aws ec2 describe-security-groups --group-names $SecurityGroup --region $Region --query 'SecurityGroups[0].GroupId' --output text
        Write-Info "Security group already exists: $GroupId"
    }
    catch {
        $GroupId = aws ec2 create-security-group --group-name $SecurityGroup --description "Minizon E-commerce Security Group" --region $Region --query 'GroupId' --output text
        
        # Allow SSH
        aws ec2 authorize-security-group-ingress --group-id $GroupId --protocol tcp --port 22 --cidr 0.0.0.0/0 --region $Region | Out-Null
        
        # Allow HTTP
        aws ec2 authorize-security-group-ingress --group-id $GroupId --protocol tcp --port 80 --cidr 0.0.0.0/0 --region $Region | Out-Null
        
        # Allow HTTPS
        aws ec2 authorize-security-group-ingress --group-id $GroupId --protocol tcp --port 443 --cidr 0.0.0.0/0 --region $Region | Out-Null
        
        Write-Success "Security group created: $GroupId"
    }
}

function Build-DockerImage {
    Write-Info "Building Docker image..."
    
    # Build the image
    docker build -t "${ProjectName}:latest" .
    
    # Save image to tar file
    docker save "${ProjectName}:latest" | gzip > "${ProjectName}.tar.gz"
    
    Write-Success "Docker image built and saved"
}

function New-UserDataScript {
    Write-Info "Creating EC2 user data script..."
    
    $UserDataScript = @"
#!/bin/bash

# Update system
yum update -y

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-`$(uname -s)-`$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Nginx
yum install -y nginx
systemctl start nginx
systemctl enable nginx

# Create application directory
mkdir -p /opt/minizon
cd /opt/minizon

# Create Docker Compose file
cat > docker-compose.yml << 'DOCKEREOF'
version: '3.8'
services:
  minizon-frontend:
    image: minizon-frontend:latest
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
DOCKEREOF

# Create Nginx configuration
cat > /etc/nginx/conf.d/minizon.conf << 'NGINXEOF'
server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
    }
    
    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}
NGINXEOF

# Reload Nginx configuration
nginx -t && systemctl reload nginx

# Create startup script
cat > /opt/minizon/start.sh << 'STARTEOF'
#!/bin/bash
cd /opt/minizon

# Load Docker image if it exists
if [ -f "minizon-shop-spark.tar.gz" ]; then
    docker load < minizon-shop-spark.tar.gz
fi

# Start application
docker-compose up -d

# Wait for application to be ready
sleep 30

# Check if application is running
if curl -f http://localhost:3000/health; then
    echo "Application started successfully"
else
    echo "Application failed to start"
    exit 1
fi
STARTEOF

chmod +x /opt/minizon/start.sh

# Run startup script
/opt/minizon/start.sh
"@

    $UserDataScript | Out-File -FilePath "user-data.sh" -Encoding ASCII
    Write-Success "User data script created"
}

function Start-EC2Instance {
    Write-Info "Launching EC2 instance..."
    
    # Get the latest Amazon Linux 2 AMI ID
    $AmiId = aws ec2 describe-images --owners amazon --filters "Name=name,Values=amzn2-ami-hvm-*-x86_64-gp2" "Name=state,Values=available" --query 'Images | sort_by(@, &CreationDate) | [-1].ImageId' --output text --region $Region
    
    # Get security group ID
    $GroupId = aws ec2 describe-security-groups --group-names $SecurityGroup --region $Region --query 'SecurityGroups[0].GroupId' --output text
    
    # Launch instance
    $InstanceId = aws ec2 run-instances --image-id $AmiId --count 1 --instance-type $InstanceType --key-name $KeyName --security-group-ids $GroupId --user-data file://user-data.sh --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=minizon-ecommerce}]" --region $Region --query 'Instances[0].InstanceId' --output text
    
    Write-Success "EC2 instance launched: $InstanceId"
    
    # Wait for instance to be running
    Write-Info "Waiting for instance to be running..."
    aws ec2 wait instance-running --instance-ids $InstanceId --region $Region
    
    # Get public IP
    $PublicIp = aws ec2 describe-instances --instance-ids $InstanceId --region $Region --query 'Reservations[0].Instances[0].PublicIpAddress' --output text
    
    Write-Success "Instance is running at: $PublicIp"
    
    # Wait for application to be ready
    Write-Info "Waiting for application to be ready..."
    Start-Sleep -Seconds 60
    
    # Test application
    try {
        Invoke-WebRequest -Uri "http://$PublicIp/health" -UseBasicParsing | Out-Null
        Write-Success "Application is accessible at: http://$PublicIp"
    }
    catch {
        Write-Warning "Application may still be starting up. Check http://$PublicIp in a few minutes."
    }
    
    return $PublicIp
}

function Send-DockerImage {
    param([string]$PublicIp)
    
    Write-Info "Uploading Docker image to EC2..."
    
    if ($PublicIp -and $PublicIp -ne "None") {
        # Upload Docker image using SCP (requires OpenSSH or similar)
        Write-Info "Please upload the Docker image manually:"
        Write-Host "scp -i ${KeyName}.pem -o StrictHostKeyChecking=no ${ProjectName}.tar.gz ec2-user@${PublicIp}:/opt/minizon/"
        Write-Host "ssh -i ${KeyName}.pem -o StrictHostKeyChecking=no ec2-user@${PublicIp} 'cd /opt/minizon; docker load < ${ProjectName}.tar.gz; docker-compose down; docker-compose up -d'"
        
        Write-Success "Manual upload instructions provided"
    }
    else {
        Write-Error "Could not find EC2 instance public IP"
    }
}

function Invoke-Cleanup {
    Write-Info "Cleaning up temporary files..."
    Remove-Item -Path "user-data.sh" -ErrorAction SilentlyContinue
    Remove-Item -Path "${ProjectName}.tar.gz" -ErrorAction SilentlyContinue
}

# Main deployment function
function Start-EC2Deployment {
    Write-Info "Starting Minizon E-commerce EC2 deployment..."
    
    try {
        # Check prerequisites
        Test-Prerequisites
        
        # Create AWS resources
        New-KeyPair
        New-SecurityGroup
        
        # Build and prepare application
        Build-DockerImage
        New-UserDataScript
        
        # Launch EC2 instance
        $PublicIp = Start-EC2Instance
        
        # Upload Docker image
        Send-DockerImage -PublicIp $PublicIp
        
        # Cleanup
        Invoke-Cleanup
        
        Write-Success "Deployment completed successfully!"
        
        Write-Host ""
        Write-Host "🎉 Your Minizon e-commerce website is now live!"
        Write-Host "📍 URL: http://$PublicIp"
        Write-Host "🔍 Health check: http://$PublicIp/health"
        Write-Host ""
        Write-Host "📋 Next steps:"
        Write-Host "1. Configure your domain name to point to $PublicIp"
        Write-Host "2. Set up SSL certificate with Let's Encrypt"
        Write-Host "3. Configure monitoring and logging"
        Write-Host "4. Set up automated backups"
        Write-Host ""
        Write-Host "🔧 Management commands:"
        Write-Host "SSH to instance: ssh -i ${KeyName}.pem ec2-user@$PublicIp"
        Write-Host "View logs: ssh -i ${KeyName}.pem ec2-user@$PublicIp `'cd /opt/minizon; docker-compose logs -f`'"
        Write-Host "Restart app: ssh -i ${KeyName}.pem ec2-user@$PublicIp `'cd /opt/minizon; docker-compose restart`'"
    }
    catch {
        Write-Error "Deployment failed: $($_.Exception.Message)"
        Invoke-Cleanup
        exit 1
    }
}

# Run main function
Start-EC2Deployment
