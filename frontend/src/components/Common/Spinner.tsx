import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div
      className={`${sizeMap[size]} animate-spin rounded-full border-2 border-gray-200 border-t-primary-600`}
      role="status"
      aria-label="Loading"
    />
  </div>
);

export default Spinner;
