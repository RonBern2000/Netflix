import { useNavigate } from "react-router-dom";
import { strings } from "../../strings/strings";
import Button from "../shared/Button";
import Container from "../shared/Container";
import Typography from "../shared/Typography";
import H1 from "../shared/H1";
import Vi from "../icons/Vi";

const MidSection = () => {

    const navigate = useNavigate();

    return (
        <Container className='flex-col items-center justify-center w-[340px] mx-auto p-3'>
            <Container className='flex-col items-center justify-center text-center mx-auto mt-25'>
                <img src='/Circlewithvi.png' alt='vi logo' />
                <Typography className='text-black'>{strings.auth.signup.step2of3}</Typography>
                <H1 className='text-3xl font-semibold'>{strings.auth.signup.h1}</H1>
                <Container className="flex-col">
                    {new Array(3).fill(0).map((_, index) => (
                        <Container className="gap-2" key={strings.auth.signup.typos[index].id}>
                            <Vi />
                            <Typography>{strings.auth.signup.typos[index].text}</Typography>
                        </Container>
                    ))}
                </Container>
            </Container>
            <Button className='bg-red-500 text-white w-full h-18 rounded-md font-semibold text-2xl mt-5' onClick={() => navigate('/signup/payment')}>{strings.auth.next}</Button>
        </Container>
    )
}

export default MidSection;