import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { strings } from "../../strings/strings";
import Hr from "./Hr";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { useLogoutUserMutation } from "../../store/slices/authApiSlice";

const TopSectionSignup = () => {

    // TODO: move this logic to a new component in features folder

    const [logoutUser] = useLogoutUserMutation();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();

    const handleLoginLogout = async (): Promise<void> => {
        try {
            if (isAuthenticated) {
                await logoutUser();
                dispatch(logout());
            }
        } catch (error) {
            console.error("Email check failed", error);
        }
    }

    return (
        <>
            <Container className="justify-between items-center w-full px-10 py-5">
                <Logo />
                <Link
                    className="text-2xl text-bold text-black border-b-2 border-transparent hover:border-black"
                    to={isAuthenticated ? '/landing' : '/login'}
                    onClick={handleLoginLogout}>
                    {isAuthenticated ? strings.auth.signout : strings.auth.signin}
                </Link>
            </Container>
            <Hr />
        </>
    )
}

export default TopSectionSignup;
