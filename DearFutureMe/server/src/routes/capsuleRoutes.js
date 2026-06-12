//--- 데이터를 어떻게 다룰지 정의 
//--- capsuleRoutes : 캡슐 만들기, 목록보기, 수정, 삭제
import express from "express";
import Capsule from "../models/Capsule.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, async(req, res)=>{ //POST /api/capsules
    const {title, content, openDate} = req.body; //클라이언트가 보낸 JSON에서 세 개 꺼내기

    if( !title || !content || !openDate){
        return res.status(400).json({
            message: "title, content, openDate is mendatory"
        }); //셋 중에 하나라도 없으면 400 에러 반환하고 함수 종료 
    }
    try{
        const capsule = await Capsule.create({ //몽고디비에 저장하고 저장된 데이터를 201(생성됨)과 함께 반환
            userId: req.user.id , //이건 middleware 생성했을 떄 생김
            title,
            content,
            openDate: new Date(openDate),
            isOpened: false,
        });

        res.status(201).json(capsule);

    }catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
});

router.get("/", requireAuth, async(req, res)=> {
    const {filter, sort, search}=req.query;
    const query = { userId: req.user.id }; //내 캡슐만
    try{
        if(filter === "opened") query.isOpened = true;
        if(filter === "locked") query.isOpened = false;
        if(search) query.title = { $regex: search, $options: "i" }; //대소문자 무시 제목 검색
        await Capsule.updateMany( //날짜 지나면 자동으로 열리게 
            { userId: req.user.id, isOpened: false, openDate: { $lte: new Date() } },
            { $set: { isOpened: true } }
        );
        const capsules = await Capsule.find(query).sort({ openDate: sort === "asc" ? 1 : -1 }); //정렬
        res.status(200).json(capsules);

    }catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
})

router.get("/:id", requireAuth, async(req, res) => {
    try {
        const {id} = req.params;
        const capsule = await Capsule.findById(id);
        
        if(!capsule) return res.status(404).json({ message: "캡슐을 찾을 수 없습니다." });
        
        res.json(capsule);
    } catch(error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
});

router.put("/:id", requireAuth, async(req, res) => {
    try {
        const { id } = req.params;
        const capsule = await Capsule.findById(id);

        if(!capsule) return res.status(404).json({ message: "캡슐을 찾을 수 없습니다." });
        if(capsule.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "권한이 없습니다." });
        }
        if(!capsule.isOpened) {
            return res.status(400).json({ message: "열린 캡슐만 수정할 수 있습니다." });
        }

        const updated = await Capsule.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch(error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
});

router.delete("/:id", requireAuth, async(req, res)=>{
    try{
        const {id} = req.params;
        const capsule = await Capsule.findByIdAndDelete(id);
        res.status(200).json({ message: "캡슐이 삭제되었습니다." })
    }catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
})

export default router;