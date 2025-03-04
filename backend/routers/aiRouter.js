const express = require('express');
const isAuthenticated = require('../middleware/authMiddleware');
const { postResume } = require('../controllers/aiChatController');

const aiRouter = express.Router();

aiRouter.post("/upload-resume", postResume);
module.exports = aiRouter; 
