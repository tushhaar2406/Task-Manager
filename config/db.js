// Importing the Sequelize class (ORM) from the sequelize package
const { Sequelize } = require('sequelize');

// Importing environment variables from the .env file (like DB name, user, password, etc.)
require('dotenv').config();

// Creating a new Sequelize instance (this connects Node.js to your database)
const sequelize = new Sequelize(
    // Database name, username, and password are fetched securely from the .env file
    process.env.DB_NAME,      // e.g. 'task_manager'
    process.env.DB_USER,      // e.g. 'postgres'
    process.env.DB_PASSWORD,  // e.g. 'yourpassword'

    {
        host: process.env.DB_HOST || 'localhost', // Database host (defaults to localhost if not provided)
        dialect: 'postgres',                      // Specifies the type of database (PostgreSQL in this case)
        logging: false,                           // Disables SQL query logging in console for cleaner output
    }
);

// Exporting the sequelize instance so other files (like models) can use the same database connection
module.exports = sequelize;
