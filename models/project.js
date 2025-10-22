const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Project = sequelize.define('Project', {
    project_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
}

);
module.exports = Project;