// Importing DataTypes from Sequelize to define the types of fields (like STRING, INTEGER, etc.)
const { DataTypes } = require('sequelize');

// Importing the database connection instance from config/db.js
const sequelize = require('../config/db');

// Defining a Sequelize model named 'Project'
// This will create a 'Projects' table in the database (Sequelize pluralizes the name by default)
const Project = sequelize.define('Project', {
    // Primary key for the project table
    project_id: {
        type: DataTypes.INTEGER,        // Data type: Integer
        autoIncrement: true,            // Automatically increases by 1 for each new project
        primaryKey: true,               // Marks this column as the primary key
    },

    // Name of the project
    project_name: {
        type: DataTypes.STRING,         // Data type: String (text)
        allowNull: false,               // This field is required (cannot be empty)
    },

    // Description of the project (optional)
    description: {
        type: DataTypes.TEXT,           // Data type: Text (used for long strings or paragraphs)
        allowNull: true,                // This field is optional
    },
}, {
    // Model options
    timestamps: true,                   // Automatically adds 'createdAt' and 'updatedAt' columns
});

// Exporting the Project model so it can be used in other parts of the project (like controllers)
module.exports = Project;
