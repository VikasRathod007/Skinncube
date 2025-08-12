#!/bin/bash

echo "=== Environment Configuration Test ==="
echo

# Test Development Environment
echo "1. Testing Development Environment..."
export NODE_ENV=development
export REACT_APP_DOMAIN=localhost:3000

cd frontend-latest/Skinncube

echo "NODE_ENV: $NODE_ENV"
echo "REACT_APP_DOMAIN: $REACT_APP_DOMAIN"

# Check if .env.development exists
if [ -f .env.development ]; then
    echo "✓ .env.development exists"
    echo "Contents:"
    cat .env.development
else
    echo "✗ .env.development missing"
fi

echo
echo "2. Testing Production Environment..."
export NODE_ENV=production
export REACT_APP_DOMAIN=api.skinncube.com

echo "NODE_ENV: $NODE_ENV"
echo "REACT_APP_DOMAIN: $REACT_APP_DOMAIN"

# Check if .env.production exists
if [ -f .env.production ]; then
    echo "✓ .env.production exists"
    echo "Contents:"
    cat .env.production
else
    echo "✗ .env.production missing"
fi

echo
echo "3. Testing API URL generation..."
node -e "
process.env.NODE_ENV = 'development';
process.env.REACT_APP_DOMAIN = 'localhost:3000';

function getApiUrl() {
  const isDev = process.env.NODE_ENV === 'development';
  const domain = process.env.REACT_APP_DOMAIN || 'localhost:3000';
  
  if (isDev) {
    return 'http://localhost:8000';
  } else {
    return 'https://' + domain;
  }
}

console.log('Development API URL:', getApiUrl());

process.env.NODE_ENV = 'production';
process.env.REACT_APP_DOMAIN = 'api.skinncube.com';

console.log('Production API URL:', getApiUrl());
"

echo
echo "=== Test Complete ==="
