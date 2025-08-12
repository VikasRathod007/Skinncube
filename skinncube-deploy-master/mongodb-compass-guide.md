# MongoDB Compass Connection Guide

## Connection Details

Use the following details to connect to the Skincube MongoDB instance from MongoDB Compass:

**Connection URI format:**
```
mongodb://mongoAdmin:skincubeAdminPass@localhost:27017/
```

## Authentication

For admin access (recommended for database management), use:
- **Username:** mongoAdmin
- **Password:** skincubeAdminPass

For application database access, use:
- **Username:** skincubeUser
- **Password:** skincubeUserPass
- **Database:** skinncube_db

## Steps to Connect

1. Open MongoDB Compass
2. In the connection field, enter: `mongodb://mongoAdmin:skincubeAdminPass@localhost:27017/`
3. Click "Connect"
4. Navigate to the "skinncube_db" database

## Working with the Database

- You can view and edit all collections in the skinncube_db database
- Make sure to restart the backend service after making significant changes to the database structure
- For schema changes, it's recommended to update the backend models as well

## Security Notes

- These credentials are for development purposes only
- For production, use more secure passwords and consider using environment variables
- The MongoDB port (27017) is exposed only in the development environment
