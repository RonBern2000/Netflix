import Container from "../shared/Container";
import Header from "../shared/Header";
import Preview from "./Preview";


const TopSection = () => {
    // TODO: get the preview movie from the state and pass it to the preview
    return (
        <Container className="flex-col relative">
            <Header className="px-5" />
            <Preview movie={undefined} />
        </Container>
    )
}

export default TopSection;