type ViProps = {
    width?: number;
    height?: number;
    className?: string;
}

const Vi = ({ width = 24, height = 24, className = '' }: ViProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width={width} height={height} data-icon="CheckmarkStandard" aria-hidden="true" className={`default-ltr-cache-16ad5t-Icon-getSizedIcon e1ijjdwe7 ${className}`}><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
    )
}

export default Vi