import AddMyList from "../components/icons/AddMyList";
import Like from "../components/icons/Like";
import More from "../components/icons/More";
import Play from "../components/icons/Play";
import Button from "../components/shared/Button";
import Container from "../components/shared/Container";
import { allGenres } from '../utils/genres';
import CheckMark from "../components/icons/CheckMark";
import { IMovie } from "../dto/IMovie";
import { moviesApiSlice, useAddToMyListMutation, useRemoveFromMyListMutation } from "../store/slices/moviesApiSlice";
import { useAppDispatch } from "../store/store";
import { useOptimistic, useTransition } from "react";

type MoviePopupFooterProps = {
    className?: string;
    movie: IMovie;
    movieGenres: number[];
    isInMyList?: boolean;
    onOptimisticRemove?: (id: number) => void;
}

const MoviePopupFooter = ({ movieGenres, className = '', movie, isInMyList = false, onOptimisticRemove }: MoviePopupFooterProps) => {

    const [addToMyList] = useAddToMyListMutation();
    const [removeFromMyList] = useRemoveFromMyListMutation();
    const dispatch = useAppDispatch();

    const [isPending, startTransition] = useTransition();

    const [optimisticInList, setOptimisticInList] = useOptimistic(isInMyList);

    const handleToggleMyList = async () => {
        const newValue = !optimisticInList;

        setOptimisticInList(newValue);

        startTransition(async () => {
            try {
                if (newValue) {
                    await addToMyList(movie);
                    dispatch(
                        moviesApiSlice.util.updateQueryData("getMyList", undefined, (draft) => {
                            draft[movie.id] = movie;
                        })
                    );
                } else {
                    onOptimisticRemove?.(movie.id);

                    await removeFromMyList(movie);
                    dispatch(
                        moviesApiSlice.util.updateQueryData("getMyList", undefined, (draft) => {
                            delete draft[movie.id];
                        })
                    );
                }
            } catch (error) {
                console.error("Failed to update my list", error);
                setOptimisticInList(!newValue);
            }
        });
    };

    return (
        <Container className={`bg-[#1f1f1f] ${className}`}>
            <Container className="gap-2 items-center mt-1 mx-3 w-full">
                <Button className="hover:opacity-75 transition-opacity duration-200">
                    <Play />
                </Button>
                <Button className="hover:opacity-75 transition-opacity duration-200"
                    onClick={handleToggleMyList}
                    disabled={isPending}>
                    {optimisticInList ? <CheckMark /> : <AddMyList />}
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