const { DataTypes, TINYINT } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
    task_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,  
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    description:{
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
    },
    attachemnt:{
        type: DataTypes.STRING,
    },

},{
    timestamps: true,
});

module.exports = Task;