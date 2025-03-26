import React from "react";

type H3Props = {
    children: React.ReactNode;
    className?: string;
}

const H3 = ({ className = '', children }: H3Props) => {
    return (
        <h3 className={`text-2xl font-bold whitespace-pre-wrap ${className}`}>{children}</h3>
    )
}

export default H3;