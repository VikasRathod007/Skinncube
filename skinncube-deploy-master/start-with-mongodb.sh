#!/bin/bash

# Start MongoDB and the application
echo "Starting Skincube application with MongoDB Compass support..."
docker compose -f docker-compose.dev.yml up -d

# Check if MongoDB is running
echo "Checking if MongoDB is accessible..."
sleep 5
if nc -z localhost 27017; then
    echo "✓ MongoDB is running and accessible on port 27017"
    echo
    echo "=== MongoDB Compass Connection Information ==="
    echo "Connection String: mongodb://mongoAdmin:skincubeAdminPass@localhost:27017/"
    echo "Username: mongoAdmin"
    echo "Password: skincubeAdminPass"
    echo
    echo "To connect to the application database directly:"
    echo "mongodb://skincubeUser:skincubeUserPass@localhost:27017/skinncube_db"
    echo
    echo "For more details, see mongodb-compass-guide.md"
    
    # Check if MongoDB Compass is installed
    if command -v mongodb-compass &> /dev/null; then
        echo
        echo "MongoDB Compass is installed. Would you like to open it now? (y/n)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            mongodb-compass "mongodb://mongoAdmin:skincubeAdminPass@localhost:27017/" &
        fi
    else
        echo
        echo "MongoDB Compass does not appear to be installed."
        echo "Download it from: https://www.mongodb.com/try/download/compass"
    fi
else
    echo "✗ Could not connect to MongoDB on port 27017"
    echo "Check docker logs for more information:"
    echo "docker compose -f docker-compose.dev.yml logs mongo"
fi

echo
echo "Application URLs:"
echo "- Frontend: http://localhost:3000"
echo "- API: http://localhost:8000"
