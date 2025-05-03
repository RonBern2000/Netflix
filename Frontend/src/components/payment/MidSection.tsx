import PaymentForm from "../../features/PaymentForm";
import { strings } from "../../strings/strings";
import Vi from "../icons/Vi";
import Container from "../shared/Container";
import H1 from "../shared/H1";
import Typography from "../shared/Typography";

const MidSection = () => {
    return (
        <Container className="flex-col gap-1 justify-center items-center">
            <Container className='flex-col items-center justify-center text-center mx-auto mt-25'>
                <img src='/Circlewithvi.png' alt='vi logo' />
                <Typography className='text-black'>{strings.auth.signup.step3of3}</Typography>
                <H1 className='text-3xl font-semibold'>{strings.auth.payment.h1}</H1>
                <Container className="flex-col">
                    {new Array(3).fill(0).map((_, index) => (
                        <Container className="gap-2" key={strings.auth.signup.typos[index].id}>
                            <Vi />
                            <Typography>{strings.auth.signup.typos[index].text}</Typography>
                        </Container>
                    ))}
                </Container>
            </Container>
            <PaymentForm />
        </Container>
    )
}

export default MidSection;