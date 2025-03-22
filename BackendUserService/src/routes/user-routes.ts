import { NextFunction, Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { UserController } from "../controllers/user-controller";

const router: Router = Router();

const userController = container.get<UserController>(TOKENS.UserController);

router.get("/hi", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from User-Router" });
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res, next);
});

export default router;