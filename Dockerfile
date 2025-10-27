# Simple Dockerfile using existing built files
FROM nginx:alpine

# Copy built assets
COPY dist/ /usr/share/nginx/html/

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy health check file
COPY public/health /usr/share/nginx/html/health

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
