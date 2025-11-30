import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] rounded-[2rem] p-8 transition-colors duration-500 ${className}`}>
      {children}
    </div>
  );
};