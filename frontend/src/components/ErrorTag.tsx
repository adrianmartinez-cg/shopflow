import React from 'react';

interface ErrorTagProps {
  children?: React.ReactNode;
}

const ErrorTag: React.FC<ErrorTagProps> = ({ children }) => {
  if (!children) {
    return null;
  }
  return <p className="text-red-500 text-xs italic mt-1">{children}</p>;
};

export default ErrorTag;