import { IMovie } from "../../dto/IMovie";
import Container from "../shared/Container";

type PreviewProps = {
    movie: IMovie | undefined;
}

const Preview = ({ movie }: PreviewProps) => {
    return (
        <Container className="bg-[url('/LandingPage.jpg')] bg-cover bg-center w-full h-100">{/* TODO: temporary */}
            {movie?.title}
        </Container>
    )
}

export default Preview;