import { IGenre } from "../../dto/IGenre";
import AddMyList from "../icons/AddMyList";
import Like from "../icons/Like";
import More from "../icons/More";
import Play from "../icons/Play";
import Button from "./Button";
import Container from "./Container";
import Typography from "./Typography";

type MoviePopupFooterProps = {
    className?: string;
    genres: IGenre[] | undefined;
    movieGenres: number[];
}

const MoviePopupFooter = ({ movieGenres, genres, className = '' }: MoviePopupFooterProps) => {

    const genresDict = movieGenres.reduce((acc, genre) => {
        acc[genre] = genre;
        return acc;
    }, {} as Record<number, number>);

    const genresString = () => {
        const strings: { [key: number]: string } = {};
        for (const genre of genres!) {
            if (genresDict[genre.id]) {
                strings[genre.id] = genre.name;
            }
        }
        return strings;
    }
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
                <Button className="hover:opacity-75 transition-opacity duration-200 ml-auto mr-5">
                    <More />
                </Button>
            </Container>
            <Typography className="flex gap-1.5">{Object.entries(genresString())}</Typography>
        </Container>
    )
}

export default MoviePopupFooter;