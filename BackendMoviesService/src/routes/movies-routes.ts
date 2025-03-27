import { NextFunction, Request, Response, Router } from "express";
import { apifetch } from "../utils/api";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { MoviesController } from "../controllers/movies-controller";

const router: Router = Router();

const moviesController = container.get<MoviesController>(TOKENS.MoviesController);

router.get("/moviedb", async(req: Request, res: Response) => {
    const response = apifetch('');
    res.status(200).json({response});
});

export default router;