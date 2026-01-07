import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config()

import authRoutes from './routes/auth.js'

const app = express();
const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT;


app.use(express.json());
app.use(bodyParser.json());
app.use("/api", authRoutes)

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected successfully!");
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);
    })
}).catch((error)=>{
    console.log(`Database connection failed ${error}`)
})