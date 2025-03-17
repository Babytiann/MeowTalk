import express, { Request, Response } from "express";
import mysql from 'mysql2/promise';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

const router = express.Router();

dotenv.config({ path: '.env.development.local' });
const JWT_SECRET = process.env.JWT_SECRET as string

async function checkAuth(UserName: string, Password: string): Promise<boolean> {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        const [rows] = await conn.execute('SELECT password FROM accounts WHERE userName = ?', [UserName]);

        // 强制类型断言为 RowDataPacket[]，以便访问数组
        const row = (rows as mysql.RowDataPacket[])[0];

        if (!row) throw new Error('User not found');

        const isPasswordCorrect = await bcrypt.compare(Password, row.password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }

        return true; // 密码正确
    } catch (error: unknown) {
        console.error('Authentication error:', (error as Error).message);
        return false; // 身份验证失败
    } finally {
        await conn.end();
    }
}

function generateToken(userName: string): string {
    return jwt.sign({ userName }, JWT_SECRET, { expiresIn: "7d" });
}

router
    .get("/", async ( _ , res: Response ) => {
        res.send("Welcome to meow-talk Login API");
    })
    .post("/", async (req: Request, res: Response) => {
        const { userName, password } = req.body;

        const isAuthenticated = await checkAuth(userName, password);
        if (isAuthenticated) {
            const token = generateToken(userName);

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'none', //同源策略是否启用，以及如何启用
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 天有效期
            });

            res.cookie('userName', userName, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 天有效期
            });

            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid UserName or Password");
        }
    });

export default router;
