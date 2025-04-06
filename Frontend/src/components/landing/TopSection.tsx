import CheckEmailForm from "../../features/CheckEmailForm";
import { strings } from "../../strings/strings";
import Container from "../shared/Container";
import H1 from "../shared/H1";
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
                    <H1 className='text-white mb-3 w-full text-6xl'>
                        {strings.landing.h1}
                    </H1>
                    <Typography className='w-full mb-6 text-white' size='text-xl'>{strings.landing.startatprice}</Typography>
                    <Typography className='w-full text-white' size='text-sm'>{strings.landing.readytowatch}</Typography>
                    <Container className='relative pt-4 w-full justify-center'>
                        <CheckEmailForm className='w-full justify-center' />
                    </Container>
                </Container>
            </Container>
            <div id='curveDiv' className="absolute bottom-0 left-0 w-full h-25 z-1"></div>
        </Container>
    )
}

export default TopSection;