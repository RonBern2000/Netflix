import Container from '../shared/Container';
import H3 from '../shared/H3';
import PlusFaq from '../icons/PlusFaq';
import Button from '../shared/Button';
import { useState } from 'react';
import Answer from './Answer';
import MinusFaq from '../icons/MinusFaq';

type FAQPROPS = {
    h3: string;
    answer: string;
}

const FAQ = ({ h3, answer }: FAQPROPS) => {
    const [isAnswerVisible, setAnswerVisible] = useState(false);
    const handleOnClick = () => {
        setAnswerVisible(!isAnswerVisible);
    }
    return (
        <>
            <Button onClick={handleOnClick}>
                <Container className='justify-between bg-[#4e4d4dc8] p-5 cursor-pointer hover:bg-[#4e4d4dfb]'>
                    <H3 className='text-white'>{h3}</H3>
                    {!isAnswerVisible ? (<PlusFaq />) : <MinusFaq />}
                </Container>
            </Button>
            {isAnswerVisible && (
                <Answer className='transition-opacity duration-200 opacity-100'>
                    {answer}
                </Answer>
            )}
        </>
    )
}

export default FAQ;