import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "../src/routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Auth API", () => {
    test("회원가입 성공", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                username: "testuser",
                email: "test123@test.com",
                password: "1234"
            });
        expect(res.status).toBe(201);
    }, 10000);

    test("로그인 성공", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test123@test.com",
                password: "1234"
            });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    }, 10000);
});