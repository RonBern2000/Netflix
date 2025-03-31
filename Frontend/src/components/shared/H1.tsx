import React from "react";

type H1Props = {
    children: React.ReactNode;
    className?: string;
}

const H1 = ({ className = '', children }: H1Props) => {
    return (
        <h1 className={`font-extrabold whitespace-pre-wrap ${className}`}>{children}</h1>
    )
}

export default H1;