
// src/features/ProcessMining/components/FilterPanel/FilterControls/StringFilter.tsx
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Tag, Search, Plus } from 'lucide-react';
import { FilterCriteria } from '../../../types/types';

interface StringFilterProps {
  tempFilter: Partial<FilterCriteria>;
  searchTerm: string;
  setTempFilter: (filter: Partial<FilterCriteria>) => void;
  setSearchTerm: (term: string) => void;
  addFilter: () => void;
  getFilteredDistincts: () => any[];
}

export const StringFilter: React.FC<StringFilterProps> = ({
  tempFilter,
  searchTerm,
  setTempFilter,
  setSearchTerm,
  addFilter,
  getFilteredDistincts
}) => {
  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' }
  ];

  // Set default operator if not set yet
  if (!tempFilter.operator) {
    setTempFilter({...tempFilter, operator: operators[0].value});
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Tag size={16} className="text-primary" />
        <span className="text-sm font-medium">Text Filter: {operators.find(op => op.value === tempFilter.operator)?.label || 'Equals'}</span>
      </div>
      
      {/* Value Input */}
      <div>
        <label className="block text-xs text-on-surface-dim mb-1">Value</label>
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 pl-8 rounded-md border border-outline-variant bg-surface text-on-surface text-sm"
            placeholder="Enter value or select below"
            value={tempFilter.value || ''}
            onChange={(e) => setTempFilter({...tempFilter, value: e.target.value})}
          />
          <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-on-surface-dim" />
        </div>
      </div>
      
      {/* Search Input for Distinct Values */}
      <div>
        <label className="block text-xs text-on-surface-dim mb-1">Quick Search</label>
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 pl-8 rounded-md border border-outline-variant bg-surface-dim text-on-surface text-sm"
            placeholder="Search available values"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-on-surface-dim" />
        </div>
      </div>
      
      {/* Distinct Values List */}
      <div>
        <label className="block text-xs text-on-surface-dim mb-1">
          Available Values ({getFilteredDistincts().length} available)
        </label>
        <div 
          className="h-40 overflow-y-auto border border-outline-variant rounded-md p-1 bg-surface-dim"
        >
          {getFilteredDistincts().length > 0 ? (
            <div className="space-y-1">
              {getFilteredDistincts().map((value, index) => (
                <div 
                  key={index} 
                  className="px-2 py-1.5 text-xs rounded-md cursor-pointer hover:bg-surface-container transition-colors"
                  onClick={() => setTempFilter({...tempFilter, value})}
                >
                  {String(value)}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-surface-dim">
              No matching values found
            </div>
          )}
        </div>
      </div>
      
      <Button 
        className="w-full flex items-center justify-center gap-2 mt-4"
        onClick={addFilter}
        disabled={!tempFilter.value}
      >
        <Plus size={16} />
        <span>Add Filter</span>
      </Button>
    </div>
  );
};
