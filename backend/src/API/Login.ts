import express, { Request, Response } from "express";
import initDatabase from "../Services/initDatabase";
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const router = express.Router();

initDatabase("accounts").catch(error => console.error("function 'initDatabase' error", error));

async function checkAuth(UserId: string, Password: string): Promise<boolean> {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        const [rows] = await conn.execute('SELECT password FROM accounts WHERE userName = ?', [UserId]);

        // 强制类型断言为 RowDataPacket[]，以便访问数组
        const row = (rows as mysql.RowDataPacket[])[0];

        if (!row) {
            // 用户不存在
            throw new Error('User not found');
        }

        const hashedPassword = row.password;

        const isPasswordCorrect = await bcrypt.compare(Password, hashedPassword);
        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }

        return true; // 密码正确
    } catch (error: unknown) {
        // 类型断言 error 为 Error 类型
        if (error instanceof Error) {
            console.error('Authentication error:', error.message);
        } else {
            console.error('Unknown error during authentication');
        }
        return false; // 身份验证失败
    } finally {
        await conn.end();
    }
}

router
    .get("/", async ( _ , res: Response ) => {
        res.send("Welcome to meow-talk Login API");
    })
    .post("/", async (req: Request, res: Response) => {
        console.log(req.body);
        const { userName, password } = req.body;
        console.log( userName, password);

        const isAuthenticated = await checkAuth(userName, password);
        if (isAuthenticated) {
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid UserId or Password");
        }
    });

export default router;
