import { strings } from "../../strings/strings";
import Container from "../shared/Container";
import H2 from "../shared/H2";
import FAQ from "./FAQ";

const FAQContainer = () => {
    return (
        <Container className="flex-col mb-5 w-full">
            <H2 className="text-white mb-4">{strings.landing.h2Faq}</H2>
            <Container className="flex-col gap-2">
                {new Array(6).fill(null).map((_, index) => (
                    <FAQ key={index} h3={strings.landing.faqs.h3s[index]}></FAQ>
                ))}
            </Container>
        </Container>
    )
}

export default FAQContainer;