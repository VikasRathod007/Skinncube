#!/bin/bash

# Production Deployment Script
echo "🚀 Starting Skincube in PRODUCTION mode..."

# Check if domain is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your domain name"
    echo "Usage: ./prod-deploy.sh your-domain.com"
    echo "Example: ./prod-deploy.sh skinncube.com"
    exit 1
fi

DOMAIN=$1

cd "$(dirname "$0")"

# Switch to production environment
./switch-env.sh prod $DOMAIN

# Start services
echo "🔧 Starting production services..."
cd skinncube-deploy-master
docker compose -f docker-compose.dev.yml -f docker-compose.prod.yml up -d --build

# Wait for services to start
sleep 10

# Show status
echo ""
echo "✅ Production deployment completed!"
echo ""
echo "🌐 Access points:"
echo "   Frontend: https://$DOMAIN"
echo "   API: https://api.$DOMAIN/api/v1"
echo ""
echo "⚠️  Important notes:"
echo "   - Make sure DNS points to this server"
echo "   - SSL certificates will be auto-generated"
echo "   - Monitor logs: docker compose logs -f caddy"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker compose logs -f [service]"
echo "   Stop: docker compose down"
echo "   Switch to dev: ./switch-env.sh dev"
echo ""
echo "Production ready! 🎉"
