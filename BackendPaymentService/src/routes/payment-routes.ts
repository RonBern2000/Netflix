import { NextFunction, Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { UserController } from "../controllers/user-controller";

const router: Router = Router();

const userController = container.get<UserController>(TOKENS.UserController);

router.post("/payAndActivate",  async(req: Request, res: Response, next: NextFunction) => {
    console.log("route here");
    userController.pay(req, res, next);
});

export default router
