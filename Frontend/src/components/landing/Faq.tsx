import Container from '../shared/Container';
import H3 from '../shared/H3';
import PlusFaq from '../icons/PlusFaq';
import React from 'react';

type FAQPROPS = {
    h3: string;
}

const FAQ = ({ h3 }: FAQPROPS) => {
    return (
        <Container className='justify-between bg-[#4e4d4dc8] p-5 cursor-pointer hover:bg-[#4e4d4dfb]'>
            <H3 className='text-white'>{h3}</H3>
            <PlusFaq />
        </Container>
    )
}

export default FAQ;