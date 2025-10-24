// Importing Project and User models to interact with the database
const { Project, User } = require('../models');


// ========================================
// CREATE A NEW PROJECT
// ========================================
exports.createProject = async (req, res) => {
    try {
        // Only admin users are allowed to create projects
        if (req.user.role !== 'admin') {
           return res.status(403).json({ error: 'Only admins can create projects' });
    }
        // Extracting project details from request body
        const { name, description } = req.body;

        // Validate that project name is provided
        if (!name) return res.status(400).json({ error: 'Project name is required' });

        // Create a new project record in the database
        const project = await Project.create({
            project_name: name,
            description,
            createdBy: req.user.user_id  // req.user comes from authentication middleware
        });

        // Send success response with created project
        res.status(201).json({ message: 'Project created successfully', project });

    } catch (error) {
        // Handle errors (database issues, server errors)
        res.status(500).json({ error: 'Failed to create project', details: error.message });
    }
};


// ========================================
// GET ALL PROJECTS
// ========================================
exports.getProjects = async (req, res) => {
    try {
        let projects;

        // If the user is admin, fetch projects created by the admin
        // You can modify logic if admin should see all projects
        if (req.user.role === 'admin') {
            projects = await Project.findAll({
                where: { createdBy: req.user.user_id },
                include: [{ model: User, attributes: ['user_id','username', 'email'] }]
            });
        }

        // Return fetched projects
        res.status(200).json({ projects });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
    }
};


// ========================================
// GET A SINGLE PROJECT BY ID
// ========================================
exports.getProjectById = async (req, res) => {
    try {
        // Find project by primary key (ID)
        const project = await Project.findByPk(req.params.id, { include: [User] });

        if (!project) return res.status(404).json({ error: 'Project not found' });

        // Restrict access: Non-admin users can only access their own projects
        if (req.user.role !== 'admin' && project.createdBy !== req.user.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.status(200).json({ project });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project', details: error.message });
    }
};


// ========================================
// UPDATE A PROJECT
// ========================================
exports.updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Find the project to update
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        // Access control: Only admin or project creator can update
        if (req.user.role !== 'admin' && project.createdBy !== req.user.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update fields if new values are provided
        project.project_name = name || project.project_name;
        project.description = description || project.description;

        // Save changes to database
        await project.save();

        res.status(200).json({ message: 'Project updated successfully', project });

    } catch (error) {
        res.status(500).json({ error: 'Failed to update project', details: error.message });
    }
};


// ========================================
// DELETE A PROJECT
// ========================================
exports.deleteProject = async (req, res) => {
    try {
        // Find the project to delete
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        // Access control: Only admin or project creator can delete
        if (req.user.role !== 'admin' && project.createdBy !== req.user.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Delete project from database
        await project.destroy();

        res.status(200).json({ message: 'Project deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project', details: error.message });
    }
};
