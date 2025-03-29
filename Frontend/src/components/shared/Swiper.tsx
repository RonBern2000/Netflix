import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
// import { useAppSelector } from "../../store/store";
// import { IMovie } from "../../dto/IMovie";

// const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`); Only for testing the swiper offline

const Swiper = () => {
    const swiperRef = useRef<HTMLDivElement | null>(null);
    const [atLeft, setAtLeft] = useState(true);
    const [atRight, setAtRight] = useState(false);

    // const popMovies: IMovie[] = useAppSelector((state) => state.popMovies.popMovies);
    // console.log(popMovies);

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

            {/* <div ref={swiperRef}
                className="flex scrollbar-hide overflow-x-hidden scroll-smooth gap-3 py-4 px-4">
                {popMovies.map((movie) => (
                    <div key={movie.id}
                        className="w-50 h-65 flex-shrink-0 bg-[rgba(255,255,255,0.1)] text-white flex items-center justify-center rounded-md transition ease-in-out hover:scale-107 duration-300">
                        {movie.title}
                    </div>
                ))}
            </div> */}

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
