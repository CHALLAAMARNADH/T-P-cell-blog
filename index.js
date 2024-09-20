const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

//database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!");
    } catch (err) {
        console.log(err);
    }
}

//middlewares
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000',"https://t-p-cell-blog-frontend.vercel.app"], // or specific frontend URL
    credentials: true // allow cookies from frontend
}));
// Add cors middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/",(req,res)=>{
    res.send("hello world");
});
app.listen(process.env.PORT, () => {
    connectDB();
    console.log("app is running on port " + process.env.PORT);
});
