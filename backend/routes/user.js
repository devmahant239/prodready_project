const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/user/dashboard
// @desc    Get protected user dashboard metrics & data
// @access  Private
router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected dashboard data retrieved successfully!',
    metrics: {
      activeProjects: 4,
      totalDeployments: 28,
      systemStatus: 'Healthy',
      lastLogin: new Date().toISOString()
    },
    userContext: req.user
  });
});

module.exports = router;
