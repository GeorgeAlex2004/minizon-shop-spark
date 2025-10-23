# Terraform configuration for Minizon E-commerce Infrastructure

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
  
  backend "s3" {
    bucket = "minizon-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-west-2"
  }
}

# Configure AWS Provider
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Minizon"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Configure Kubernetes Provider
provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)
  token                  = data.aws_eks_auth.cluster.token
}

# Data sources
data "aws_eks_cluster" "cluster" {
  name = var.cluster_name
}

data "aws_eks_auth" "cluster" {
  name = var.cluster_name
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "minizon-cluster"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "minizon.example.com"
}
