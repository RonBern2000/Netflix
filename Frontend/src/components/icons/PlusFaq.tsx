type PlusFaqProps = {
    width?: number;
    height?: number;
}

const PlusFaq = ({ width = 36, height = 36 }: PlusFaqProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }} fill="none" role="img" viewBox="0 0 36 36" width={width} height={height} data-icon="PlusLarge" aria-hidden="true" className=" accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-yx31ci-StyledPlusLarge e164gv2o4"> <path fillRule="evenodd" clipRule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path></svg >
    )
}

export default PlusFaq;