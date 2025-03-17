import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (_: Request, res: Response) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).send("Logout successful");
});

export default router;