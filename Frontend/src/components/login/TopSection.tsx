import Container from "../shared/Container";
import Header from "./Header";

const TopSection = () => {
    return (
        <Container className="justify-between items-center w-full px-60 py-5">
            <Header />
        </Container>
    )
}

export default TopSection;