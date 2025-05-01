import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import { IMovie } from "../../dto/IMovie";
import { getScrollPosition } from "../../utils/getScrollPosition";
import { scrollElement } from "../../utils/scrollElement";
import MoviePopup from "./MoviePopup";

//const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`); {/* Only for testing the swiper offline*/ }
{/* Neflix's behaivor: every section is 6 movies */ }

type SwiperProps = {
    movies: IMovie[] | undefined;
    myList: Record<number, IMovie>;
    paginationAmount: number;
}

const BrowseSwiper = ({ movies, myList, paginationAmount }: SwiperProps) => {
    const swiperRef = useRef<HTMLDivElement | null>(null);
    const [scrollPosition, setScrollPosition] = useState({
        atLeft: true,
        atRight: false
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperHeight, setSwiperHeight] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const updateButtonVisibility = (): void => {
        if (swiperRef.current) {
            setScrollPosition(getScrollPosition(swiperRef.current));
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

    useEffect(() => {
        const updateHeight = () => {
            if (swiperRef.current) {
                setSwiperHeight(swiperRef.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (swiperRef.current) {
            setIsScrolling(true);
            scrollElement(swiperRef.current, direction);
        }

        setActiveIndex((prevIndex) =>
            direction === "right"
                ? Math.min(prevIndex + 1, paginationAmount - 1)
                : Math.max(prevIndex - 1, 0)
        );

        setTimeout(() => {
            setIsScrolling(false);
        }, 800);
    };

    return (
        <Container className="flex-col relative w-19/20 mx-auto">
            <ul className="absolute flex gap-1 right-20 -top-[-70px]">
                {new Array(paginationAmount).fill(0).map((_, index) =>
                    <li className={`w-4 border-gray-500 ${activeIndex === index ? "border-b-2 border-white" : "border-gray-500 border-b-2"}`} key={index}></li>
                )}
            </ul>
            {!scrollPosition.atLeft ? (
                <Button
                    className="absolute flex items-center opacity-0 hover:opacity-100 justify-center left-0 top-1/2 -translate-y-1/2  max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-10 text-white p-2 hover:bg-[#1c1c1ca1] transition z-30"
                    onClick={() => scroll("left")}
                    style={{ height: swiperHeight }}
                    disabled={isScrolling}
                >
                    <img className="h-9" src="/ArrowRight.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center left-0 top-1/2 -translate-y-1/2  max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-10 bg-[#1c1c1ca1] text-white p-2 hover:bg-[#1c1c1ca1]z-30"
                    style={{ opacity: scrollPosition.atLeft ? 0 : 1, height: swiperHeight }}
                    onClick={() => scroll("left")}
                    type="button"
                    disabled={isScrolling}
                >
                    <img className="h-9" src="/ArrowRight.svg" />
                </Button>
            )}

            <div className="h-auto relative overflow-visible">
                <div ref={swiperRef}
                    className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-20 px-4 h-full">
                    {movies?.map((movie) => (
                        myList[movie.id] ? (
                            <MoviePopup key={movie.id} movie={movie} isInMyList={true} />
                        ) : (
                            <MoviePopup key={movie.id} movie={movie} isInMyList={false} />
                        )
                    ))}
                </div>
            </div>

            {!scrollPosition.atRight ? (
                <Button
                    className="absolute opacity-0 hover:opacity-100 flex items-center justify-center top-1/2 -translate-y-1/2 right-0 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-10  text-white p-2 hover:bg-[#1c1c1ca1] transition z-30"
                    onClick={() => scroll("right")}
                    style={{ height: swiperHeight }}
                    disabled={isScrolling}
                >
                    <img className="h-9" src="/ArrowLeft.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center right-0 top-1/2 -translate-y-1/2  max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-10 bg-[#1c1c1ca1] text-white p-2 hover:bg-[#1c1c1ca1] z-30"
                    style={{ opacity: scrollPosition.atRight ? 0 : 1, height: swiperHeight }}
                    onClick={() => scroll("right")}
                    disabled={isScrolling}
                >
                    <img className="h-9" src="/ArrowLeft.svg" />
                </Button>
            )}
        </Container>
    );
};

export default BrowseSwiper;


{/* <div className="h-50 "> offline testing without movies
                <div ref={swiperRef}
                    className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-4 px-4 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full">
                    {items?.map((_, index) => (
                        <div className="cursor-pointer w-13/84 h-full relative flex-shrink-0 bg-[rgb(250,249,249)] text-white flex items-center justify-center rounded-md transition ease-in-out hover:scale-105 duration-300" key={index} />
                    ))}
                </div>
            </div> */}