import BrowseSwiper from "../components/shared/BrowseSwiper";
import { IMovie } from "../dto/IMovie";
import { calcPaginationAmount } from "../utils/calculateSwiperPagination";

const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`);

type BrowseSwiperContainerProps = {
    genre: string;
}

const BrowseSwiperContainer = ({ genre }: BrowseSwiperContainerProps) => {
    console.log(genre);
    const movies: IMovie | undefined = undefined; //TODO: get movies from state based on the gives genre
    const paginationAmount = calcPaginationAmount(items);
    return (
        <BrowseSwiper movies={movies} paginationAmount={paginationAmount} />
    )
}

export default BrowseSwiperContainer;