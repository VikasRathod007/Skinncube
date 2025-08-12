#!/bin/bash

# Environment Switcher Script
# Usage: ./switch-env.sh [dev|prod] [domain]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

function show_usage() {
    echo "🔄 Environment Switcher for Skincube"
    echo ""
    echo "Usage:"
    echo "  ./switch-env.sh dev                    # Switch to development"
    echo "  ./switch-env.sh prod [domain]          # Switch to production"
    echo ""
    echo "Examples:"
    echo "  ./switch-env.sh dev"
    echo "  ./switch-env.sh prod skinncube.com"
    echo "  ./switch-env.sh prod"
    echo ""
}

function switch_to_dev() {
    echo "🔧 Switching to DEVELOPMENT environment..."
    
    # Stop any running containers
    cd skinncube-deploy-master
    docker compose down 2>/dev/null || true
    cd ..
    
    # Set environment variables
    cat > .env << EOF
# Development Environment
NODE_ENV=development
DOMAIN_NAME=localhost
EOF
    
    echo "✅ Development environment configured!"
    echo ""
    echo "🚀 To start development:"
    echo "   cd skinncube-deploy-master && docker compose up -d"
    echo ""
    echo "🌐 Access points:"
    echo "   Frontend: http://localhost:8000"
    echo "   Direct Frontend: http://localhost:3000" 
    echo "   API: http://localhost:8000/api/v1"
}

function switch_to_prod() {
    local domain=${1:-"skinncube.com"}
    
    echo "🚀 Switching to PRODUCTION environment..."
    echo "Domain: $domain"
    
    # Stop any running containers
    cd skinncube-deploy-master
    docker compose down 2>/dev/null || true
    cd ..
    
    # Set environment variables
    cat > .env << EOF
# Production Environment
NODE_ENV=production
DOMAIN_NAME=$domain
EOF
    
    echo "✅ Production environment configured!"
    echo ""
    echo "🚀 To start production:"
    echo "   cd skinncube-deploy-master && docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
    echo ""
    echo "🌐 Access points:"
    echo "   Frontend: https://$domain"
    echo "   API: https://api.$domain/api/v1"
    echo ""
    echo "⚠️  Make sure DNS points to this server:"
    echo "   A Record: $domain → YOUR_SERVER_IP"
    echo "   A Record: api.$domain → YOUR_SERVER_IP"
}

function show_status() {
    echo "📊 Current Environment Status:"
    echo ""
    
    if [ -f .env ]; then
        echo "🔧 Environment variables:"
        cat .env
        echo ""
    fi
    
    echo "🐳 Docker containers:"
    docker compose ps 2>/dev/null || echo "No containers running"
    echo ""
}

# Main script logic
case "$1" in
    "dev"|"development")
        switch_to_dev
        ;;
    "prod"|"production")
        switch_to_prod "$2"
        ;;
    "status"|"")
        show_status
        ;;
    *)
        show_usage
        exit 1
        ;;
esac
