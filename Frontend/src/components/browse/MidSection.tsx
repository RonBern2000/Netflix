import BrowseSwiper from "../shared/BrowseSwiper";
import Container from "../shared/Container";


const MidSection = () => {

    // TODO: Pagination: infinite scroll custom implementation, We get all the movies here and iterate throw the generes and create Swipers

    return (
        <Container className="flex-col gap-10 md:w-full">
            <BrowseSwiper movies={undefined} />
        </Container>
    )
}

export default MidSection;