import MidSection from "../components/login/MidSection";
import TopSection from "../components/login/TopSection";
import Container from "../components/shared/Container";


const Login = () => {
    return (
        <Container className='flex-col w-full h-screen'>
            <Container className="flex-col bg-[url('/LandingPage.jpg')] h-full bg-cover bg-center text-white">
                <TopSection />
                <MidSection />
            </Container>
        </Container>
    )
}

export default Login;