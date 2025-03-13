import express, { Request, Response } from "express";
import getCardHistory from "../ApiFunction/getCardHistory";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { userName } = req.cookies;

        const rows = await getCardHistory(userName);

        res.json(rows);
    }catch (error) {
        console.error("获取历史（侧边栏历史）记录失败:", error);
        res.status(500).json({ error: "服务器内部错误" });
    }
})

export default router;