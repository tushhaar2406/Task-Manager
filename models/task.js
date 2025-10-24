// Importing DataTypes from Sequelize to define the structure (data types) of table columns
const { DataTypes } = require('sequelize');

// Importing the Sequelize instance (database connection) from the config folder
const sequelize = require('../config/db');

// Defining a Sequelize model named 'Task'
// This will represent the 'Tasks' table in your database
const Task = sequelize.define('Task', {

    // Primary key column - unique ID for each task
    task_id: {
        type: DataTypes.INTEGER,        // Data type: Integer (number)
        autoIncrement: true,            // Automatically increases for every new record
        primaryKey: true,               // Marks it as the primary key (unique identifier)
    },

    // Title of the task
    title: {
        type: DataTypes.STRING,         // Data type: String (short text)
        allowNull: false,               // This field is mandatory (cannot be null)
    },

    // Detailed description about the task (optional)
    description: {
        type: DataTypes.TEXT,           // Data type: Text (used for longer text content)
    },

    // Status of the task - can only have one of these three fixed values
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'), // Allowed values only
        defaultValue: 'pending',         // Default status when a task is created
    },

    // Attachment (optional) - can store file name or file path
    attachemnt: {                        // ⚠️ Typo here → should be "attachment"
        type: DataTypes.STRING,          // Data type: String (stores file path or URL)
    },

}, {
    // Model configuration options
    timestamps: true,                    // Automatically adds 'createdAt' and 'updatedAt' columns
});

// Exporting the Task model so it can be imported and used elsewhere in your app
module.exports = Task;
