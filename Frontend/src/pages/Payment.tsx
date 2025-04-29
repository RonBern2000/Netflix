
import MidSection from "../components/payment/MidSection";
import Container from "../components/shared/Container";
import TopSectionSignup from "../components/shared/TopSectionSignup";

const Payment = () => {
    return (
        <Container className='flex-col w-full h-screen'>
            <TopSectionSignup />
            <MidSection />
        </Container>
    )
}

export default Payment;