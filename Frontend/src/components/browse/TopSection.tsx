import { moviesApiSlice } from "../../store/slices/moviesApiSlice";
import { RootState } from "../../store/store";
import Container from "../shared/Container";
import Header from "../shared/Header";
import Preview from "./Preview";
import { useSelector } from "react-redux";

const TopSection = () => {
    const selectAllMoviesResult = moviesApiSlice.endpoints.getAllMovies.select()(
        useSelector((state: RootState) => state)
    );

    const data = selectAllMoviesResult?.data;
    const firstMovie = data ? data[Object.keys(data)[0]]?.[0] : undefined;

    return (
        <Container className="flex-col relative">
            <Header className="px-5" />
            <Preview movie={firstMovie} />
        </Container>
    )
}

export default TopSection;