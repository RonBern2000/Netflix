import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "submit" | "button";
    className?: string;
}

const Button = ({ onClick, children, type = 'button', className = '', ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`${className}`}
            type={type}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;