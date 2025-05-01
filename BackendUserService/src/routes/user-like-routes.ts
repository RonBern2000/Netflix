import { Request, Router ,Response, NextFunction } from "express";
import { UserLikeController } from "../controllers/user-like-controller";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";

const router: Router = Router();

const userLikeController = container.get<UserLikeController>(TOKENS.UserLikeController);

router.get('/getMyList', (req: Request, res: Response, next: NextFunction) => {
    userLikeController.getMyList(req, res, next);
});

router.post('/add', (req: Request, res: Response, next: NextFunction) => {
    userLikeController.add(req, res, next);
});

router.post('/remove', (req: Request, res: Response, next: NextFunction) => {
    userLikeController.remove(req, res, next);
});

export default router;