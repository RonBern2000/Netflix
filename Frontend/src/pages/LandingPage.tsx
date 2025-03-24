import Container from '../components/shared/Container';
import Header from '../components/landing/Header';
import BlurrEffect from '../components/landing/BlurrEffect';
import H1 from '../components/shared/H1';
import { strings } from '../strings/strings';
import Typography from '../components/shared/Typography';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';

const LandingPage = () => {
    return (
        <Container className='flex-col w-screen h-screen'>
            <Container className="relative h-4/5 backdrop-blur-xs flex-col bg-[url('/LandingPage.jpg')] w-screen bg-cover bg-center z-0">
                <BlurrEffect />
                <Header className='h-30 z-2' />
                <Container className='min-w-min z-2 flex-1 flex-col justify-center items-center px-8 pb-8'>
                    <Container className='flex-col items-center justify-center mx-auto'>
                        <H1 className='text-white mb-3 w-full'>
                            {strings.landing.h1}
                        </H1>
                        <Typography className='w-full mb-6' size='text-xl'>{strings.landing.startatprice}</Typography>
                        <Typography className='w-full' size='text-sm'>{strings.landing.readytowatch}</Typography>
                        <Container className='pt-4 w-full justify-center gap-1.5'>
                            <Input className='w-3/5 bg-[rgba(31,31,31,0.5)]' type='email' placeholder='email' />
                            <Button className=' text-white bg-[rgba(229,8,20,0.9)] px-6 py-3'>{strings.landing.getStarted}</Button>
                        </Container>
                    </Container>
                </Container>
                <div id='curveDiv' className="absolute bottom-0 left-0 w-full h-25 z-1"></div>
            </Container>

            <Container className='flex-col bg-black h-1/5'>
                Sections
            </Container>
        </Container>
    )
}

export default LandingPage;