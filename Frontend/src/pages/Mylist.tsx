import MidSection from "../components/mylist/MidSection";
import TopSection from "../components/mylist/TopSection";
import Container from "../components/shared/Container";


const Mylist = () => {
    return (
        <Container className='flex-col w-full h-screen bg-[#1c1c1c]'>
            <TopSection />
            <MidSection />
        </Container>
    )
}

export default Mylist;