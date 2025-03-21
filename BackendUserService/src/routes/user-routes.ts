import { Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { UserController } from "../controllers/user-controller";

const router: Router = Router();

const userController = container.get<UserController>(TOKENS.UserController);

router.get("/hi", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from User-Router" });
});

router.post("/login", (req: Request, res: Response) => {
    userController.login(req, res);
});

export default router;