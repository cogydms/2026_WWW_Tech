import express from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export function requireAdmin(req, res, next) {
    if(req.user.role !== "admin") {
        return res.status(403).json({ error: "관리자만 접근 가능합니다." });
    }
    next();
}

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`JWT verified successfully for user ID ${decoded.id}`);
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}