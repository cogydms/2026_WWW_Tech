import express from "express";
import User from "../models/User.js";
import Capsule from "../models/Capsule.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// 여기에 친구 기능 라우트 추가
router.get("/",requireAuth, async (req, res) =>{ //친구 목록 
    try{
        const me = await User.findById(req.user.id).populate("friends", "username email");
        res.json(me.friends);
    } catch (error){
        res.status(500).json({message: "server error", err: error.message});
    }
});

router.post("/", requireAuth, async(req, res)=>{ //친구 추가
    try{
        const {email} = req.body; //이메일은 중복이 없으니 이메일로 찾기 
        const friend = await User.findOne({ email });
        if(!friend) return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
        if(friend._id.toString() === req.user.id) {
            return res.status(400).json({ message: "자기 자신을 추가할 수 없습니다." });
        }
        const me = await User.findById(req.user.id);
        if(me.friends.includes(friend._id)) {
            return res.status(409).json({ message: "이미 친구입니다." });
        }

        me.friends.push(friend._id);
        await me.save();
        res.json({ message: "친구가 추가되었습니다.", friend });
       
    }catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
})

router.get("/:id/capsules", requireAuth, async(req, res) => {
    try {
        const { id } = req.params;
        const me = await User.findById(req.user.id);
        
        if(!me.friends.includes(id)) {
            return res.status(403).json({ message: "친구만 볼 수 있습니다." });
        }
        
        const capsules = await Capsule.find({ userId: id, isOpened: true });
        res.json(capsules);
    } catch(error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
});


export default router;