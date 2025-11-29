const express = require('express');
const router = express.Router();
const {
    getAllWebsites,
    getWebsiteById,
    createWebsite,
    updateWebsite,
    deleteWebsite
} = require('../controllers/websiteController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/websites
// @desc    Get all websites
// @access  Private (Protected by auth)
router.get('/', auth, getAllWebsites);

// @route   GET api/websites/:id
// @desc    Get website by ID
// @access  Private
router.get('/:id', auth, getWebsiteById);

// @route   POST api/websites
// @desc    Create a new website
// @access  Private
router.post('/', auth, createWebsite);

// @route   PUT api/websites/:id
// @desc    Update a website
// @access  Private
router.put('/:id', auth, updateWebsite);

// @route   DELETE api/websites/:id
// @desc    Delete a website
// @access  Private
router.delete('/:id', auth, deleteWebsite);

module.exports = router;
