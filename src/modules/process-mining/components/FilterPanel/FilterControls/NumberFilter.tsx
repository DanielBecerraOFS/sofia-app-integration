
/**
 * Number filter component for process mining filter panel.
 * Allows users to filter process data by numbers with various operators.
 * @module features/ProcessMining/components/FilterPanel/FilterControls/NumberFilter
 */

import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Hash, Plus } from 'lucide-react';
import { FilterCriteria } from '../../../types/types';

/**
 * Props for the NumberFilter component
 * 
 * @interface NumberFilterProps
 * @property {Partial<FilterCriteria>} tempFilter - Current temporary filter being built
 * @property {function} setTempFilter - Function to update the temporary filter
 * @property {function} addFilter - Function to add the completed filter to the active filters
 */
interface NumberFilterProps {
  tempFilter: Partial<FilterCriteria>;
  setTempFilter: (filter: Partial<FilterCriteria>) => void;
  addFilter: () => void;
}

/**
 * Number filter component that provides UI for creating number-based filters.
 * Supports "Equals", "Greater than", "Less than" and "Between" date operations.
 * 
 * @function
 * @param {NumberFilterProps} props - Component props
 * @returns {JSX.Element} The rendered DateFilter component
 * 
 * @example
 * <NumberFilter 
 *   tempFilter={tempFilter}
 *   setTempFilter={setTempFilter}
 *   addFilter={handleAddFilter}
 * />
 */
export const NumberFilter: React.FC<NumberFilterProps> = ({
  tempFilter,
  setTempFilter,
  addFilter
}) => {

  /**
   * Available date filter operators
   * @type {Array<{value: string, label: string}>}
   */
  const operators = [
    { value: 'equals', label: 'Equal to' },
    { value: 'greaterThan', label: 'Greater than' },
    { value: 'lessThan', label: 'Less than' },
    { value: 'between', label: 'Between' }
  ];

  // Set default operator if not set yet
  if (!tempFilter.operator) {
    setTempFilter({...tempFilter, operator: operators[0].value});
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Hash size={16} className="text-primary" />
        <span className="text-sm font-medium">Number Filter: {operators.find(op => op.value === tempFilter.operator)?.label || 'Equal to'}</span>
      </div>
      
      {/* Value Input(s) */}
      <div>
        <label className="block text-xs text-on-surface-dim mb-1">Value</label>
        <div className={`grid ${tempFilter.operator === 'between' ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
          <input
            type="number"
            className="w-full p-2 rounded-md border border-outline-variant bg-surface text-on-surface text-sm"
            placeholder={tempFilter.operator === 'between' ? 'Min value' : 'Enter value'}
            value={tempFilter.value || ''}
            onChange={(e) => setTempFilter({...tempFilter, value: e.target.value})}
          />
          
          {tempFilter.operator === 'between' && (
            <input
              type="number"
              className="w-full p-2 rounded-md border border-outline-variant bg-surface text-on-surface text-sm"
              placeholder="Max value"
              value={tempFilter.value2 || ''}
              onChange={(e) => setTempFilter({...tempFilter, value2: e.target.value})}
            />
          )}
        </div>
      </div>
      
      {/* Operator changer (more compact) */}
      <div className="flex flex-wrap gap-1">
        {operators.map(op => (
          <button
            key={op.value}
            className={`px-2 py-1 text-xs rounded-md ${
              tempFilter.operator === op.value 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-container text-on-surface'
            }`}
            onClick={() => setTempFilter({...tempFilter, operator: op.value, value2: op.value === 'between' ? tempFilter.value2 : undefined})}
          >
            {op.label}
          </button>
        ))}
      </div>
      
      <Button 
        className="w-full flex items-center justify-center gap-2 mt-4"
        onClick={addFilter}
        disabled={
          !tempFilter.value || 
          (tempFilter.operator === 'between' && !tempFilter.value2)
        }
      >
        <Plus size={16} />
        <span>Add Filter</span>
      </Button>
    </div>
  );
};