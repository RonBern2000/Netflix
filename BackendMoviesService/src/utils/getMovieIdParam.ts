import { BadRequestError } from "@netflix-utils/shared";
import { Request } from "express";

export const getMovieIdParam = (req: Request) => {
    const { movieId } = req.params;
    const parsedId = Number(movieId);
    if (isNaN(parsedId)) {
        throw new BadRequestError('Movie Id was not found in params');
    }
    return parsedId;
}