# MiniZon Shop - E-commerce Platform

A modern e-commerce platform built with React, TypeScript, and deployed using a complete DevOps stack.

## 🚀 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Containerization**: Docker
- **Web Server**: Nginx
- **Cloud**: AWS EC2
- **CI/CD**: Jenkins
- **Monitoring**: Prometheus + Grafana
- **Infrastructure**: Terraform (planned)

## 📦 Features

- 🛍️ Product catalog with search and filters
- 🛒 Shopping cart and checkout
- ❤️ Wishlist functionality
- 👤 User authentication
- 📝 Product reviews
- 📱 Responsive design
- 🔍 Search functionality

## 🏗️ DevOps Setup

### CI/CD Pipeline (Jenkins)
- Automated build and deployment
- Docker image creation
- EC2 deployment

### Monitoring (Prometheus + Grafana)
- Metrics collection
- Application monitoring
- Container metrics (cAdvisor)
- System metrics (Node Exporter)

### Deployment
- AWS EC2 instance (t3.small)
- Docker Compose
- Nginx reverse proxy
- Health checks

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- AWS Account
- Jenkins

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Docker

```bash
# Build image
docker build -t minizon-shop .

# Run container
docker-compose up -d
```

### Deployment

See `DEPLOYMENT.md` for complete deployment instructions.

## 📊 Access URLs

- **Application**: http://3.26.146.192
- **Jenkins**: http://3.26.146.192:8081
- **Prometheus**: http://3.26.146.192:9090
- **Grafana**: http://3.26.146.192:3001
- **Health Check**: http://3.26.146.192/health

## 📂 Project Structure

```
minizon-shop-spark/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── contexts/       # Context providers
│   ├── data/           # Mock data
│   └── types/          # TypeScript types
├── docker/             # Docker configs
├── monitoring/         # Prometheus & Grafana
├── ansible/            # Configuration management
├── k8s/                # Kubernetes configs
└── terraform/          # Infrastructure as Code
```

## 🧪 Testing

```bash
# Run tests
npm test

# Linting
npm run lint
```

## 📝 License

MIT

## 👤 Author

George Alex - GeorgeAlex2004

## 🙏 Acknowledgments

- React team
- AWS
- Jenkins community
- Prometheus & Grafana teams
