import React from "react"

interface TrailerVideoProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    className?: string;
}

const TrailerVideo = ({ className = '', ...props }: TrailerVideoProps) => {
    return (
        <iframe className={`${className}`} {...props}></iframe>
    )
}

export default TrailerVideo