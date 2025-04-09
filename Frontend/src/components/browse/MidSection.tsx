import RenderBrowseSwipers from "../../features/RenderBrowseSwipers";
import Container from "../shared/Container";


const MidSection = () => {

    return (
        <Container className="flex-col gap-10 md:w-full bg-[#1f1f1f] pt-72">
            <RenderBrowseSwipers/>
        </Container>
    )
}

export default MidSection;