import React from "react";

type H2Props = {
    children: React.ReactNode;
    className?: string;
}

const H2 = ({ className = '', children }: H2Props) => {
    return (
        <h2 className={`text-2xl whitespace-pre-wrap ${className}`}>{children}</h2>
    )
}

export default H2;