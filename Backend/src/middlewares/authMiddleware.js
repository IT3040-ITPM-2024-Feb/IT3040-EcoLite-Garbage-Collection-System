const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }
    // Set authenticated user in request object
    req.user = user;

    // Continue to next middleware
    next();
  } catch (error) {
    // Handle authentication errors
    res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = authMiddleware;