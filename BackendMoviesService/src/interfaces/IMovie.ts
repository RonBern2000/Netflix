export interface IMovie{
  genre_ids: number[];            // Array of integers
  id: number;                     // Defaults to 0
  overview: string;
  popularity: number;             // Defaults to 0
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;           // Defaults to 0
  vote_count: number;             // Defaults to 0
}