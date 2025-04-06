import BrowseSwiperContainer from "../../features/BrowseSwiperContainer";
import Container from "../shared/Container";


const MidSection = () => {

    // TODO: Pagination: infinite scroll custom implementation, We get all the movies here and iterate throw the generes and create Swipers,
    // Here we need to get all the genres in an array and map the array to create multiple swipers

    return (
        <Container className="flex-col gap-10 md:w-full bg-[#1f1f1f]">
            <BrowseSwiperContainer genre="" />
            <BrowseSwiperContainer genre="" />
            <BrowseSwiperContainer genre="" />
            <BrowseSwiperContainer genre="" />
            <BrowseSwiperContainer genre="" />
        </Container>
    )
}

export default MidSection;