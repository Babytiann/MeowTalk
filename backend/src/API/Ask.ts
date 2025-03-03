import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: '.env.development.local' });

const router = express.Router();

// 异步请求封装
const fetchMeowTalk = async (message: string) => {

    try {
        const response = await axios.post("https://meow-talk.herokuapp.com/",
            {
                "max_tokens": 4096,
                "top_k": 4,
                "temperature": 0.5,
                "messages": [
                    {
                        "role": "system",
                        "content": "你是一个无所不知的人"
                    },
                    {
                        "role": "user",
                        "content": message,
                    }
                ],
                "model": "4.0Ultra"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${process.env.SERVER_CLIENT_ID}`,
                },
            }
        );
        console.log("LLM Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching MeowTalk API:", error);
        return null;
    }
};

// 处理前端请求
router
    .get('/', (_, res) => {
        res.send('Welcome to Meow Backend !');
    })
    .post("/", async (req: Request, res: Response)=> {
       try{
           const { message } = req.body; // 获取前端传来的 message

           const data = await fetchMeowTalk(message);
           res.json(data);
       }catch (error) {
           res.status(500).json({ error: "Failed to fetch AI response" });
       }
    });

export default router;
