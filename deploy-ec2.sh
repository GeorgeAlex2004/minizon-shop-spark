#!/bin/bash

# Minizon E-commerce EC2 Deployment Script
# This script deploys the Minizon app to AWS EC2 instance

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="minizon-shop-spark"
EC2_INSTANCE_TYPE="t3.medium"
EC2_KEY_NAME="minizon-key"
EC2_SECURITY_GROUP="minizon-sg"
AWS_REGION="us-west-2"
DOMAIN_NAME="minizon.example.com"

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
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install it first."
        log_info "Install with: curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip' && unzip awscliv2.zip && sudo ./aws/install"
        exit 1
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install it first."
        exit 1
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    log_success "All prerequisites are installed"
}

create_key_pair() {
    log_info "Creating EC2 key pair..."
    
    # Create key pair if it doesn't exist
    if ! aws ec2 describe-key-pairs --key-names $EC2_KEY_NAME --region $AWS_REGION &> /dev/null; then
        aws ec2 create-key-pair --key-name $EC2_KEY_NAME --region $AWS_REGION --query 'KeyMaterial' --output text > ${EC2_KEY_NAME}.pem
        chmod 400 ${EC2_KEY_NAME}.pem
        log_success "Key pair created: ${EC2_KEY_NAME}.pem"
    else
        log_info "Key pair already exists"
    fi
}

create_security_group() {
    log_info "Creating security group..."
    
    # Create security group if it doesn't exist
    if ! aws ec2 describe-security-groups --group-names $EC2_SECURITY_GROUP --region $AWS_REGION &> /dev/null; then
        GROUP_ID=$(aws ec2 create-security-group --group-name $EC2_SECURITY_GROUP --description "Minizon E-commerce Security Group" --region $AWS_REGION --query 'GroupId' --output text)
        
        # Allow SSH
        aws ec2 authorize-security-group-ingress --group-id $GROUP_ID --protocol tcp --port 22 --cidr 0.0.0.0/0 --region $AWS_REGION
        
        # Allow HTTP
        aws ec2 authorize-security-group-ingress --group-id $GROUP_ID --protocol tcp --port 80 --cidr 0.0.0.0/0 --region $AWS_REGION
        
        # Allow HTTPS
        aws ec2 authorize-security-group-ingress --group-id $GROUP_ID --protocol tcp --port 443 --cidr 0.0.0.0/0 --region $AWS_REGION
        
        log_success "Security group created: $GROUP_ID"
    else
        GROUP_ID=$(aws ec2 describe-security-groups --group-names $EC2_SECURITY_GROUP --region $AWS_REGION --query 'SecurityGroups[0].GroupId' --output text)
        log_info "Security group already exists: $GROUP_ID"
    fi
}

build_docker_image() {
    log_info "Building Docker image..."
    
    # Build the image
    docker build -t $PROJECT_NAME:latest .
    
    # Save image to tar file
    docker save $PROJECT_NAME:latest | gzip > ${PROJECT_NAME}.tar.gz
    
    log_success "Docker image built and saved"
}

create_user_data_script() {
    log_info "Creating EC2 user data script..."
    
    cat > user-data.sh << 'EOF'
#!/bin/bash

# Update system
yum update -y

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
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
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
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

EOF

    log_success "User data script created"
}

