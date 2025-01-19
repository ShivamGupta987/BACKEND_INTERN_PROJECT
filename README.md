Backend Project - User Management System
This project implements a RESTful API for user management using Node.js, Express.js, and MongoDB. It provides functionalities for user and admin management, including authentication, authorization, and CRUD operations.

Table of Contents
Project Structure
Getting Started
API Endpoints
User Endpoints
Admin Endpoints
Running Tests
Environment Variables
Contributing
License
Project Structure
bash
Copy
Edit
backend-project/
│
├── controllers/          # Contains controllers for handling HTTP requests
│   ├── userController.js # Handles user-related requests
│   └── adminController.js # Handles admin-related requests
│
├── middleware/           # Contains middleware functions for auth and more
│   └── authMiddleware.js # Handles authentication and authorization checks
│
├── models/               # Mongoose models for MongoDB schemas
│   ├── userModel.js      # User schema
│   └── adminModel.js     # Admin schema
│
├── routes/               # API route definitions
│   ├── userRoutes.js     # Routes for user actions
│   └── adminRoutes.js    # Routes for admin actions
│
├── utils/                # Utility functions and scripts
│   └── createSuperAdmin.js # Script to create the super admin user
│
├── .env                  # Stores environment variables (e.g., MongoDB URI, JWT secret)
├── package.json          # Project dependencies and metadata
├── package-lock.json     # Ensures consistent builds by locking dependency versions
└── server.js             # Main entry point where the server is initialized
Getting Started
To set up the project locally, follow the steps below:

1. Install dependencies:
Run the following command to install all required dependencies:

bash
Copy
Edit
npm install
2. Create Super Admin (if not already created):
To set up the Super Admin user, run the following command. This script will create the Super Admin with default credentials:

bash
Copy
Edit
node utils/createSuperAdmin.js
3. Start the server:
To start the server and begin using the API, run:

bash
Copy
Edit
npm start
The server will run on the default port 5000 (or the port specified in the .env file).

4. Run tests:
If you're running tests (using nodemon or developer mode), you can use:

bash
Copy
Edit
npm run dev
API Endpoints
User Endpoints
These endpoints are for regular users to register, login, and manage their accounts.

POST /api/users/register: Registers a new user.
POST /api/users/login: Logs a user in and returns a JWT token.
GET /api/users/me: Retrieves the currently logged-in user's data (requires authentication).
PUT /api/users/update: Updates user information (requires authentication).
DELETE /api/users/deactivate: Deactivates the user's account (requires authentication).
Admin Endpoints
These endpoints are for admins to manage other users and perform administrative tasks.

POST /api/admin/register: Registers a new admin (requires Super Admin access).
POST /api/admin/login: Logs an admin in and returns a JWT token.
GET /api/admin/users: Retrieves a list of all users (requires Admin access).
Running Tests
To run the tests, you can use a testing framework like Jest or Mocha. Set up your test environment and run the tests using:

bash
Copy
Edit
npm run test
Ensure that your database is connected to the appropriate test environment before running tests.

Environment Variables
The application requires the following environment variables to run:

MONGO_URI: MongoDB connection string for your database.
JWT_SECRET: Secret key for signing JWT tokens.
PORT: Port for the server (default is 5000).
Example .env file:

makefile
Copy
Edit
MONGO_URI=mongodb+srv://your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Contributing


