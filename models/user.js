// Importing DataTypes object from Sequelize to define the data types for our model fields
const { DataTypes } = require('sequelize');

// Importing the Sequelize instance (connection setup) from the config folder
const sequelize = require('../config/db');

// Defining a Sequelize model named "User"
// This model represents the "users" table in the database
const User = sequelize.define('User', {
    // Primary key column for uniquely identifying each user
    user_id: {
        type: DataTypes.INTEGER,        // Data type: Integer (number)
        autoIncrement: true,            // Automatically increments for each new record
        primaryKey: true,               // Marks this field as the primary key
    },

    // Username column
    username: {
        type: DataTypes.STRING,         // Data type: String (text)
        allowNull: false,               // This field cannot be empty (required)
    },

    // Email column
    email: {
        type: DataTypes.STRING,         // Data type: String (text)
        allowNull: false,               // Required field
        unique: true,                   // Ensures no two users have the same email
    },

    // Password column
    password: {
        type: DataTypes.STRING,         // Data type: String (usually hashed)
        allowNull: false,               // Required field
    },

    // Role column (defines if user is 'user' or 'admin')
    role: {
        type: DataTypes.ENUM('user', 'admin'), // Restricts value to either 'user' or 'admin'
        defaultValue: 'user',                  // Default value is 'user' when not provided
    },

}, {
    // Model options
    timestamps: true,   // Automatically adds 'createdAt' and 'updatedAt' fields to the table
});

// Exporting the User model so it can be used in other parts of the project
module.exports = User;
