import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fetchMeowTalk from "../ApiFunction/fetchMeowTalk";
import addHistoryText from "../ApiFunction/addHistoryText";

dotenv.config({ path: '.env.development.local' });

const router = express.Router();

// 处理前端请求
router
    .get('/',async (req: Request, res: Response) => {
        try{
            const { message, sessionId } = req.query; // 获取前端传来的 message

            await addHistoryText(message as string, "user", sessionId as string, req.cookies.userName);

            const fullText = await fetchMeowTalk(message as string, res);

            await addHistoryText( fullText, "ai", sessionId as string, req.cookies.userName);
        }catch (error) {
            res.status(500).json({ error: "Failed to fetch AI response" });
        }
    })
    .post("/", async (req: Request, res: Response)=> {
       try{
           const { message, sessionId } = req.body; // 获取前端传来的 message

           const fullText = await fetchMeowTalk(message, res);

           await addHistoryText(message, "user", sessionId, req.cookies.userName);
           await addHistoryText( fullText, "ai", sessionId, req.cookies.userName);
       }catch (error) {
           res.status(500).json({ error: "Failed to fetch AI response" });
       }
    });

export default router;
