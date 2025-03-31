import TopSectionSignup from "../components/shared/TopSectionSignup";
import Container from "../components/shared/Container";
import MidSection from "../components/registration/MidSection";

const Registration = () => {
    return (
        <Container className='flex-col w-full h-screen'>
            <TopSectionSignup />
            <MidSection />
        </Container>
    )
}

export default Registration;