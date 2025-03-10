import express, { Request, Response } from "express";
import getHistory from "../ApiFunction/getHistory";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.query; // 获取 sessionId
        const { userName } = req.cookies; // 获取用户名

        if (!sessionId || typeof sessionId !== "string") {
            res.status(400).json({ error: "sessionId 参数缺失或格式错误" });
        }
        const rows = await getHistory(sessionId as string, userName);
        res.json(rows);
    } catch (error) {
        console.error("获取历史记录失败:", error);
        res.status(500).json({ error: "服务器内部错误" });
    }
});

export default router;
