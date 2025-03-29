
import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { popMoviesQuery } from '../queries/PopMoviesQuery';
import { loadPopMovies } from '../store/slices/moviesSlice';

const GetpopularMovies = () => {

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       console.log('here');
  //       const response = await axios.get("http://localhost:5000/movies/api/v1/movies/popular");
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchMovies();
  // }, []);

  const dispatch = useAppDispatch();

  const { data } = useQuery({
    ...popMoviesQuery()
  });

  useEffect(() => {
    if (data) {
      dispatch(loadPopMovies(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    return () => { }
  })

  return null;
}

export default GetpopularMovies;