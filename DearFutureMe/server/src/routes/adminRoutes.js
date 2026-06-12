//--- admin 관리자 기능 - 전체 캡슐 목록 보기. 삭제
import express from "express";
import User from "../models/User.js";
import Capsule from "../models/Capsule.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",requireAuth, requireAdmin, async (req, res) =>{ //전체 유저 목록 (관리자용)
    try{
        const users = await User.find();
        res.json(users);
    } catch (error){
        res.status(500).json({message: "server error", err: error.message});
    }
});

router.get("/capsules", requireAuth, requireAdmin, async(req, res) => { //전체 캡슐 목록
    try {
        const capsules = await Capsule.find().populate("userId", "username email");
        res.json(capsules);
    } catch(error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
});

router.delete("/:id", requireAuth, requireAdmin, async(req, res)=>{ //유저 삭제 (관리자용)
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "유저가 삭제되었습니다." })
    }catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
})

router.delete("/capsules/:id", requireAuth, requireAdmin, async(req, res) => { //캡슐 삭제
    try {
        const { id } = req.params;
        await Capsule.findByIdAndDelete(id);
        res.status(200).json({ message: "캡슐이 삭제되었습니다." });
    } catch(error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
});

export default router;