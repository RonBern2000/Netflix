import Container from '../shared/Container';
import H3 from '../shared/H3';
import Typography from '../shared/Typography';

type ReasonCardProps = {
    h3Title: string;
    typo: string;
}

const ReasonCard = ({ h3Title, typo }: ReasonCardProps) => {
    return (
        <Container className='flex-col gap-3 items-start w-1/4 reasonCard justify-between rounded-2xl py-4 px-2 bg-[rgb(28,27,54)]'>
            <H3 className='text-white mb-auto self-start'>{h3Title}</H3>
            <Typography className='mt-auto'>{typo}</Typography>
        </Container>
    )
}

export default ReasonCard;