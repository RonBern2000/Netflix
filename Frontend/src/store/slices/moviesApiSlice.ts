import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IMovie } from '../../dto/IMovie';
import { IGenre } from '../../dto/IGenre';

export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    endpoints: (builder) => ({
            getPopMovies: builder.query<IMovie[], void>({
                query: () => "/movies/api/v1/movies/popular",
                transformResponse: (response: { popularMovies: IMovie[] }) => response.popularMovies,
            }),
            getAllMovies: builder.query<Record<string,IMovie[]>, void>({
                query: () => "/movies/api/v1/movies/allMoviesByGenres",
                transformResponse: (response: { allMoviesByGenres: Record<string, IMovie[]> }) => response.allMoviesByGenres,
            }),
            getGenres: builder.query<IGenre[], void>({
                query: () => "/movies/api/v1/movies/getGenres",
                transformResponse: (response: { genres: IGenre[] }) => response.genres,
            }),
            addToMyList: builder.mutation<number[], number>({
                query: (movieId) => ({
                    url: "/users/api/v1/usersLike/add",
                    method: "POST",
                    body: movieId,
                }),
            }),
            removeFromMyList: builder.mutation<number[], number>({
                query: (movieId) => ({
                    url: "/users/api/v1/usersLike/remove",
                    method: "POST",
                    body: movieId,
                }),
            }),
    })
});

export const { useGetPopMoviesQuery, useGetAllMoviesQuery, useGetGenresQuery, useAddToMyListMutation, useRemoveFromMyListMutation} = moviesApiSlice;