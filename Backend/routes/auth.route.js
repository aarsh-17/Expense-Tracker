import express from 'express';
import { login, logout, signup,refreshToken} from "../controllers/auth.controller.js";


const router=express.Router();

router.get('/',(req,res)=>{
  res.status(200).json({message:"Welcome to Expense Tracker API"});
})

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.post('/refreshToken',refreshToken)

export default router;