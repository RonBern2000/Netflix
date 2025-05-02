import ReactPlayer from "react-player/youtube";
import { IMovie } from "../../dto/IMovie";
import Container from "../shared/Container";

type PreviewProps = {
    movie: IMovie | undefined;
}

const Preview = ({ movie }: PreviewProps) => {
    return (
        <Container className="absolute bg-[url('/LandingPage.jpg')] bg-cover bg-center w-full h-175 overflow-hidden">
            <Container className="relative w-full h-full overflow-hidden">
                <Container className="transform scale-x-[1.55] scale-y-[1.35] w-full h-full">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${movie?.key}`}
                        playing={true}
                        loop={true}
                        controls={false}
                        volume={0}
                        muted={true}
                        height={'100%'}
                        width={'100%'}
                        style={{ objectFit: 'contain' }}
                    />
                </Container>
            </Container>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#1c1c1c] pointer-events-none" />
        </Container>
    )
}

export default Preview;