const express = require('express');
const app = express();
require('dotenv').config({path : "./config/config.env"});
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middleware/errorMiddleware');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
const aiRouter = require('./routers/aiRouter');
app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(helmet());
app.use(cookieParser());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/ai', aiRouter);
app.use(errorMiddleware);
module.exports = app;