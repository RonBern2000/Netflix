import BrowseSwiper from "../components/shared/BrowseSwiper";
import { IGenre } from "../dto/IGenre";
import { IMovie } from "../dto/IMovie";
import { calcPaginationAmount } from "../utils/calculateSwiperPagination";

// const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`); // only for ofline testing

type BrowseSwiperContainerProps = {
    movies: IMovie[];
    genres: IGenre[] | undefined;
}

const BrowseSwiperContainer = ({ genres, movies }: BrowseSwiperContainerProps) => {
    const paginationAmount = calcPaginationAmount(movies); //TODO: More complex based on screen width
    return (
        <BrowseSwiper genres={genres} movies={movies} paginationAmount={paginationAmount} />
    )
}

export default BrowseSwiperContainer;