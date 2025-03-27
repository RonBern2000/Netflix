import Container from '../components/shared/Container';
import TopSection from '../components/landing/TopSection';
import MidSection from '../components/landing/MidSection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {

    return (
        <Container className='flex-col w-full h-screen'>
            <TopSection />
            <MidSection />
            <Footer />
        </Container>
    )
}

export default LandingPage;