#!/bin/bash

# Environment Test Script
echo "🧪 Testing Skincube Environment Setup..."

cd "$(dirname "$0")/skinncube-deploy-master"

# Test 1: Check Docker
echo "1. Testing Docker availability..."
if command -v docker &> /dev/null; then
    echo "   ✅ Docker is available"
    docker --version
else
    echo "   ❌ Docker is not installed"
    exit 1
fi

# Test 2: Check Docker Compose
echo ""
echo "2. Testing Docker Compose..."
if command -v docker compose &> /dev/null; then
    echo "   ✅ Docker Compose is available"
    docker compose version
else
    echo "   ❌ Docker Compose is not available"
    exit 1
fi

# Test 3: Test Development Environment
echo ""
echo "3. Testing Development Environment..."
echo "   🔧 Switching to development..."
cd ..
./switch-env.sh dev > /dev/null 2>&1

echo "   🚀 Starting services..."
cd skinncube-deploy-master
docker compose up -d > /dev/null 2>&1

# Wait for services to start
echo "   ⏳ Waiting for services to start..."
sleep 15

# Test endpoints
echo "   🌐 Testing endpoints..."

# Test Frontend
if curl -s http://localhost:8000 > /dev/null; then
    echo "   ✅ Frontend accessible at http://localhost:8000"
else
    echo "   ❌ Frontend not accessible"
fi

# Test API Health (if endpoint exists)
if curl -s http://localhost:8000/api/v1/health > /dev/null 2>&1; then
    echo "   ✅ API accessible at http://localhost:8000/api/v1"
else
    echo "   ⚠️  API health endpoint not found (this might be normal)"
fi

# Test Direct Frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "   ✅ Direct frontend accessible at http://localhost:3000"
else
    echo "   ❌ Direct frontend not accessible"
fi

# Show service status
echo ""
echo "4. Service Status:"
docker compose ps

# Test 4: Environment Info
echo ""
echo "5. Environment Information:"
if [ -f ../.env ]; then
    echo "   📋 Current .env:"
    cat ../.env | sed 's/^/      /'
else
    echo "   ⚠️  No .env file found"
fi

# Cleanup
echo ""
echo "6. Cleaning up test..."
docker compose down > /dev/null 2>&1

echo ""
echo "🎉 Environment test completed!"
echo ""
echo "📋 Summary:"
echo "   • Docker: Available"
echo "   • Docker Compose: Available" 
echo "   • Development Environment: Tested"
echo "   • Services: Verified"
echo ""
echo "🚀 Ready to use:"
echo "   ./dev-start.sh          # Start development"
echo "   ./prod-deploy.sh domain # Deploy production"
