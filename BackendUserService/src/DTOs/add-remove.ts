
export interface AddRemoveRequest{
    userId: string;
    movieId: number;
    genre_ids: number[];
    key: string;
    overview: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
}