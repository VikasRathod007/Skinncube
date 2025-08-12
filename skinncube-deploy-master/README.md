# Skincube Application

## Environment Setup

Skincube uses a clean and robust environment flag system for development and production.

### Development Environment

```bash
# Start the development environment
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.dev.yml logs -f
```

### Production Environment

```bash
# Start the production environment
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## MongoDB Integration with MongoDB Compass

Skincube's MongoDB database can be accessed and managed using MongoDB Compass, a powerful GUI for MongoDB.

### Connection Details

- **Connection String**: `mongodb://mongoAdmin:skincubeAdminPass@localhost:27017/`
- **Admin User**: mongoAdmin
- **Application User**: skincubeUser (has access to skinncube_db)

### How to Connect

1. Install [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Use the connection string above
3. Navigate to the `skinncube_db` database to view and modify data

For more detailed instructions, see the [MongoDB Compass Guide](./mongodb-compass-guide.md)

## Database Migration

To copy data between environments:

1. Use MongoDB Compass to connect to the source database
2. Export collections as JSON
3. Connect to the target database
4. Import the JSON files

## Project Structure

- `backend/` - Node.js Express API server
- `frontend-latest/` - React frontend application
- `caddy/` - Caddy web server configuration for proxying requests

## Environment Variables

See `.env.development` and `.env.production` for environment-specific configurations.
