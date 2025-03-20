import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/hi", (req: Request, res: Response) => {
    res.status(200).json({message: 'Movies says hi!'});
})

export default router;