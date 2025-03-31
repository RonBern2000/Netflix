import SignupForm from "../../features/SignupForm";
import { strings } from "../../strings/strings";
import Container from "../shared/Container";
import H1 from "../shared/H1";
import Typography from "../shared/Typography";

const MidSection = () => {

    return (
        <Container className='flex-col items-center justify-center w-[440px] mx-auto p-3'>
            <Container className='flex-col justify-center mx-auto mt-25'>
                <Typography className='text-black'>{strings.auth.regform.step1of3}</Typography>
                <H1 className='text-3xl font-semibold'>{strings.auth.regform.h1}</H1>
                <Typography size='text-lg' className='w-[80%] my-2'>{strings.auth.regform.typo}</Typography>
                <SignupForm />
            </Container>
        </Container>
    )
}

export default MidSection;