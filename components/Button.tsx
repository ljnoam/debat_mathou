import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-black text-white hover:bg-gray-800 shadow-lg shadow-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:shadow-none";
      break;
    case 'secondary':
      variantStyles = "bg-white text-gray-900 border border-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700";
      break;
    case 'ghost':
      variantStyles = "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10";
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