launch_ec2_instance() {
    log_info "Launching EC2 instance..."
    
    # Get the latest Amazon Linux 2 AMI ID
    AMI_ID=$(aws ec2 describe-images --owners amazon --filters "Name=name,Values=amzn2-ami-hvm-*-x86_64-gp2" "Name=state,Values=available" --query 'Images | sort_by(@, &CreationDate) | [-1].ImageId' --output text --region $AWS_REGION)
    
    # Get security group ID
    GROUP_ID=$(aws ec2 describe-security-groups --group-names $EC2_SECURITY_GROUP --region $AWS_REGION --query 'SecurityGroups[0].GroupId' --output text)
    
    # Launch instance
    INSTANCE_ID=$(aws ec2 run-instances \
        --image-id $AMI_ID \
        --count 1 \
        --instance-type $EC2_INSTANCE_TYPE \
        --key-name $EC2_KEY_NAME \
        --security-group-ids $GROUP_ID \
        --user-data file://user-data.sh \
        --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=minizon-ecommerce}]' \
        --region $AWS_REGION \
        --query 'Instances[0].InstanceId' \
        --output text)
    
    log_success "EC2 instance launched: $INSTANCE_ID"
    
    # Wait for instance to be running
    log_info "Waiting for instance to be running..."
    aws ec2 wait instance-running --instance-ids $INSTANCE_ID --region $AWS_REGION
    
    # Get public IP
    PUBLIC_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --region $AWS_REGION --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)
    
    log_success "Instance is running at: $PUBLIC_IP"
    
    # Wait for application to be ready
    log_info "Waiting for application to be ready..."
    sleep 60
    
    # Test application
    if curl -f http://$PUBLIC_IP/health; then
        log_success "Application is accessible at: http://$PUBLIC_IP"
    else
        log_warning "Application may still be starting up. Check http://$PUBLIC_IP in a few minutes."
    fi
}

upload_docker_image() {
    log_info "Uploading Docker image to EC2..."
    
    # Get public IP
    PUBLIC_IP=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=minizon-ecommerce" "Name=instance-state-name,Values=running" --region $AWS_REGION --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)
    
    if [ "$PUBLIC_IP" != "None" ] && [ "$PUBLIC_IP" != "" ]; then
        # Upload Docker image
        scp -i ${EC2_KEY_NAME}.pem -o StrictHostKeyChecking=no ${PROJECT_NAME}.tar.gz ec2-user@$PUBLIC_IP:/opt/minizon/
        
        # Restart application
        ssh -i ${EC2_KEY_NAME}.pem -o StrictHostKeyChecking=no ec2-user@$PUBLIC_IP "cd /opt/minizon && docker load < ${PROJECT_NAME}.tar.gz && docker-compose down && docker-compose up -d"
        
        log_success "Docker image uploaded and application restarted"
    else
        log_error "Could not find EC2 instance public IP"
    fi
}

cleanup() {
    log_info "Cleaning up temporary files..."
    rm -f user-data.sh ${PROJECT_NAME}.tar.gz
}

# Main deployment function
main() {
    log_info "Starting Minizon E-commerce EC2 deployment..."
    
    # Check prerequisites
    check_prerequisites
    
    # Create AWS resources
    create_key_pair
    create_security_group
    
    # Build and prepare application
    build_docker_image
    create_user_data_script
    
    # Launch EC2 instance
    launch_ec2_instance
    
    # Upload Docker image
    upload_docker_image
    
    # Cleanup
    cleanup
    
    log_success "Deployment completed successfully!"
    
    echo ""
    echo "🎉 Your Minizon e-commerce website is now live!"
    echo "📍 URL: http://$PUBLIC_IP"
    echo "🔍 Health check: http://$PUBLIC_IP/health"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure your domain name to point to $PUBLIC_IP"
    echo "2. Set up SSL certificate with Let's Encrypt"
    echo "3. Configure monitoring and logging"
    echo "4. Set up automated backups"
    echo ""
    echo "🔧 Management commands:"
    echo "SSH to instance: ssh -i ${EC2_KEY_NAME}.pem ec2-user@$PUBLIC_IP"
    echo "View logs: ssh -i ${EC2_KEY_NAME}.pem ec2-user@$PUBLIC_IP 'cd /opt/minizon && docker-compose logs -f'"
    echo "Restart app: ssh -i ${EC2_KEY_NAME}.pem ec2-user@$PUBLIC_IP 'cd /opt/minizon && docker-compose restart'"
}

# Error handling
trap cleanup EXIT

# Run main function
main "$@"
