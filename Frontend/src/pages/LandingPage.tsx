import Container from '../components/shared/Container';
import Header from '../components/landing/Header';

const LandingPage = () => {
    return (
        <Container className="bg-[url('/LandingPage.jpg')] bg-cover bg-center h-screen z-0">
            <div className="absolute inset-0 bg-opacity-40 backdrop-blur-xs z-1"></div>
            <Header className='h-30 z-2' />
        </Container>
    )
}

export default LandingPage;