import Button from "../shared/Button";
import Container from "../shared/Container";
import Logo from "../shared/Logo";
import LanguageDropDown from "./LanguageDropDown";
import { strings } from "../../strings/strings";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

type HeaderProps = {
  className?: string;
}
const Header = ({ className = '' }: HeaderProps) => {

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleAction = () => {
    if (isAuthenticated) {
      navigate('/landing');
    }
    navigate('/login');
  }

  return (
    <Container className={`flex-wrap h-fit justify-between items-center w-full px-40 py-5 ${className}`}>
      <Logo />
      <Container className="gap-3 items-center max-sm:my-5">
        <LanguageDropDown />
        <Button className="rounded-sm p-1 h-7.5 w-18 text-sm text-white bg-[rgba(229,8,20,0.9)]" onClick={handleAction} children={isAuthenticated ? strings.landing.signout : strings.landing.signin} />
      </Container>
    </Container>
  )
}

export default Header;