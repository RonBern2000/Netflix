import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import { IMovie } from "../../dto/IMovie";

const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`); {/* Only for testing the swiper offline*/ }
{/* Neflix's behaivor: every section is 6 movies */ }

type SwiperProps = {
    movies: IMovie[] | undefined;
}

const BrowseSwiper = ({ movies }: SwiperProps) => {
    const swiperRef = useRef<HTMLDivElement | null>(null);
    //TODO: grouping enum:
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
            const scrollAmount = swiperRef.current.offsetWidth;
            swiperRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <Container className="flex-col relative w-19/20 mx-auto">
            {!atLeft ? (
                <Button
                    className="absolute flex items-center justify-center left-0 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full hover:shadow-md hover:bg-gray-600 transition z-2"
                    onClick={() => scroll("left")}
                >
                    <img src="/ArrowRight.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center left-0 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full hover:shadow-md hover:bg-gray-600 z-2"
                    style={{ opacity: atLeft ? 0 : 1 }}
                    onClick={() => scroll("left")}
                    type="button"
                >
                    <img src="/ArrowRight.svg" />
                </Button>
            )}

            <div ref={swiperRef}
                className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-4 px-4">
                {items?.map((_, index) => (
                    <div className="w-100 h-60 relative flex-shrink-0 bg-[rgb(250,249,249)] text-white flex items-center justify-center rounded-md transition ease-in-out hover:scale-105 duration-300" key={index} />
                ))}
            </div>

            {!atRight ? (
                <Button
                    className="absolute flex items-center justify-center right-0 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition z-2"
                    onClick={() => scroll("right")}
                >
                    <img src="/ArrowLeft.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center right-0 top-1/2 -translate-y-1/2 h-30 w-6 bg-[rgba(255,255,255,0.1)] text-white p-2 rounded-full shadow-md hover:bg-gray-600 z-2"
                    style={{ opacity: atRight ? 0 : 1 }}
                    onClick={() => scroll("right")}
                >
                    <img src="/ArrowLeft.svg" />
                </Button>
            )}
        </Container>
    );
};

export default BrowseSwiper;
