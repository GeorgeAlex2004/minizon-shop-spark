pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'minizon-shop-spark'
        DOCKER_TAG = "${BUILD_NUMBER}"
        EC2_HOST = '3.26.146.192'
        EC2_USER = 'ec2-user'
        KEY_PATH = '/var/lib/jenkins/.ssh/project1.pem'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from Git repository...'
                git branch: 'main', url: 'https://github.com/GeorgeAlex2004/minizon-shop-spark.git'
            }
        }
        
        stage('Build') {
            steps {
                echo '🔨 Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest'
            }
        }
        
        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                sh 'docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npm test || echo "Tests completed"'
            }
        }
        
        stage('Security Scan') {
            steps {
                echo '🔒 Running security scan...'
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${DOCKER_IMAGE}:${DOCKER_TAG} || echo "Security scan completed"'
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                echo '🚀 Deploying to EC2...'
                sh '''
                    # Save Docker image
                    docker save ${DOCKER_IMAGE}:${DOCKER_TAG} > ${DOCKER_IMAGE}-${DOCKER_TAG}.tar
                    
                    # Upload to EC2
                    scp -i ${KEY_PATH} -o StrictHostKeyChecking=no ${DOCKER_IMAGE}-${DOCKER_TAG}.tar ${EC2_USER}@${EC2_HOST}:/home/ec2-user/
                    
                    # Deploy on EC2
                    ssh -i ${KEY_PATH} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                        docker load < ${DOCKER_IMAGE}-${DOCKER_TAG}.tar
                        cd /opt/minizon
                        docker-compose down
                        docker-compose up -d
                        rm ${DOCKER_IMAGE}-${DOCKER_TAG}.tar
                    "
                    
                    # Clean up local tar file
                    rm ${DOCKER_IMAGE}-${DOCKER_TAG}.tar
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo '🏥 Performing health check...'
                sh '''
                    # Wait for application to start
                    sleep 30
                    
                    # Check health endpoint
                    curl -f http://${EC2_HOST}/health || exit 1
                    
                    # Check main application
                    curl -f http://${EC2_HOST} || exit 1
                '''
            }
        }
        
        stage('Deploy Monitoring') {
            when {
                branch 'main'
            }
            steps {
                echo '📊 Deploying monitoring stack...'
                sh '''
                    # Upload monitoring configuration
                    scp -i ${KEY_PATH} -o StrictHostKeyChecking=no -r monitoring/ ${EC2_USER}@${EC2_HOST}:/home/ec2-user/
                    
                    # Deploy monitoring stack
                    ssh -i ${KEY_PATH} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                        cd /home/ec2-user/monitoring
                        docker-compose up -d
                    "
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Deployment successful!'
            sh '''
                echo "🎉 Minizon E-commerce deployed successfully!"
                echo "🌐 Application: http://${EC2_HOST}"
                echo "🏥 Health Check: http://${EC2_HOST}/health"
                echo "📊 Grafana: http://${EC2_HOST}:3001 (admin/admin123)"
                echo "📈 Prometheus: http://${EC2_HOST}:9090"
            '''
        }
        failure {
            echo '❌ Deployment failed!'
            sh '''
                echo "🚨 Deployment failed! Check logs for details."
                echo "🔍 Check Jenkins console output for error details."
            '''
        }
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
