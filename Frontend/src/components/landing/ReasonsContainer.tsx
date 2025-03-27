import { strings } from '../../strings/strings';
import Container from '../shared/Container';
import ReasonCard from './ReasonCard';
import { Screen } from '../icons/Screen';
import { Download } from '../icons/Download';
import { Watch } from '../icons/Watch';
import { Profiles } from '../icons/Profiles';

const ReasonsContainer = () => {
    return (
        <Container className='w-[100%] flex-wrap gap-5'>
            {new Array(4).fill(null).map((_, index) => (
                <ReasonCard
                    key={index}
                    h3Title={strings.landing.reasoncards.reasonsHeaders[index]}
                    typo={strings.landing.reasoncards.reasonTypos[index]}
                >
                    {index === 0 ? <Screen /> : index === 1 ? <Download /> : index === 2 ? <Watch /> : <Profiles />}
                </ReasonCard>
            ))}
        </Container>
    )
}

export default ReasonsContainer;