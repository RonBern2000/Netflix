import { IMovie } from "../../dto/IMovie";
import Container from "../shared/Container";

type MovieBrowseProps = {
    movie: IMovie;
}

const MovieBrowse = ({movie}: MovieBrowseProps) => {
  return (
    <Container>{movie.id}</Container>
  )
}

export default MovieBrowse;