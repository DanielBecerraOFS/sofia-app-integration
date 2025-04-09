// src/features/ProcessMining/components/FilterPanel/AttributeListDropdown.tsx
import React from 'react';
import { Search, Tag, Hash, Calendar } from 'lucide-react';
import { Portal } from '../ui/Portal';
import { Attribute } from '../../types/types';

interface AttributeListDropdownProps {
  attributes: Attribute[];
  currentAttributeIndex: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectAttribute: (index: number) => void;
  position: { top: number; left: number };
  width?: number;
}

export const AttributeListDropdown: React.FC<AttributeListDropdownProps> = ({
  attributes,
  currentAttributeIndex,
  searchTerm,
  setSearchTerm,
  selectAttribute,
  position,
  width
}) => {
  return (
    <Portal>
      <div 
        className="attribute-list-dropdown pointer-events-auto bg-surface border border-outline-variant rounded-lg shadow-lg overflow-hidden max-h-60"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: width ? `${width}px` : 'auto'
        }}
      >
        <div className="p-2">
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pl-8 rounded-md border border-outline-variant bg-surface-dim text-on-surface text-sm"
              placeholder="Search attributes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-on-surface-dim" />
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-40">
          {attributes
            .filter(attr => attr.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((attr, index) => (
              <div 
                key={attr.name} 
                className={`px-3 py-2 cursor-pointer text-sm flex items-center gap-2 hover:bg-surface-container transition-colors ${
                  index === currentAttributeIndex ? 'bg-primary-container text-on-primary-container' : ''
                }`}
                onClick={() => selectAttribute(index)}
              >
                {attr.type === 'str' && <Tag size={14} />}
                {attr.type === 'number' && <Hash size={14} />}
                {attr.type === 'date' && <Calendar size={14} />}
                <span>{attr.name}</span>
                <span className="ml-auto text-xs text-on-surface-dim">{attr.type}</span>
              </div>
            ))}
        </div>
      </div>
    </Portal>
  );
};