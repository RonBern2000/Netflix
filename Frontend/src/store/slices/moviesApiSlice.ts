import { createApi } from '@reduxjs/toolkit/query/react';
import { IMovie } from '../../dto/IMovie';
import { IGenre } from '../../dto/IGenre';
import { baseQueryWithReauth } from '../apis';

export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
            getPopMovies: builder.query<IMovie[], void>({
                query: () => "/api/v1/movies/movies/popular",
                transformResponse: (response: { popularMovies: IMovie[] }) => response.popularMovies,
            }),
            getAllMovies: builder.query<Record<string,IMovie[]>, void>({
                query: () => "/api/v1/movies/movies/allMoviesByGenres",
                transformResponse: (response: { allMoviesByGenres: Record<string, IMovie[]> }) => response.allMoviesByGenres,
            }),
            getGenres: builder.query<IGenre[], void>({
                query: () => "/api/v1/movies/movies/getGenres",
                transformResponse: (response: { genres: IGenre[] }) => response.genres,
            }),
            getMyList: builder.query<Record<number, IMovie>, void>({
                query: () => "/api/v1/users/usersLike/getMyList",
                transformResponse: (response: { myList: Record<string, IMovie> }) => response.myList,
            }),
            addToMyList: builder.mutation<Record<number, IMovie>, IMovie>({
                query: (movie) => ({
                    url: "/api/v1/users/usersLike/add",
                    method: "POST",
                    body: movie,
                }),
            }),
            removeFromMyList: builder.mutation<Record<number, IMovie>, IMovie>({
                query: (movie) => ({
                    url: "/api/v1/users/usersLike/remove",
                    method: "POST",
                    body: movie,
                }),
            }),
            searchMovies: builder.query<Record<number, IMovie>, string>({
                query: (searchUrl) => `/api/v1/movies/movies${searchUrl}`,
                transformResponse: (response: { movies: Record<number, IMovie> }) => response.movies,
            }),
    })
});

export const { useSearchMoviesQuery, useGetPopMoviesQuery, useGetAllMoviesQuery, useGetGenresQuery, useGetMyListQuery, useAddToMyListMutation, useRemoveFromMyListMutation} = moviesApiSlice;