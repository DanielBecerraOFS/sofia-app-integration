
import React from 'react';
import { X } from 'lucide-react';

interface ActiveFilterTagProps {
  attribute: string;
  value: string;
  onRemove: () => void;
}

export const ActiveFilterTag: React.FC<ActiveFilterTagProps> = ({ 
  attribute, 
  value, 
  onRemove 
}) => {
  // Función para formatear nombres de atributos
  const formatAttributeName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="flex items-center px-2 py-1 rounded-full text-xs bg-primary-container text-on-primary-container border border-primary">
      <span className="font-medium mr-1">{formatAttributeName(attribute)}</span>
      <span className="mr-1">=</span>
      <span>{value}</span>
      <button 
        onClick={onRemove} 
        className="ml-2 p-0.5 rounded-full hover:bg-primary hover:text-on-primary"
      >
        <X size={12} />
      </button>
    </div>
  );
};

