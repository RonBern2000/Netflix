import MidSection from "../components/browse/MidSection";
import TopSection from "../components/browse/TopSection";
import Container from "../components/shared/Container";

const Browse = () => {
    return (
        <Container className='flex-col w-full h-screen '>
            <TopSection />
            <MidSection />
        </Container>
    )
}

export default Browse;