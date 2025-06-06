import BrowseSwiper from "../components/shared/BrowseSwiper";
import { IMovie } from "../dto/IMovie";
import { calcPaginationAmount } from "../utils/calculateSwiperPagination";

// const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`); // only for ofline testing

type BrowseSwiperContainerProps = {
    movies: IMovie[];
    myList: Record<number, IMovie>;
}

const BrowseSwiperContainer = ({ movies, myList = {} }: BrowseSwiperContainerProps) => {

    const paginationAmount = calcPaginationAmount(movies, 6);
    return (
        <BrowseSwiper
            movies={movies}
            myList={myList}
            paginationAmount={paginationAmount} />
    )
}

export default BrowseSwiperContainer;