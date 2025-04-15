import { createApi } from '@reduxjs/toolkit/query/react';
import { IMovie } from '../../dto/IMovie';
import { IGenre } from '../../dto/IGenre';
import { baseQueryWithReauth } from '../apis';

export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: baseQueryWithReauth,
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
            getMyList: builder.query<Record<number, IMovie>, void>({
                query: () => "/users/api/v1/usersLike/getMyList",
                transformResponse: (response: { myList: Record<string, IMovie> }) => response.myList,
            }),
            addToMyList: builder.mutation<Record<number, IMovie>, IMovie>({
                query: (movie) => ({
                    url: "/users/api/v1/usersLike/add",
                    method: "POST",
                    body: movie,
                }),
            }),
            removeFromMyList: builder.mutation<Record<number, IMovie>, IMovie>({
                query: (movie) => ({
                    url: "/users/api/v1/usersLike/remove",
                    method: "POST",
                    body: movie,
                }),
            }),
    })
});

export const { useGetPopMoviesQuery, useGetAllMoviesQuery, useGetGenresQuery, useGetMyListQuery, useAddToMyListMutation, useRemoveFromMyListMutation} = moviesApiSlice;