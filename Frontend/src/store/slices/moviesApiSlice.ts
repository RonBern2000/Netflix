import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IMovie } from '../../dto/IMovie';

export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: (builder) => {
        return {
            getPopMovies: builder.query<IMovie[],void>({
                query: () => "/movies/api/v1/movies/popular",
                transformResponse: (response: { popularMovies: IMovie[] }) => response.popularMovies,
            }),
        };
    }
});

export const { useGetPopMoviesQuery } = moviesApiSlice;