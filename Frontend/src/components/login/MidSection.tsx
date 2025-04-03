import { Link } from "react-router-dom";
import LoginForm from "../../features/LoginForm";
import { strings } from "../../strings/strings";
import Container from "../shared/Container";
import H1 from "../shared/H1";
import Typography from "../shared/Typography";
import Button from "../shared/Button";
import CheckBox from "../shared/CheckBox";

const MidSection = () => {
    return (
        <Container className="flex-col justify-center items-center mt-5">
            <Container className="flex-col w-[450px] bg-[rgba(0,0,0,0.7)] p-12 py-15 rounded-xl gap-3.5">
                <H1 className="text-3xl mb-3">{strings.landing.signin}</H1>
                <Container className="flex-col items-center gap-3">
                    <LoginForm />
                    <Typography size="text-md" className="text-gray-400">{strings.auth.login.OR}</Typography>
                    <Button className="bg-[rgba(58,58,58,0.7)] hover:bg-[rgba(58,58,58,0.5)] text-white w-full py-1.5 rounded-md font-semibold text-lg">{strings.auth.login.UseaSignInCode}</Button>
                    <Link to={'#'} className="underline">{strings.auth.login.forgotpassword}</Link>
                    <CheckBox className="self-start gap-2">Remember me</CheckBox>
                </Container>
                <Typography size="text-md" className="text-[#adadad]">
                    {strings.auth.login.newToNetflix}
                    {" "}
                    <Link className="font-semibold hover:underline text-white" to={'/landing'}>{strings.auth.login.signupNow}</Link>
                </Typography>
                <Typography size="text-sm" className="text-gray-400 text-[13px]">
                    {strings.auth.login.typo}
                </Typography>
                <Link className="text-blue-500 underline" to={'#'}>{strings.auth.login.learnMore}</Link>
            </Container>
        </Container>
    )
}

export default MidSection;