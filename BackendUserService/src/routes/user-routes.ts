import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/hi", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from User-Router" });
});

export default router;