import RenderMyListColumns from "../../features/RenderMyListColumns";
import { strings } from "../../strings/strings";
import Container from "../shared/Container";
import H1 from "../shared/H1";

const MidSection = () => {
    return (
        <Container className="pt-40 px-14 flex-col gap-4">
            <H1 className="text-white z-1 ml-7.5 text-4xl">{strings.myList.mylist}</H1>
            <RenderMyListColumns />
        </Container>
    )
}

export default MidSection;