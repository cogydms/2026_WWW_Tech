import express from "express";
import dotenv from 'dotenv'
import connectDB from "./db/connect.js";
import capsuleRoutes from "./routes/capsuleRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import friendRoutes from "./routes/friendRoutes.js";
import cors from "cors";

dotenv.config()

const app = express()
app.use(cors());
app.use(express.json());
app.use("/api/capsules", capsuleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);

const port = process.env.PORT || 3000

connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
