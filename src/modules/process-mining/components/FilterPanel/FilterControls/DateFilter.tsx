/**
 * Date filter component for process mining filter panel.
 * Allows users to filter process data by date with various operators.
 * @module features/ProcessMining/components/FilterPanel/FilterControls/DateFilter
 */

import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { CalendarDays, Calendar, Plus } from 'lucide-react';
import { FilterCriteria } from '../../../types/types';

/**
 * Props for the DateFilter component
 * 
 * @interface DateFilterProps
 * @property {Partial<FilterCriteria>} tempFilter - Current temporary filter being built
 * @property {function} setTempFilter - Function to update the temporary filter
 * @property {function} addFilter - Function to add the completed filter to the active filters
 */
interface DateFilterProps {
  tempFilter: Partial<FilterCriteria>;
  setTempFilter: (filter: Partial<FilterCriteria>) => void;
  addFilter: () => void;
}

/**
 * Date filter component that provides UI for creating date-based filters.
 * Supports "After", "Before", and "Between" date operations.
 * 
 * @function
 * @param {DateFilterProps} props - Component props
 * @returns {JSX.Element} The rendered DateFilter component
 * 
 * @example
 * <DateFilter 
 *   tempFilter={tempFilter}
 *   setTempFilter={setTempFilter}
 *   addFilter={handleAddFilter}
 * />
 */
export const DateFilter: React.FC<DateFilterProps> = ({
  tempFilter,
  setTempFilter,
  addFilter
}) => {
  /**
   * Available date filter operators
   * @type {Array<{value: string, label: string}>}
   */
  const operators = [
    { value: 'after', label: 'After' },
    { value: 'before', label: 'Before' },
    { value: 'dateRange', label: 'Between' }
  ];

  // Set default operator if not set yet
  if (!tempFilter.operator) {
    setTempFilter({...tempFilter, operator: operators[0].value});
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays size={16} className="text-primary" />
        <span className="text-sm font-medium">Date Filter: {operators.find(op => op.value === tempFilter.operator)?.label || 'After'}</span>
      </div>
      
      {/* Operator changer (more compact) */}
      <div className="flex flex-wrap gap-1 mb-3">
        {operators.map(op => (
          <button
            key={op.value}
            className={`px-2 py-1 text-xs rounded-md ${
              tempFilter.operator === op.value 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-container text-on-surface'
            }`}
            onClick={() => setTempFilter({...tempFilter, operator: op.value, value2: op.value === 'dateRange' ? tempFilter.value2 : undefined})}
          >
            {op.label}
          </button>
        ))}
      </div>
      
      {/* Date Input(s) */}
      <div>
        <label className="block text-xs text-on-surface-dim mb-1">Value</label>
        <div className={`grid ${tempFilter.operator === 'dateRange' ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 pl-8 rounded-md border border-outline-variant bg-surface text-on-surface text-sm"
              value={tempFilter.value || ''}
              onChange={(e) => setTempFilter({...tempFilter, value: e.target.value})}
            />
            <Calendar size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-on-surface-dim" />
          </div>
          
          {tempFilter.operator === 'dateRange' && (
            <div className="relative">
              <input
                type="date"
                className="w-full p-2 pl-8 rounded-md border border-outline-variant bg-surface text-on-surface text-sm"
                value={tempFilter.value2 || ''}
                onChange={(e) => setTempFilter({...tempFilter, value2: e.target.value})}
              />
              <Calendar size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-on-surface-dim" />
            </div>
          )}
        </div>
      </div>
      
      <Button 
        className="w-full flex items-center justify-center gap-2 mt-4"
        onClick={addFilter}
        disabled={
          !tempFilter.value || 
          (tempFilter.operator === 'dateRange' && !tempFilter.value2)
        }
      >
        <Plus size={16} />
        <span>Add Filter</span>
      </Button>
    </div>
  );
};