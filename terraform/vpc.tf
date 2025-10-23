# VPC Configuration
resource "aws_vpc" "minizon_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "minizon-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "minizon_igw" {
  vpc_id = aws_vpc.minizon_vpc.id

  tags = {
    Name = "minizon-igw"
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count = 2

  vpc_id                  = aws_vpc.minizon_vpc.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "minizon-public-subnet-${count.index + 1}"
    Type = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count = 2

  vpc_id            = aws_vpc.minizon_vpc.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "minizon-private-subnet-${count.index + 1}"
    Type = "Private"
  }
}

# NAT Gateway
resource "aws_eip" "nat_gateway" {
  count = 2

  domain = "vpc"

  tags = {
    Name = "minizon-nat-gateway-eip-${count.index + 1}"
  }
}

resource "aws_nat_gateway" "minizon_nat" {
  count = 2

  allocation_id = aws_eip.nat_gateway[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name = "minizon-nat-gateway-${count.index + 1}"
  }

  depends_on = [aws_internet_gateway.minizon_igw]
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.minizon_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.minizon_igw.id
  }

  tags = {
    Name = "minizon-public-rt"
  }
}

resource "aws_route_table" "private" {
  count = 2

  vpc_id = aws_vpc.minizon_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.minizon_nat[count.index].id
  }

  tags = {
    Name = "minizon-private-rt-${count.index + 1}"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count = 2

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = 2

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# Data source for availability zones
data "aws_availability_zones" "available" {
  state = "available"
}
