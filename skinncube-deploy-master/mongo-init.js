// MongoDB initialization script to create admin user
// This will be executed when the MongoDB container is first initialized

print('Starting MongoDB initialization script...');

// Switch to admin database
db = db.getSiblingDB('admin');

try {
  // Create a new admin user if it doesn't exist
  if (!db.getUser('mongoAdmin')) {
    print('Creating mongoAdmin user...');
    db.createUser({
      user: 'mongoAdmin',
      pwd: 'skincubeAdminPass',
      roles: [{ role: 'root', db: 'admin' }]
    });
    print('mongoAdmin user created successfully.');
  } else {
    print('mongoAdmin user already exists.');
  }
} catch (error) {
  print('Error creating mongoAdmin user: ' + error);
}

// Switch to the application database
db = db.getSiblingDB('skinncube_db');

try {
  // Create a user for the application database if it doesn't exist
  if (!db.getUser('skincubeUser')) {
    print('Creating skincubeUser user...');
    db.createUser({
      user: 'skincubeUser',
      pwd: 'skincubeUserPass',
      roles: [
        { role: 'readWrite', db: 'skinncube_db' },
        { role: 'dbAdmin', db: 'skinncube_db' },
        { role: 'userAdmin', db: 'skinncube_db' }
      ]
    });
    print('skincubeUser user created successfully.');
  } else {
    print('skincubeUser user already exists.');
  }
} catch (error) {
  print('Error creating skincubeUser user: ' + error);
}

// Create the test collection if it doesn't exist
try {
  print('Creating test_collection...');
  db.createCollection('test_collection');
  print('test_collection created successfully.');
} catch (error) {
  print('Error creating test_collection (it may already exist): ' + error);
}

print('MongoDB initialization completed successfully.');
