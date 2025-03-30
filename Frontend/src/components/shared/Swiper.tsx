import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import { IMovie } from "../../dto/IMovie";
import PopMovieCard from "../landing/PopMovieCard";

// const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`); Only for testing the swiper offline

type SwiperProps = {
    movies: IMovie[] | undefined;
}

const Swiper = ({ movies }: SwiperProps) => {
    console.log(movies);
    const swiperRef = useRef<HTMLDivElement | null>(null);
    const [atLeft, setAtLeft] = useState(true);
    const [atRight, setAtRight] = useState(false);

    const updateButtonVisibility = (): void => {
        if (swiperRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = swiperRef.current;
            setAtLeft(scrollLeft === 0);
            setAtRight(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    useEffect(() => {
        updateButtonVisibility();

        const handleScroll = () => {
            updateButtonVisibility();
        };

        const swiper = swiperRef.current;
        swiper?.addEventListener("scroll", handleScroll);

        return () => {
            swiper?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (swiperRef.current) {
            const scrollAmount = swiperRef.current.offsetWidth - 550;
            swiperRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <Container className="flex-col relative w-full mx-auto">
            {!atLeft ? (
                <Button
                    className="absolute flex items-center justify-center -left-8 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition z-2"
                    onClick={() => scroll("left")}
                >
                    ◀
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center -left-8 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 z-2"
                    style={{ opacity: atLeft ? 0 : 1 }}
                    onClick={() => scroll("left")}
                    type="button"
                >
                    ◀
                </Button>
            )}

            <div ref={swiperRef}
                className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-4 px-4">
                {movies?.map((movie, index) => (
                    <PopMovieCard movieId={movie.id} movieBannerUrl={movie.poster_path} index={index} />
                ))}
            </div>

            {!atRight ? (
                <Button
                    className="absolute flex items-center justify-center -right-8 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition z-2"
                    onClick={() => scroll("right")}
                >
                    ▶
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center -right-8 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 z-2"
                    style={{ opacity: atRight ? 0 : 1 }}
                    onClick={() => scroll("right")}
                >
                    ▶
                </Button>
            )}
        </Container>
    );
};

export default Swiper;
