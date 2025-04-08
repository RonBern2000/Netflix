import { NextFunction, Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { UserController } from "../controllers/user-controller";
import { PaymentController , cancelSubscriptionController } from "../controllers/payment-controller";

const router: Router = Router();

const userController = container.get<UserController>(TOKENS.UserController);

router.get("/Subscribe", async(req: Request, res: Response, next: NextFunction) => { 
    PaymentController.Subscribe(req, res);
});

router.post("/cancelSubscription", async(req: Request, res: Response, next: NextFunction) => { 
    cancelSubscriptionController(req, res);
});

router.post("/payAndActivate",  async(req: Request, res: Response, next: NextFunction) => {
    console.log("route here");
    userController.pay(req, res, next);
});

export default router
