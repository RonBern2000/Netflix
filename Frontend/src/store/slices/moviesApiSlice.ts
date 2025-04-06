import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IMovie } from '../../dto/IMovie';

export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: (builder) => {
        return {
            getPopMovies: builder.query<IMovie[], void>({
                query: () => "/movies/api/v1/movies/popular",
                transformResponse: (response: { popularMovies: IMovie[] }) => response.popularMovies,
            }),
            getAllMovies: builder.query<IMovie[], void>({
                query: () => "/movies/api/v1/movies/allMovies",
                transformResponse: (response: { allMovies: IMovie[] }) => response.allMovies,
            }),
            getMovieTrailer: builder.query<string, number>({
                query: (movieId) => `/movies/api/v1/movies/movieTrailer/${movieId}`,
                transformResponse: (response: { key: string }) => response.key,
            }),
        };
    }
});

export const { useGetPopMoviesQuery, useGetAllMoviesQuery, useGetMovieTrailerQuery} = moviesApiSlice;