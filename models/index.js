const sequelize = require('../config/db');
const User = require('./user');
const Project = require('./project');
const Task = require('./task');

// ========================
// DEFINE RELATIONSHIPS
// ========================

// 1️⃣ One User → Many Projects
User.hasMany(Project, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'createdBy' });

// 2️⃣ One Project → Many Tasks
Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

// 3️⃣ One User → Many Tasks (Assigned Tasks)
User.hasMany(Task, { foreignKey: 'assignedTo', onDelete: 'SET NULL' });
Task.belongsTo(User, { foreignKey: 'assignedTo' });

// Export everything
module.exports = { sequelize, User, Project, Task };
