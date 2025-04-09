import Container from "../components/shared/Container";
import H2 from "../components/shared/H2";
import BrowseSwiperContainer from "./BrowseSwiperContainer";
import { useGetAllMoviesQuery } from "../store/slices/moviesApiSlice";
import { strings } from "../strings/strings";

const RenderBrowseSwipers = () => {

  const { data, isLoading } = useGetAllMoviesQuery();

  return (
    <Container className="flex-col bg-[#1f1f1f]">
      {isLoading ? (
        <>
          <H2 className="text-white z-1 ml-7.5">{strings.browse.loading}</H2>
        </>
      ) : data ? (
        Object.entries(data).map(([genre, movies]) =>
          movies.length > 5 ? (
            <Container className="flex-col" key={genre}>
              <H2 className="text-white z-1 ml-7.5">{genre}</H2>
              <BrowseSwiperContainer movies={movies} />
            </Container>
          ) : null
        )
      ) : null}
    </Container>
  );
}

export default RenderBrowseSwipers;