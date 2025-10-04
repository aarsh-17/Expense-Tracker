import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectMongoDB } from './lib/db.js';
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";


const app=express();
dotenv.config();
app.use(cookieParser())
app.use(express.json());

const PORT=process.env.PORT || 5000;

app.use("/auth",authRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectMongoDB();
});