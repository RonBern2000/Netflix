import { useEffect, useState } from "react";
import Container from "./Container"
import Logo from "./Logo"
import Navbar from "./Navbar";

type HeaderProps = {
    className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
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
        </Container>
    )
}

export default Header;