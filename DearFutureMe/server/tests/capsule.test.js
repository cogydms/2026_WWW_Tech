import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import capsuleRoutes from "../src/routes/capsuleRoutes.js";
import authRoutes from "../src/routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/capsules", capsuleRoutes);

let token;
let capsuleId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test123@test.com", password: "1234" });
    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Capsule API", () => {
    test("캡슐 생성 성공", async () => {
        const res = await request(app)
            .post("/api/capsules")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "테스트 캡슐",
                content: "테스트 내용",
                openDate: "2027-01-01"
            });
        expect(res.status).toBe(201);
        capsuleId = res.body._id;
    }, 10000);

    test("캡슐 목록 조회 성공", async () => {
        const res = await request(app)
            .get("/api/capsules")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000);

    test("캡슐 삭제 성공", async () => {
        const res = await request(app)
            .delete(`/api/capsules/${capsuleId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    }, 10000);
});