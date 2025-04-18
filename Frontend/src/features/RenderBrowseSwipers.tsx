import Container from "../components/shared/Container";
import H2 from "../components/shared/H2";
import BrowseSwiperContainer from "./BrowseSwiperContainer";
import { useGetAllMoviesQuery, useGetMyListQuery } from "../store/slices/moviesApiSlice";
import { strings } from "../strings/strings";

const RenderBrowseSwipers = () => {

  const { data, isLoading } = useGetAllMoviesQuery();
  const { data: myList, isLoading: isLoadingMyList } = useGetMyListQuery();

  return (
    <Container className="flex-col bg-[#1c1c1c]">
      {(isLoading && isLoadingMyList) ? (
        <>
          <H2 className="text-white z-1 ml-7.5">{strings.browse.loading}</H2>
        </>
      ) : data ? (
        Object.entries(data).map(([genre, movies]) =>
          movies.length > 5 ? (
            <Container className="flex-col relative" key={genre}>
              <H2 className="text-white z-40 absolute top-[14%] left-[4%]">{genre}</H2>
              <BrowseSwiperContainer movies={movies} myList={myList!} />
            </Container>
          ) : null
        )
      ) : null}
    </Container>
  );
}

export default RenderBrowseSwipers;