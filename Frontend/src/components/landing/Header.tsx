import Button from "../shared/Button";
import Container from "../shared/Container";
import Logo from "../shared/Logo";
import LanguageDropDown from "./LanguageDropDown";
import { strings } from "../../strings/strings";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  className?: string;
}
const Header = ({ className = '' }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <Container className={`flex-wrap h-fit justify-between items-center w-screen px-100 py-5 ${className}`}>
      <Logo />
      <Container className="gap-5 items-center max-sm:my-5">
        <LanguageDropDown />
        <Button className="p-1 w-20 text-sm text-white font-bold bg-[rgba(229,8,20,0.9)]" onClick={() => navigate("/authentication")} children={strings.landing.signin} />
      </Container>
    </Container>
  )
}

export default Header;