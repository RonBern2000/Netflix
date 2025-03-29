import GetpopularMovies from "../../features/GetPopularMovies";
import { strings } from "../../strings/strings";
import Button from "../shared/Button";
import Container from "../shared/Container";
import H2 from "../shared/H2";
import Input from "../shared/Input";
import Swiper from "../shared/Swiper";
import Typography from "../shared/Typography";
import FAQContainer from "./FAQContainer";
import ReasonsContainer from "./ReasonsContainer";

const MidSection = () => {
    return (
        <Container className='flex-col bg-black md:px-40 lg:px-100 items-center'>
            <Container className='flex-col items-center w-full'>
                <Container className='flex-col w-full mb-16'>
                    <H2 className='text-white w-full text-left mb-0'>
                        {strings.landing.h2Trending}
                    </H2>
                    <GetpopularMovies />
                    <Swiper />
                </Container>
                <Container className='flex-col w-full mb-16'>
                    <H2 className='text-white w-full text-left mb-4'>
                        {strings.landing.h2Reasons}
                    </H2>
                    <ReasonsContainer />
                </Container>
                <Container className='w-full mb-16'>
                    <FAQContainer />
                </Container>
            </Container>

            <Container className='min-w-min z-2 flex-1 flex-col justify-center items-center px-8 pb-8 w-full'>
                <Container className='flex-col items-center justify-center mx-auto w-3/4'>
                    <Typography className='w-full text-center' size='text-sm'>{strings.landing.readytowatch}</Typography>
                    <Container className='relative pt-4 w-full justify-center gap-1.5'>
                        <Input className='w-full bg-[rgba(31,31,31,0.7)] border-1' type='email' />
                        <Button className='relative rounded-sm max-md:text-sm text-white bg-[rgba(229,8,20,0.9)] px-6 py-3'>{strings.landing.getStarted}<img
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            src="/ArrowLeft.svg"
                            alt="arrowLeft" />
                        </Button>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default MidSection;