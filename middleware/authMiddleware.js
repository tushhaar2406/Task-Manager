// Importing jsonwebtoken to verify and decode JWT tokens
const jwt = require('jsonwebtoken');

// ========================================
// MIDDLEWARE: Authenticate JWT Token
// ========================================
const authenticateToken = (req, res, next) => {
    // Extracting the 'Authorization' header from the incoming request
    // Example header format: "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];

    // Splitting the header to get only the token part (after 'Bearer ')
    // If no header is found, token will be 'undefined'
    const token = authHeader && authHeader.split(' ')[1];

    // If token is not present, deny access with 401 Unauthorized
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verifying the token using the secret key stored in .env file
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If token is invalid or expired, send 403 Forbidden
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }

        // If valid, attach the decoded user info (from token payload) to the request object
        // So we can access req.user in protected routes
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    });
};

// Exporting the middleware to use it in protected routes
module.exports = authenticateToken;
