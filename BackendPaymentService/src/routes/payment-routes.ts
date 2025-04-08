import { NextFunction, Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { UserController } from "../controllers/user-controller";

const router: Router = Router();

const userController = container.get<UserController>(TOKENS.UserController);

router.get("/subscribe", async(req: Request, res: Response, next: NextFunction) => { 
    userController.subscribe(req, res, next);
});

router.post("/cancelSubscription", async(req: Request, res: Response, next: NextFunction) => { 
    userController.cancelSubscriptionController(req, res, next);
});

router.post("/payAndActivate",  async(req: Request, res: Response, next: NextFunction) => {
    userController.pay(req, res, next);
});

export default router
