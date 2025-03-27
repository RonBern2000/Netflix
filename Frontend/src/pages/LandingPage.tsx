import Container from '../components/shared/Container';
import { strings } from '../strings/strings';
import Swiper from '../components/shared/Swiper';
import H2 from '../components/shared/H2';
import TopSection from '../components/landing/TopSection';
import ReasonsContainer from '../components/landing/ReasonsContainer';
import FAQContainer from '../components/landing/FAQContainer';

const LandingPage = () => {

    return (
        <Container className='flex-col w-full h-screen'>
            <TopSection />
            <Container className='flex-col bg-black md:px-40 lg:px-100 items-center'>
                <Container className='flex-col items-center w-full'>
                    <Container className='flex-col w-full mb-16'>
                        <H2 className='text-white w-full text-left mb-0'>
                            {strings.landing.h2Trending}
                        </H2>
                        <Swiper />
                    </Container>

                    <Container className='flex-col w-full mb-16'>
                        <H2 className='text-white w-full text-left mb-4'>
                            {strings.landing.h2Reasons}
                        </H2>
                        <ReasonsContainer />
                    </Container>

                    <Container className='w-full'>
                        <FAQContainer />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default LandingPage;