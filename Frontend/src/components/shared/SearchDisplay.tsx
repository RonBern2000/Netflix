import { IMovie } from "../../dto/IMovie"
import MoviePopup from "./MoviePopup";

type SearchDisplayProps = {
    movies: Record<number, IMovie>;
    myList: Record<number, IMovie>;
}

const SearchDisplay = ({ movies = {}, myList = {} }: SearchDisplayProps) => {

    //TODO: optimistic when a user removes a movie so he wont wait for api call

    return (
        <div className="h-auto relative overflow-visible">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 h-full">
                {Object.values(movies).map((movie) => (
                    <MoviePopup
                        key={movie.id}
                        movie={movie}
                        isInMyList={!!myList[movie.id]}
                        className="w-full min-h-[150px]"
                    />
                ))}
            </div>
        </div>
    )
}

export default SearchDisplay;