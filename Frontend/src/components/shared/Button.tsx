import React from 'react';

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "submit" | "button";
    className?: string;
}

const Button = ({ onClick, children, type = 'button', className = '' }: ButtonProps) => {
    return (
        <button
            className={`rounded-sm ${className}`}
            type={type}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;