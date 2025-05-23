import { NextFunction, Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { UserController } from "../controllers/user-controller";

const router: Router = Router();

const userController = container.get<UserController>(TOKENS.UserController);

router.get('/checkStatus', (req: Request, res: Response, next: NextFunction) => {
    userController.checkStatus(req, res, next);
});

router.get('/refresh', (req: Request, res: Response, next: NextFunction) => {
    userController.refresh(req, res, next);
});

router.post("/checkEmail", (req: Request, res: Response, next: NextFunction) => {
    userController.checkEmailExist(req, res, next);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res, next);
});

router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
    userController.signup(req, res, next);
});

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
    userController.logout(req, res, next);
});

export default router;