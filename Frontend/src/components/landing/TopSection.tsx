import { strings } from "../../strings/strings";
import Button from "../shared/Button";
import Container from "../shared/Container";
import H1 from "../shared/H1";
import Input from "../shared/Input";
import Typography from "../shared/Typography";
import BlurrEffect from "./BlurrEffect";
import Header from "./Header";

const TopSection = () => {
    return (
        <Container className="text-center relative w-full h-full pb-30 backdrop-blur-xs flex-col bg-[url('/LandingPage.jpg')] bg-cover bg-center z-0 ">
            <BlurrEffect />
            <Header className='h-30 z-2' />
            <Container className='min-w-min z-2 flex-1 flex-col justify-center items-center px-8 pb-8'>
                <Container className='flex-col items-center justify-center mx-auto'>
                    <H1 className='text-white mb-3 w-full'>
                        {strings.landing.h1}
                    </H1>
                    <Typography className='w-full mb-6' size='text-xl'>{strings.landing.startatprice}</Typography>
                    <Typography className='w-full' size='text-sm'>{strings.landing.readytowatch}</Typography>
                    <Container className='relative pt-4 w-full justify-center gap-1.5'>
                        <Input className='w-full bg-[rgba(31,31,31,0.7)] border-1' type='email'></Input>
                        <Button className='relative rounded-sm max-md:text-sm text-white bg-[rgba(229,8,20,0.9)] px-6 py-3'>{strings.landing.getStarted}<img
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            src="/ArrowLeft.svg"
                            alt="arrowLeft" />
                        </Button>
                    </Container>
                </Container>
            </Container>
            <div id='curveDiv' className="absolute bottom-0 left-0 w-full h-25 z-1"></div>
        </Container>
    )
}

export default TopSection;

{/* <Container className="text-center relative w-full h-full pb-30 backdrop-blur-xs flex-col bg-[url('/LandingPage.jpg')] bg-cover bg-center z-0 ">
    <BlurrEffect />
    <Header className='h-30 z-2' />
    <Container className='min-w-min z-2 flex-1 flex-col justify-center items-center px-8 pb-8'>
        <Container className='flex-col items-center justify-center mx-auto'>
            <H1 className='text-white mb-3 w-full'>
                {strings.landing.h1}
            </H1>
            <Typography className='w-full mb-6' size='text-xl'>{strings.landing.startatprice}</Typography>
            <Typography className='w-full' size='text-sm'>{strings.landing.readytowatch}</Typography>
            <Container className='relative pt-4 w-full justify-center gap-1.5'>
                <Input className='w-3/5 bg-[rgba(31,31,31,0.7)]' type='email'></Input>
                <Button className='relative rounded-sm max-md:text-sm text-white bg-[rgba(229,8,20,0.9)] px-6 py-3'>{strings.landing.getStarted}<img
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/ArrowLeft.svg"
                    alt="arrowLeft" />
                </Button>
            </Container>
        </Container>
    </Container>
    <div id='curveDiv' className="absolute bottom-0 left-0 w-full h-25 z-1"></div>
</Container> */}