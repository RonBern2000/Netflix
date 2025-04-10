import AddMyList from "../icons/AddMyList";
import Like from "../icons/Like";
import More from "../icons/More";
import Play from "../icons/Play";
import Button from "./Button";
import Container from "./Container";
import { allGenres } from '../../utils/genres';

type MoviePopupFooterProps = {
    className?: string;
    movieGenres: number[];
}

const MoviePopupFooter = ({ movieGenres, className = '' }: MoviePopupFooterProps) => {
    return (
        <Container className={`bg-[#1f1f1f] ${className}`}>
            <Container className="gap-2 items-center mt-1 mx-3 w-full">
                <Button className="hover:opacity-75 transition-opacity duration-200">
                    <Play />
                </Button>
                <Button className="hover:opacity-75 transition-opacity duration-200">
                    <AddMyList />
                </Button>
                <Button className="hover:opacity-75 transition-opacity duration-200">
                    <Like />
                </Button>
                <Button className="hover:opacity-75 transition-opacity duration-200 ml-auto mr-6">
                    <More />
                </Button>
            </Container>
            <Container className="flex pt-2 ml-3">
                <ul className="flex gap-5">
                    {movieGenres.map((genreId, index) => {
                        return (
                            <li
                                className={`text-[7px] ${index !== 0 ? 'list-disc text-white' : ''}`}
                                key={genreId}
                            >
                                {allGenres[genreId]}
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </Container>
    );
};

export default MoviePopupFooter;