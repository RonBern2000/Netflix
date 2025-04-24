import { NextFunction, Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { UserToMovieController } from "../controllers/user-to-movie-controller";

const router: Router = Router();

const userToMovieController = container.get<UserToMovieController>(TOKENS.UserToMovieController);

router.get("/getRecommendations", async(req: Request, res: Response, next: NextFunction) => {
    userToMovieController.getRecommendations(req, res, next);
});

export default router;