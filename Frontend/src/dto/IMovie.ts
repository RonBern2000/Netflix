export interface IMovie{
  genre_ids: number[];
  id: number;
  key: string | null;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}