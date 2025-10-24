// Importing the Sequelize instance (database connection)
const sequelize = require('../config/db');

// Importing all models
const User = require('./user');
const Project = require('./project');
const Task = require('./task');

// ===============================================
// DEFINE RELATIONSHIPS BETWEEN MODELS
// ===============================================

// 1️⃣ One User → Many Projects
// Meaning: One user can create multiple projects.
// 'createdBy' column will be added to the 'Projects' table as a foreign key.
User.hasMany(Project, { 
    foreignKey: 'createdBy',     // Column name in Project table referencing User
    onDelete: 'CASCADE',         // If a user is deleted, delete their projects too
});
Project.belongsTo(User, { 
    foreignKey: 'createdBy',     // Connects each project back to its creator (user)
});

// 2️⃣ One Project → Many Tasks
// Meaning: One project can have multiple tasks.
// 'projectId' column will be added to the 'Tasks' table as a foreign key.
Project.hasMany(Task, { 
    foreignKey: 'projectId',     // Column name in Task table referencing Project
    onDelete: 'CASCADE',         // If a project is deleted, delete all related tasks
});
Task.belongsTo(Project, { 
    foreignKey: 'projectId',     // Each task belongs to a specific project
});

// 3️⃣ One User → Many Tasks (Assigned Tasks)
// Meaning: A user can be assigned to many tasks (for example, employees assigned work).
// 'assignedTo' column will be added to the 'Tasks' table as a foreign key.
User.hasMany(Task, { 
    foreignKey: 'assignedTo',    // Column name in Task table referencing User
    onDelete: 'SET NULL',        // If a user is deleted, keep the task but set 'assignedTo' to NULL
});
Task.belongsTo(User, { 
    foreignKey: 'assignedTo',    // Connects each task to its assigned user
});

// ===============================================
// EXPORT ALL MODELS AND SEQUELIZE INSTANCE
// ===============================================
// Exporting the Sequelize connection and all models for use across the app
module.exports = { sequelize, User, Project, Task };
