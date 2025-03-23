import Container from '../components/shared/Container';
import Header from '../components/landing/Header';
import BlurrEffect from '../components/landing/BlurrEffect';

const LandingPage = () => {
    return (
        <Container className="bg-[url('/LandingPage.jpg')] bg-cover bg-center h-screen z-0">
            <BlurrEffect />
            <Header className='h-30 z-2' />
        </Container>
    )
}

export default LandingPage;