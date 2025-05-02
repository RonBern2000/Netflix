import RenderBrowseSwipers from "../../features/RenderBrowseSwipers";
import Container from "../shared/Container";


const MidSection = () => {

    return (
        <Container className="flex-col gap-10 md:w-full bg-[#1c1c1c] pt-175 h-full">
            <RenderBrowseSwipers />
        </Container>
    )
}

export default MidSection;