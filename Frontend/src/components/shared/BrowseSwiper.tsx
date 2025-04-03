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

    const [activeIndex, setActiveIndex] = useState(0);

    let paginationAmount = items.length / 6;
    paginationAmount = Math.floor(paginationAmount);
    if (items.length % 6 !== 0) {
        paginationAmount++;
    }
    console.log(paginationAmount);
    console.log(movies);

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

        setActiveIndex((prevIndex) => {
            if (direction === "right") {
                return Math.min(prevIndex + 1, paginationAmount - 1);
            } else {
                return Math.max(prevIndex - 1, 0);
            }
        });
    };

    return (
        <Container className="flex-col relative w-19/20 mx-auto">
            <ul className="absolute flex gap-1 right-20 -top-4">
                {new Array(paginationAmount).fill(0).map((_, index) =>
                    <li className={`w-4 border-white ${activeIndex === index ? "border-b-2" : ""}`} key={index}> 1</li>
                )}
            </ul>
            {!atLeft ? (
                <Button
                    className="absolute flex items-center opacity-0 hover:opacity-100 justify-center left-0  max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8 text-white p-2 hover:bg-[rgb(0,0,0,0.8)] transition z-2"
                    onClick={() => scroll("left")}
                >
                    <img src="/ArrowRight.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center left-0 top-1/2 -translate-y-1/2 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8 bg-[rgb(0,0,0,0.8)] text-white p-2 hover:bg-[rgb(0,0,0,0.8)]z-2"
                    style={{ opacity: atLeft ? 0 : 1 }}
                    onClick={() => scroll("left")}
                    type="button"
                >
                    <img src="/ArrowRight.svg" />
                </Button>
            )}

            <div className="h-50 ">
                <div ref={swiperRef}
                    className="flex scrollbar-hide overflow-hidden scroll-smooth gap-5 py-4 px-4 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full">
                    {items?.map((_, index) => (
                        <div className="cursor-pointer w-13/84 h-full relative flex-shrink-0 bg-[rgb(250,249,249)] text-white flex items-center justify-center rounded-md transition ease-in-out hover:scale-105 duration-300" key={index} />
                    ))}
                </div>
            </div>

            {!atRight ? (
                <Button
                    className="absolute opacity-0 hover:opacity-100 flex items-center justify-center right-0 top-1/2 -translate-y-1/2 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8  text-white p-2 hover:bg-[rgb(0,0,0,0.8)] transition z-2"
                    onClick={() => scroll("right")}
                >
                    <img src="/ArrowLeft.svg" />
                </Button>
            ) : (
                <Button
                    className="transition-opacity duration-1000 opacity-100 absolute flex items-center justify-center right-0 top-1/2 -translate-y-1/2 max-sm:h-4/10 sm:h-4/10 md:h-5/10 lg:h-7/10 xl:h-9/10 2xl:h-full w-8 bg-[rgb(0,0,0,0.8)] text-white p-2 hover:bg-[rgb(0,0,0,0.8)] z-2"
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
