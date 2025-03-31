import MidSection from "../components/regform/MidSection";
import Container from "../components/shared/Container";
import TopSectionSignup from "../components/shared/TopSectionSignup";

const Regform = () => {

    return (
        <Container className='flex-col w-full h-screen'>
            <TopSectionSignup />
            <MidSection />
        </Container>
    )
}

export default Regform;