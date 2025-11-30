import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`
      relative
      bg-white/60 dark:bg-[#1C1C1E]/60 
      backdrop-blur-xl backdrop-saturate-150
      border border-white/40 dark:border-white/5 
      shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
      rounded-[2.5rem] 
      ${noPadding ? '' : 'p-8'}
      transition-all duration-500 ease-out
      ${className}
    `}>
      {children}
    </div>
  );
};