// Importing the User model from models folder (to interact with the "users" table)
const { User } = require('../models');

// Importing bcrypt for password hashing and verification
const bcrypt = require('bcrypt');

// Importing JWT for generating authentication tokens
const jwt = require('jsonwebtoken');


// ========================================
// USER REGISTRATION CONTROLLER
// ========================================
exports.register = async (req, res) => {
    try {
        // Extracting user details from the request body
        const { username, email, password, role } = req.body;

        // Hashing the plain-text password before saving it to the database
        // The '10' represents the number of salt rounds (security level)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user record in the database
        const user = await User.create({
            username,
            email,
            password: hashedPassword,   // store the hashed password (never the plain one)
            role
        });

        // Sending success response with the new user's ID
        res.status(201).json({
            message: 'User registered successfully',
            userId: user.user_id,
        });

    } catch (error) {
        // If any error occurs during registration, send error response
        res.status(500).json({
            error: 'Registration failed',
            details: error.message,
        });
    }
};


// ========================================
// USER LOGIN CONTROLLER
// ========================================
exports.login = async (req, res) => {
    try {
        // Extracting email and password from the login request body
        const { email, password } = req.body;

        // Finding the user in the database by email
        const user = await User.findOne({ where: { email } });

        // If user does not exist, send 401 (Unauthorized)
        if (!user) return res.status(401).json({ error: 'User not found' });

        // Compare provided password with the hashed password stored in DB
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords do not match, deny access
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT token (valid for 1 day)
        // Payload contains user's ID and role for authentication/authorization
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,      // Secret key from .env file
            { expiresIn: '1d' }          // Token expires in 1 day
        );

        // Send success response with token
        res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        // If any error occurs during login, send error response
        res.status(500).json({
            error: 'Login failed',
            details: error.message,
        });
    }
};
