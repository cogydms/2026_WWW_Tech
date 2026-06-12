import express from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post("/signup", async (req, res)=>{ //회원가입
    const {username, email, password}=req.body;
    if(!email || !password) return res.status(400).json({error: "email and password required"});

    try{
        const existing = await User.findOne({ email });
        if (existing){
            return res.status(409).json({ message: "이미 사용 중인 이메일입니다." });
        }
        const hashed = await bcryptjs.hash(password, 10);
        const user = await User.create({ username,email,password:hashed});
        res.status(201).json({email: user.email});
    }catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
});

router.post("/login", async(req, res)=>{ //로그인 (이메일이랑 비번을 body에 숨겨서 보내기 위해 post 사용)
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({error: "email and password required"});

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "유저를 찾을 수 없습니다."});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "비밀번호가 틀렸습니다."});
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).json({token});
    }catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
});

export default router;