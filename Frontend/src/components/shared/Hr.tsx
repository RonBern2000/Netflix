type HrProps = {
    className?: string;
}

const Hr = ({ className = '' }: HrProps) => {
    return (
        <hr className={`border-gray-300 border-0.5 ${className}`} />
    )
}

export default Hr;