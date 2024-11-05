import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import messageRoute from './routes/message.route.js'
import { app,server } from './socket/socket.js';
dotenv.config();




const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello Backend',
        success: true
    });
});
//Api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post",postRoute)
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening at Port ${PORT}`);
});