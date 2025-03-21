const express = require('express');
const isAuthenticated = require('../middleware/authMiddleware');
const { postResume, chatWithAi } = require('../controllers/aiChatController');

const aiRouter = express.Router();

aiRouter.post("/upload-resume",isAuthenticated, postResume);
aiRouter.post("/chat",isAuthenticated, chatWithAi);
module.exports = aiRouter; 
