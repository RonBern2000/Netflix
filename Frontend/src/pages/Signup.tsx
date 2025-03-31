import Container from "../components/shared/Container";
import TopSectionSignup from "../components/shared/TopSectionSignup";
import MidSection from "../components/signup/MidSection";

const Signup = () => {
    return (
        <Container className='flex-col w-full h-screen'>
            <TopSectionSignup />
            <MidSection />
        </Container>
    )
}

export default Signup;