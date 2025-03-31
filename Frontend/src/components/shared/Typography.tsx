import React from 'react';

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  size?: "text-sm" | "text-base" | "text-lg" | "text-xl";
}

const Typography = ({ children, className = '', size = 'text-sm' }: TypographyProps) => {
  return (
    <p className={`${className} ${size}`}>{children}</p>
  )
}

export default Typography;