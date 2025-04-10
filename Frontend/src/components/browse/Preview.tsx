import { IMovie } from "../../dto/IMovie";
import Container from "../shared/Container";

type PreviewProps = {
    movie: IMovie | undefined;
}

const Preview = ({ movie }: PreviewProps) => {
    return (
        <Container className="absolute bg-[url('/LandingPage.jpg')] bg-cover bg-center w-full h-100">{/* TODO: temporary hieght */}
            {movie?.title}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#1c1c1c] pointer-events-none" />
        </Container>
    )
}

export default Preview;