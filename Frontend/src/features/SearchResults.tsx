import { useGetMyListQuery, useSearchMoviesQuery } from "../store/slices/moviesApiSlice";
import { useLocation } from "react-router-dom";
import { strings } from "../strings/strings";
import H2 from "../components/shared/H2";
import SearchDisplay from "../components/shared/SearchDisplay";

const SearchResults = () => {

    const { search } = useLocation();
    const { data, isLoading } = useSearchMoviesQuery(`/search${search}`);
    const { data: myList } = useGetMyListQuery();

    return (
        isLoading
            ? <H2 className="text-white z-1 ml-7.5">{strings.browse.loading}</H2>
            : <SearchDisplay myList={myList!} movies={data!} />
    )
}

export default SearchResults;