import React from 'react'

type AnswerProps = {
    children: React.ReactNode;
    className?: string
}

const Answer = ({ children, className = '' }: AnswerProps) => {
    return (
        <div className={`bg-[#4e4d4dc8] p-5 ${className}`}>
            <span className='text-white text-2xl'>
                {children}
            </span>
        </div>
    )
}

export default Answer;