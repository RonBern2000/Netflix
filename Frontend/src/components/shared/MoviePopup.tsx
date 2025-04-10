import { useState } from "react";
import { IMovie } from "../../dto/IMovie";
import Container from "./Container";
import MoviePopupFooter from "./MoviePopupFooter";
import ReactPlayer from 'react-player';
import { IGenre } from "../../dto/IGenre";

type MoviePopupProps = {
  movie: IMovie;
  className?: string;
  genres: IGenre[] | undefined;
}

// TODO: When I do the more complex pagination amount => we should not relay on 6 each page 
const MoviePopup = ({ genres, movie, className = '' }: MoviePopupProps) => {
  const [transitionEnded, setTransitionEnded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransitionEnded(false)
  }
  const handleTransitionEnd = () => {
    if (isHovered) {
      setTransitionEnded(true)
    }
  }

  return (
    <div
      className={`${className} shadow-md rounded-md transition-transform duration-500 ease-in-out transform ${isHovered ? "scale-x-150 scale-y-200 z-50" : "scale-100 z-10"} cursor-pointer w-13/84 h-full flex-shrink-0 text-white flex items-center justify-center overflow-hidden`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTransitionEnd={handleTransitionEnd}>
      {!transitionEnded ? (
        <img src={movie.backdrop_path} alt='movieBanner' className="object-contain rounded-md" />
      ) : (
        <Container className="flex-col trailerPop rounded-md h-full w-full absolute overflow-visible">
          <div className="w-full h-6/10 bg-[#1f1f1f]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movie.key}`}
              playing={true}
              loop={true}
              controls={false}
              volume={0}
              muted={true}
              height={'100%'}
              width={'100%'}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <MoviePopupFooter genres={genres} movieGenres={movie.genre_ids} className="w-full h-4/10 -mt-1 flex-col" />
        </Container>
      )}
    </div>
  )
}

export default MoviePopup;