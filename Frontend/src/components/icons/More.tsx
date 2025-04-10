type MoreProps = {
    className?: string;
}
const More = ({ className = '' }: MoreProps) => {
    return (
        <div className="w-6 h-6 flex items-center justify-center border border-white rounded-full">
            <svg className={`${className}`} width="12" height="18" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.99951 2.00049L7.99951 8.00049L13.9995 2.00049" stroke="white" stroke-width="1.6" stroke-linecap="square" />
            </svg>
        </div>
    )
}

export default More;