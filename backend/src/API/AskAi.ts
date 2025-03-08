import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fetchMeowTalk from "../ApiFunction/fetchMeowTalk";

dotenv.config({ path: '.env.development.local' });

const router = express.Router();

// 处理前端请求
router
    .get('/', (_, res) => {
        res.send('Welcome to Meow Backend !');
    })
    .post("/", async (req: Request, res: Response)=> {
       try{
           const { message, uuid } = req.body; // 获取前端传来的 message
           console.log(uuid)
           await fetchMeowTalk(message, res);

           console.log(req.cookies)
       }catch (error) {
           res.status(500).json({ error: "Failed to fetch AI response" });
       }
    });

export default router;
