import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import { IMovie } from "../../dto/IMovie";
import { getScrollPosition } from "../../utils/getScrollPosition";
import { scrollElement } from "../../utils/scrollElement";

//const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`); {/* Only for testing the swiper offline*/ }
{/* Neflix's behaivor: every section is 6 movies */ }

type SwiperProps = {
    movies: IMovie[] | undefined;
    paginationAmount: number
}

const BrowseSwiper = ({ movies, paginationAmount }: SwiperProps) => {
    const swiperRef = useRef<HTMLDivElement | null>(null);
    const [scrollPosition, setScrollPosition] = useState({
        atLeft: true,
        atRight: false
    });
    const [activeIndex, setActiveIndex] = useState(0);

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

    const scroll = (direction: "left" | "right") => {
        if (swiperRef.current) {
            scrollElement(swiperRef.current, direction);
        }

        setActiveIndex((prevIndex) =>
            direction === "right"
                ? Math.min(prevIndex + 1, paginationAmount - 1)
                : Math.max(prevIndex - 1, 0)
        );
    };

    return (
        <Container className="flex-col relative w-19/20 mx-auto">
            <ul className="absolute flex gap-1 right-20 -top-[-6px]">
                {new Array(paginationAmount).fill(0).map((_, index) =>
                    <li className={`w-4 border-gray-500 ${activeIndex === index ? "border-b-2 border-white" : "border-gray-500 border-b-2"}`} key={index}></li>
                )}
            </ul>
            {!scrollPosition.atLeft ? (
                <Button
                    className="absolute flex items-center opacity-0 hover:opacity-100 justify-center left-0  max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8 text-white p-2 hover:bg-[#1f1f1fa1] transition z-2"
                    onClick={() => scroll("left")}
                >
                    <img className="h-9" src="/ArrowRight.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center left-0 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8 bg-[#1f1f1fa1] text-white p-2 hover:bg-[#1f1f1fa1]z-2"
                    style={{ opacity: scrollPosition.atLeft ? 0 : 1 }}
                    onClick={() => scroll("left")}
                    type="button"
                >
                    <img className="h-9" src="/ArrowRight.svg" />
                </Button>
            )}

            {/* <div className="h-50 "> offline testing without movies
                <div ref={swiperRef}
                    className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-4 px-4 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full">
                    {items?.map((_, index) => (
                        <div className="cursor-pointer w-13/84 h-full relative flex-shrink-0 bg-[rgb(250,249,249)] text-white flex items-center justify-center rounded-md transition ease-in-out hover:scale-105 duration-300" key={index} />
                    ))}
                </div>
            </div> */}

            <div className="h-50 ">
                <div ref={swiperRef}
                    className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-4 px-4 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full">
                    {movies?.map((_, index) => (
                        <div className="cursor-pointer w-13/84 h-full relative flex-shrink-0 bg-[rgb(250,249,249)] text-white flex items-center justify-center rounded-md transition ease-in-out hover:scale-105 duration-300" key={index} />
                    ))}
                </div>
            </div>

            {!scrollPosition.atRight ? (
                <Button
                    className="absolute opacity-0 hover:opacity-100 flex items-center justify-center right-0 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8  text-white p-2 hover:bg-[#1f1f1fa1] transition z-2"
                    onClick={() => scroll("right")}
                >
                    <img className="h-9" src="/ArrowLeft.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center right-0 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8 bg-[#1f1f1fa1] text-white p-2 hover:bg-[#1f1f1fa1] z-2"
                    style={{ opacity: scrollPosition.atRight ? 0 : 1 }}
                    onClick={() => scroll("right")}
                >
                    <img className="h-9" src="/ArrowLeft.svg" />
                </Button>
            )}
        </Container>
    );
};

export default BrowseSwiper;
