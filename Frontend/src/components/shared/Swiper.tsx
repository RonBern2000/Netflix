import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import { IMovie } from "../../dto/IMovie";
import PopMovieCard from "../landing/PopMovieCard";

type SwiperProps = {
    movies: IMovie[] | undefined;
};

const Swiper = ({ movies }: SwiperProps) => {
    const swiperRef = useRef<HTMLDivElement | null>(null);
    const [scrollPosition, setScrollPosition] = useState({
        atLeft: true,
        atRight: false,
    });

    const updateButtonVisibility = (): void => {
        if (swiperRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = swiperRef.current;
            setScrollPosition({
                atLeft: scrollLeft === 0,
                atRight: scrollLeft + clientWidth >= scrollWidth,
            });
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
            const scrollAmount = swiperRef.current.offsetWidth;
            swiperRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <Container className="flex-col relative w-full mx-auto">
            <Button
                className="transition-opacity duration-300 absolute flex items-center justify-center -left-8 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 z-2"
                style={{ opacity: scrollPosition.atLeft ? 0 : 1, pointerEvents: scrollPosition.atLeft ? "none" : "auto" }}
                onClick={() => scroll("left")}
                type="button"
            >
                ◀
            </Button>

            <div
                ref={swiperRef}
                className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-4 px-4"
            >
                {movies?.map((movie, index) => (
                    <PopMovieCard key={movie.id} movieId={movie.id} movieBannerUrl={movie.poster_path} index={index} />
                ))}
            </div>

            <Button
                className="transition-opacity duration-300 absolute flex items-center justify-center -right-8 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 z-2"
                style={{ opacity: scrollPosition.atRight ? 0 : 1, pointerEvents: scrollPosition.atRight ? "none" : "auto" }}
                onClick={() => scroll("right")}
                type="button"
            >
                ▶
            </Button>
        </Container>
    );
};

export default Swiper;
