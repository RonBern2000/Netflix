import { useGetPopMoviesQuery } from "../store/slices/moviesApiSlice";
import Swiper from "../components/shared/Swiper";

const PopSwiperContainer = () => {
    const { data: popularMovies, isLoading, isError } = useGetPopMoviesQuery();
    if (isLoading) return <p>Loading movies...</p>;
    if (isError) return <p>Failed to load movies.</p>;

    return <Swiper movies={popularMovies} />;
};

export default PopSwiperContainer;