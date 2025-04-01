import Container from "./Container"
import Logo from "./Logo"
import Navbar from "./Navbar";

type HeaderProps = {
    className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
    return (
        <Container className={`flex-wrap h-fit gap-10 items-center w-full px-10 py-5 bg-[rgba(0,0,0,0.05)] ${className}`}>
            <Logo />
            <Navbar />
        </Container>
    )
}

export default Header;