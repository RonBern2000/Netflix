import { useEffect, useState } from "react";
import Container from "./Container"
import Logo from "./Logo"
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useLogoutUserMutation } from "../../store/slices/authApiSlice";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { strings } from "../../strings/strings";

type HeaderProps = {
    className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {

    // TODO: move this logic to a new component in features folder

    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useAppDispatch();

    const handleLogout = async (): Promise<void> => {
        try {
            await logoutUser();
            dispatch(logout());
        } catch (error) {
            console.error("Email check failed", error);
        }
    }

    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <Container className={`fixed z-50 flex-wrap h-fit gap-10 items-center w-full px-10 py-5 bg-[rgba(0,0,0,1)] transition-all duration-1000 ${isScrolled ? 'bg-black' : 'bg-transparent'} ${className}`}>
            <Logo />
            <Navbar />
            <Link
                className="text-md text-bold text-white border-b-2 border-transparent hover:border-white ml-auto"
                to={'/login'}
                onClick={handleLogout}>
                {strings.browse.signout}
            </Link>
        </Container>
    )
}

export default Header;