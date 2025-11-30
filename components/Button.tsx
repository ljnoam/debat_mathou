import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-semibold transition-all duration-200 transform active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 outline-none select-none";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-[#007AFF] text-white hover:bg-[#0062CC] dark:bg-[#0A84FF] dark:hover:bg-[#0071E3] shadow-lg shadow-blue-500/20 py-4 px-8 rounded-full text-[17px]";
      break;
    case 'secondary':
      variantStyles = "bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(255,255,255,0.1)] backdrop-blur-md text-gray-900 dark:text-white border border-gray-200/50 dark:border-white/10 py-4 px-8 rounded-full text-[17px]";
      break;
    case 'ghost':
      variantStyles = "bg-transparent text-[#007AFF] dark:text-[#0A84FF] hover:bg-blue-50/50 dark:hover:bg-white/5 py-2 px-4 rounded-lg text-base";
      break;
    case 'icon':
      variantStyles = "p-3 rounded-full bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 text-gray-900 dark:text-white shadow-sm hover:bg-white dark:hover:bg-[#2C2C2E]";
      break;
  }

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};