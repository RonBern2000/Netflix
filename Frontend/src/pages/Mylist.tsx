import MidSection from "../components/mylist/MidSection";
import TopSection from "../components/mylist/TopSection";
import Container from "../components/shared/Container";


const Mylist = () => {
    return (
        <Container className='flex-col w-full h-screen bg-black'> {/* TODO: temp bg color */}
            <TopSection />
            <MidSection />
        </Container>
    )
}

export default Mylist;