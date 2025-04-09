
// src/features/ProcessMining/components/UI/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div data-testid="error-message" className="absolute inset-0 flex items-center justify-center p-4">
      <div className="p-6 rounded-lg max-w-md bg-error text-on-error">
        <h3 className="font-medium text-lg mb-2">Error</h3>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
};