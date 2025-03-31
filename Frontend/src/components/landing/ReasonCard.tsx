import Container from '../shared/Container';
import H3 from '../shared/H3';
import Typography from '../shared/Typography';
import React from 'react';

type ReasonCardProps = {
    h3Title: string;
    typo: string;
    children: React.ReactNode;
}

const ReasonCard = ({ h3Title, typo, children }: ReasonCardProps) => {
    return (
        <Container className='max-sm:w-full sm:w-full md:w-[calc(50%-15px)]  lg:w-[calc(50%-15px)] xl:w-[calc(25%-15px)] flex-col gap-3 items-start reasonCard justify-between rounded-2xl py-4 px-3 bg-[rgb(28,27,54)]'>
            <H3 className='text-white mb-auto self-start'>{h3Title}</H3>
            <Typography className='mt-auto text-white'>{typo}</Typography>
            <div className='mt-auto self-end'>{children}</div>
        </Container>
    )
}

export default ReasonCard;