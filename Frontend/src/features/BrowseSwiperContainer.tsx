import BrowseSwiper from "../components/shared/BrowseSwiper";
import { IMovie } from "../dto/IMovie";
import { calcPaginationAmount } from "../utils/calculateSwiperPagination";

// const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`); // only for ofline testing

type BrowseSwiperContainerProps = {
    movies: IMovie[];
}

const BrowseSwiperContainer = ({ movies }: BrowseSwiperContainerProps) => {
    const paginationAmount = calcPaginationAmount(movies); //TODO: More complex based on screen width
    return (
        <BrowseSwiper movies={movies} paginationAmount={paginationAmount} />
    )
}

export default BrowseSwiperContainer;