import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import Container from '../shared/Container';
import H1 from '../shared/H1';
import Typography from '../shared/Typography';
import { strings } from '../../strings/strings';

const MidSection = () => {

    const navigate = useNavigate();

    return (
        <Container className='flex-col items-center justify-center w-[340px] mx-auto p-3'>
            <Container className='flex-col items-center justify-center text-center mx-auto mt-25'>
                <img src='/stepslogo.png' alt='steps logo' />
                <Typography className='text-black'>{strings.auth.registration.step1of3}</Typography>
                <H1 className='text-3xl font-semibold'>{strings.auth.registration.h1}</H1>
                <Typography size='text-lg' className='w-[92%]'>{strings.auth.registration.typo}</Typography>
            </Container>
            <Button className='bg-red-500 text-white w-full h-18 rounded-md font-semibold text-2xl mt-5' onClick={() => navigate('/signup/regform')}>{strings.auth.next}</Button>
        </Container>
    )
}

export default MidSection;