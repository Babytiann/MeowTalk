import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: '.env.development.local' });

const router = express.Router();

// 异步请求封装
const fetchMeowTalk = async (message: string, res: Response) => {

    try {
        const response = await axios.post("https://spark-api-open.xf-yun.com/v1/chat/completions/",
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
                "model": "4.0Ultra",
                "stream": true
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${process.env.SERVER_CLIENT_ID}`,
                },
                responseType: "stream", // 让 axios 以流式方式接收数据
            }
        );

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        let fullResponse = "";

        response.data.on("data", (chunk: Buffer) => {
            const dataStr = chunk.toString().trim();
            console.log(dataStr);

            if (!dataStr.startsWith('data: [DONE]')){
                try {
                    const jsonData = JSON.parse(dataStr.replace(/^data:/, "").trim());
                    const textChunk = jsonData?.choices?.[0]?.delta?.content;
                    if (textChunk) {
                        fullResponse += textChunk;
                        res.write(textChunk); // 逐步将数据返回给前端
                    }
                } catch (err) {
                    console.error("JSON 解析失败:", err);
                }
            }
        })

        response.data.on("end", () => {
            res.end(); // 结束流式返回
            console.log("完整响应内容:", fullResponse);
        })

        response.data.on("error", (err: any) => {
            console.error("流式请求出错:", err);
            res.status(500).end();
        });
    } catch (error) {
        console.error("Error fetching MeowTalk API:", error);
        res.status(500).json({ error: "Failed to fetch AI response" });
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

           await fetchMeowTalk(message, res);

       }catch (error) {
           res.status(500).json({ error: "Failed to fetch AI response" });
       }
    });

export default router;
