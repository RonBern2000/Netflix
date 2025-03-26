import Container from '../components/shared/Container';
import { strings } from '../strings/strings';
import Swiper from '../components/shared/Swiper';
import H2 from '../components/shared/H2';
import TopSection from '../components/landing/TopSection';
import ReasonCard from '../components/landing/ReasonCard';

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
                        <Container className='w-full gap-4'>
                            <ReasonCard h3Title={strings.landing.reasoncards.reasonsHeaders.reason1} typo={strings.landing.reasoncards.reasonTypos.type1} />
                            <ReasonCard h3Title={strings.landing.reasoncards.reasonsHeaders.reason2} typo={strings.landing.reasoncards.reasonTypos.type2} />
                            <ReasonCard h3Title={strings.landing.reasoncards.reasonsHeaders.reason3} typo={strings.landing.reasoncards.reasonTypos.type3} />
                            <ReasonCard h3Title={strings.landing.reasoncards.reasonsHeaders.reason4} typo={strings.landing.reasoncards.reasonTypos.type4} />
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default LandingPage;