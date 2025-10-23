# Ansible Configuration for Minizon E-commerce Deployment

## Prerequisites
- Ansible 2.9+
- kubectl configured
- Kubernetes cluster access
- Docker registry credentials

## Playbooks

### 1. deploy.yml
Main deployment playbook that:
- Creates namespace if it doesn't exist
- Deploys the frontend application
- Creates service and ingress
- Waits for deployment to be ready

**Usage:**
```bash
ansible-playbook -i inventory.yml deploy.yml -e "BUILD_NUMBER=123"
```

### 2. rolling-update.yml
Performs rolling updates by:
- Updating the deployment image
- Waiting for rollout to complete
- Verifying deployment status

**Usage:**
```bash
ansible-playbook -i inventory.yml rolling-update.yml -e "BUILD_NUMBER=124"
```

### 3. rollback.yml
Rolls back to a previous version:
- Specifies rollback revision
- Performs rollback operation
- Verifies rollback status

**Usage:**
```bash
ansible-playbook -i inventory.yml rollback.yml -e "ROLLBACK_REVISION=1"
```

## Environment Variables
- `BUILD_NUMBER`: Docker image tag
- `DOCKER_REGISTRY`: Docker registry URL
- `DOMAIN_NAME`: Domain name for ingress

## Inventory Groups
- `staging`: Staging environment
- `production`: Production environment
- `kubernetes`: General Kubernetes operations

## Variables
- `app_name`: Application name (minizon-frontend)
- `namespace`: Kubernetes namespace
- `image_tag`: Docker image tag
- `docker_registry`: Docker registry URL
- `replicas`: Number of replicas
