import express from "express";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js"
import dotenv from "dotenv"

const router = express.Router();

dotenv.config()

//Register
router.post("/register",async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            userName: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json("User Registered Successfully")
    } catch(error){
        res.status(500).json(error.message);
    }
});

//Login
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json("User not found");

        const validPassword = await bcrypt.hash(req.body.password,user.password);

        if(!validPassword) return res.status(400).json("Wrong Password")

        const token = jwt.sign(
            {id: user._id},
            proccess.env.JWTSECRET,
            {expiresIn: "id"}
        );

        res.json({token, user});


    }catch(error){
        res.status(500).json(error.message)
    }
});

export default router;