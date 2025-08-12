# Development Stage
FROM node:18-bookworm-slim as development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose development port
EXPOSE 3000

# Start development server
CMD ["npm", "start"]

# Build Stage
FROM node:18-bookworm-slim as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build arguments for environment
ARG NODE_ENV=production
ARG REACT_APP_DOMAIN=skinncube.com

# Build the application
RUN NODE_ENV=${NODE_ENV} REACT_APP_DOMAIN=${REACT_APP_DOMAIN} npm run build

# Production Stage
FROM caddy:2-alpine as production

# Copy built application
COPY --from=build /app/build /srv

# Expose ports
EXPOSE 80 443

# Caddy will use the Caddyfile mounted from docker-compose