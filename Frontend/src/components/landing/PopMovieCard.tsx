type PopMovieCardProps = {
    movieId: number;
    movieBannerUrl: string;
    index: number;
}

const PopMovieCard = ({ movieId, movieBannerUrl, index }: PopMovieCardProps) => {
    return (
        <div key={movieId}
            className="relative w-50 h-65 flex-shrink-0 bg-[rgba(255,255,255,0.1)] text-white flex items-center justify-center rounded-md transition ease-in-out hover:scale-105 duration-300">
            <img src={movieBannerUrl} alt='movieBanner'
                className="rounded-md transition ease-in-out hover:scale-105 duration-300" />
            <span className="absolute bottom-1 -left-4 -translate-y-1/2 text-7xl text-black font-bold [-webkit-text-stroke:2px_white]">{index + 1}</span>
        </div>
    )
}

export default PopMovieCard;