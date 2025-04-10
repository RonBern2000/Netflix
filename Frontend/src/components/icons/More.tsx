type MoreProps = {
    className?: string;
}
const More = ({ className = '' }: MoreProps) => {
    return (
        <svg className={`${className}`} width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#2A2A2A" />
            <circle cx="20" cy="20" r="19" stroke="white" stroke-opacity="0.5" stroke-width="2" />
            <path d="M13.9995 18.0005L19.9995 24.0005L25.9995 18.0005" stroke="white" stroke-width="1.6" stroke-linecap="square" />
        </svg>
    )
}

export default More;