import Container from "../shared/Container";
import Header from "../shared/Header";
import Preview from "./Preview";


const TopSection = () => {
    return (
        <Container className="flex-col">
            <Header className="px-5" />
            <Preview />
        </Container>
    )
}

export default TopSection;