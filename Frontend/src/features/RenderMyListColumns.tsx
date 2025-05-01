import ColumnsDisplay from "../components/shared/ColumnsDisplay";
import H2 from "../components/shared/H2";
import { useGetMyListQuery } from "../store/slices/moviesApiSlice";
import { strings } from "../strings/strings";

const RenderMyListColumns = () => {

    const { data: myList, isLoading: isLoadingMyList } = useGetMyListQuery();

    return (
        isLoadingMyList
            ? <H2 className="text-white z-1 ml-7.5">{strings.browse.loading}</H2>
            : <ColumnsDisplay movies={myList!} />
    );
}

export default RenderMyListColumns;