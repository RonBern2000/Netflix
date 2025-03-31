import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { strings } from "../../strings/strings";
import Hr from "./Hr";
import { useAppSelector } from "../../store/store";

const TopSectionSignup = () => {

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            <Container className="justify-between items-center w-full px-10 py-5">
                <Logo />
                <Link
                    className="text-2xl text-bold text-black border-b-2 border-transparent hover:border-black"
                    to={"/login"}>
                    {isAuthenticated ? strings.auth.signout : strings.auth.signin}
                </Link>
            </Container>
            <Hr />
        </>
    )
}

export default TopSectionSignup;