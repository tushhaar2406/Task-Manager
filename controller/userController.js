const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
exports.register = async (req, res) => {
    try{
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, email, password: hashedPassword, role});
        res.status(201).json({ message: 'User registered successfully', userId: user.user_id });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if(!user) return res.status(401).json({ error: 'User not found' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({user_id: user.user_id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token });
        
        } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
    
};