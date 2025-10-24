// Importing Express to create a router instance
const express = require('express');
const router = express.Router();

// Importing the project controller that contains the business logic for projects
const projectController = require('../controller/projectController');

// Importing authentication middleware to protect routes
const authenticateToken = require('../middleware/authMiddleware');


// ========================================
// PROJECT ROUTES
// ========================================

// 🔹 POST /projects → Create a new project
// This route is protected, so only authenticated users can create a project
router.post('/', authenticateToken, projectController.createProject);

// 🔹 GET /projects → Get all projects
// Protected route: Returns all projects accessible to the logged-in user
router.get('/', authenticateToken, projectController.getProjects);

// 🔹 GET /projects/:id → Get a single project by ID
// Protected route: Only users with access (admin or creator) can fetch the project
router.get('/:id', authenticateToken, projectController.getProjectById);

// 🔹 PUT /projects/:id → Update a project by ID
// Protected route: Only admin or project creator can update
router.put('/:id', authenticateToken, projectController.updateProject);

// 🔹 DELETE /projects/:id → Delete a project by ID
// Protected route: Only admin or project creator can delete
router.delete('/:id', authenticateToken, projectController.deleteProject);


// ========================================
// EXPORT ROUTER
// ========================================
module.exports = router;
