import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IMovie } from '../../dto/IMovie';

export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: (builder) => ({
        
            getPopMovies: builder.query<IMovie[], void>({
                query: () => "/movies/api/v1/movies/popular",
                transformResponse: (response: { popularMovies: IMovie[] }) => response.popularMovies,
            }),
            getAllMovies: builder.query<Record<string,IMovie[]>, void>({
                query: () => "/movies/api/v1/movies/allMoviesByGenres",
                transformResponse: (response: { allMoviesByGenre: Record<string,IMovie[]> }) => response.allMoviesByGenre,
            }),
        
    })
});

export const { useGetPopMoviesQuery, useGetAllMoviesQuery} = moviesApiSlice;