#!/bin/bash

# Quick Development Start Script
echo "🚀 Starting Skincube in DEVELOPMENT mode..."

cd "$(dirname "$0")"

# Switch to development environment
./switch-env.sh dev

# Start services
echo "🔧 Starting development services..."
cd skinncube-deploy-master
docker compose up -d

# Wait for services to start
sleep 5

# Show status
echo ""
echo "✅ Development environment started!"
echo ""
echo "🌐 Access points:"
echo "   Frontend (Caddy): http://localhost:8000"
echo "   Frontend (Direct): http://localhost:3000"
echo "   API: http://localhost:8000/api/v1"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker compose logs -f [service]"
echo "   Stop: docker compose down"
echo "   Switch to prod: ./switch-env.sh prod your-domain.com"
echo ""
echo "Happy coding! 🎉"
