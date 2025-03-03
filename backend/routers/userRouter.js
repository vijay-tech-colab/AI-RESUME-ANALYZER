const express = require('express');
const {
    postRegisterUser,
    postLoginUser,
    updateUserProfile,
    deleteUserAccount,
    profileMe,
    logoutUser,
    forgotUserPassword,
    resetUserPassword,
    updateUserPassword
} = require('../controllers/usercontroller');
const isAuthenticated = require('../middleware/authMiddleware');

const userRouter = express.Router();

// Auth Routes
userRouter.post('/register', postRegisterUser);
userRouter.post('/login', postLoginUser);
userRouter.get('/logout', isAuthenticated, logoutUser);

// User Profile & Account Management
userRouter.get('/profile/me', isAuthenticated, profileMe);
userRouter.patch('/update-user', isAuthenticated, updateUserProfile);
userRouter.delete('/delete-user-account', isAuthenticated, deleteUserAccount);

// Password Management
userRouter.put('/change-password', isAuthenticated, updateUserPassword);
userRouter.post('/forgot-password', forgotUserPassword);
userRouter.post('/password-reset/:token', resetUserPassword);

module.exports = userRouter;
