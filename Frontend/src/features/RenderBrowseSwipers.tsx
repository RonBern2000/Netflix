import Container from "../components/shared/Container";
import H2 from "../components/shared/H2";
import { useGetAllMoviesQuery} from "../store/slices/moviesApiSlice";
import BrowseSwiperContainer from "./BrowseSwiperContainer";

const RenderBrowseSwipers = () => {

  const { data: allMoviesByGenre } = useGetAllMoviesQuery();

  return (
    <Container className="flex-col">
      {allMoviesByGenre
        ? Object.entries(allMoviesByGenre).map(([genre, movies]) => {
            return (
              <Container key={genre}>
                <H2>{genre}</H2>
                <BrowseSwiperContainer movies={movies} />
              </Container>
            );
          })
        : null}
    </Container>
  );
}

export default RenderBrowseSwipers;