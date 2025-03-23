import React from 'react';

type TypographyProps = {
    children: React.ReactNode;
    className?: string;
    size?: "text-sm" | "text-base" |"text-xl";
}

const Typography = ({children, className = '', size = 'text-sm'}: TypographyProps) => {
  return (
    <p className={`text-white ${className} ${size}`}>{children}</p>
  )
}

export default Typography;