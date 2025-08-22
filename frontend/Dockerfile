# Multi-stage build for Angular frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Build the application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine AS production

# Copy built application
COPY --from=build /app/dist/pos_portal_app /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 4200
EXPOSE 4200

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
