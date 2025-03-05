import express, { Request, Response } from "express";
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const router = express.Router();

async function addUser(request: Request, response: Response) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const { userName, password } = request.body;

    if (!userName || !password) {
        return response.status(400).json({ message: "userName and password are required" });
    }

    try {

        const [rows] = await conn.query("SELECT * FROM accounts WHERE userName = ?", [userName]) as Array<any>;

        // 如果找到了用户
        if (rows.length > 0) {
            return response.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 插入用户到数据库
        const [result] = await conn.execute(
            "INSERT INTO accounts (userName, password) VALUES (?, ?)",
            [userName, hashedPassword]
        );

        console.log("Registering account success: ", result);
    }catch (error) {
        console.error("Failed to create account in Register API", error);
    }finally {
        await conn.end();
    }
}

router
    .get('/', (_ , res: Response) => {
        res.status(200).send("Welcome to meow-talk Register API");
    })
    .post('/', async (req: Request, res: Response) => {
        console.log(req.body);
        await addUser(req, res);
    });

export default router