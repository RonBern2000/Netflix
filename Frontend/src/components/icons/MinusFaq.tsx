type MinusFaqProps = {
    width?: number;
    height?: number;
}

const MinusFaq = ({ width = 28, height = 28 }: MinusFaqProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 27L14 14L27 1M1 1L27 27" stroke="white" strokeWidth="2" />
        </svg>
    )
}

export default MinusFaq;