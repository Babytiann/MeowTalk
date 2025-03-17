import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development.local" });

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function AuthMiddle(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided in middleWare" })
    }

    try {
        (req as any).user = jwt.verify(token, JWT_SECRET);
        next();
    }catch (err: any) {
        res.status(401).json({ message: err });
    }
}