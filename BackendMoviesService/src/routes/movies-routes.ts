import { NextFunction, Request, Response, Router } from "express";
import { container } from "../config/inversify";
import { TOKENS } from "../tokens";
import { MoviesController } from "../controllers/movies-controller";

const router: Router = Router();

const moviesController = container.get<MoviesController>(TOKENS.MoviesController);

router.get("/popular", async(req: Request, res: Response, next: NextFunction) => {
    moviesController.getPopularMovies(req, res, next);
});

router.get("/allMoviesByGenres", async(req: Request, res: Response, next: NextFunction) => {
    moviesController.getAllMoviesByGenres(req, res, next);
});

router.get("/getGenres", async(req: Request, res: Response, next: NextFunction) => {
    moviesController.getGenres(req, res, next);
});

router.get("/search", async(req: Request, res: Response, next: NextFunction) => {
    moviesController.searchMoviesByTitle(req, res, next);
});

export default router;