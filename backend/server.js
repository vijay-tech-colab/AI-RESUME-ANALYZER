const app = require('./app');
const connectDB = require('./db/dbConnection');
const PORT = process.env.PORT || 3000
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
});

app.listen(PORT , async () => {
    await connectDB();
    console.log("server running....")
})