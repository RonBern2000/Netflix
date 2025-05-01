import MidSection from "../components/search/MidSection";
import TopSection from "../components/search/TopSection";
import Container from "../components/shared/Container";

const Search = () => {
    return (
        <Container className='flex-col w-full h-screen bg-[#1c1c1c]'>
            <TopSection />
            <MidSection />
        </Container>
    )
}

export default Search;