import { NextFunction, Request, Response, Router } from "express";
import { apifetch } from "../utils/api";

const router: Router = Router();

router.get("/moviedb", async(req: Request, res: Response) => {
    const response = apifetch('');
    res.status(200).json({response});
});

export default router;