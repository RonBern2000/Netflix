import axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { generateCustomError } from "../../../shared/middleware/error-handler";
import { config } from "dotenv";
import https from 'https'
import apifetch from "../utils/api";

config();
const router: Router = Router();

const API_READ_ACCESS_TOKEN:string = process.env.API_READ_ACCESS_TOKEN!;

router.get("/hi", (req: Request, res: Response) => {
    res.status(200).json({message: 'Movies says hi!'});
})

router.get("/moviedb", async(req: Request, res: Response, next: NextFunction) => {
    apifetch('', next);
    res.status(200).json({message: 'Movies says hi!'});
})

export default router;