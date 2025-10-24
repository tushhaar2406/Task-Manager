// Importing Express to create a new router instance
const express = require('express');

// Creating a router object (used to define route endpoints)
const router = express.Router();

// Importing the user controller which contains register and login logic
const userController = require('../controller/userController');


// ========================================
// USER ROUTES
// ========================================

// 🔹 POST /register → Registers a new user
// When a POST request is made to /api/users/register, 
// the userController.register function is executed.
router.post('/register', userController.register);  


// 🔹 POST /login → Logs in an existing user
// When a POST request is made to /api/users/login, 
// the userController.login function handles authentication.
router.post('/login', userController.login);


// ========================================
// EXPORT ROUTER
// ========================================
// Exporting this router so it can be used in server.js (or app.js)
// Example: app.use('/api/users', userRoutes);
module.exports = router;
