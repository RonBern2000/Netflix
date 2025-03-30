// import axios from "axios";
// // import { apiBaseUrl } from "../config/config";
// import { IMovie } from "../dto/IMovie";

// // const api = axios.create({
// //     baseURL: apiBaseUrl,
// //     timeout: 1000 * 60,
// //     withCredentials: true,
// // });

// export interface BaseApiResponse{
//     message: string;
// }

// export interface PopMoviesResponse extends BaseApiResponse {
//     popMovies: IMovie[];
// }

// export const loadPopMoviesRequest = async(): Promise<PopMoviesResponse> => {
//     const { data } = await axios.get("https://proxy:5000/movies/api/v1/movies/popular");
//     return data;
// }