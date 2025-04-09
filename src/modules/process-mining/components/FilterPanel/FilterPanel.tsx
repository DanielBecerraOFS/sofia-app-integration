
// src/features/ProcessMining/components/FilterPanel/FilterPanel.tsx
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { 
  X, 
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Attribute, FilterCriteria, DynamicFilter } from '../../types/types';
import { StringFilter } from './FilterControls/StringFilter';
import { NumberFilter } from './FilterControls/NumberFilter';
import { DateFilter } from './FilterControls/DateFilter';
import { ActiveFilterTag } from '../Filters/ActiveFilterTag';

interface FilterPanelProps {
  attributes: Attribute[];
  currentAttribute: Attribute;
  currentAttributeIndex: number;
  attributeSelectorRef: React.RefObject<HTMLDivElement | null> ;
  tempFilter: Partial<FilterCriteria>;
  searchTerm: string;
  selectedFilter: DynamicFilter;
  isAttributeListOpen: boolean;
  setIsAttributeListOpen: (isOpen: boolean) => void;
  setCurrentAttributeIndex: (index: number) => void;
  setTempFilter: (filter: Partial<FilterCriteria>) => void;
  setSearchTerm: (term: string) => void;
  addFilter: () => void;
  resetFilters: () => void;
  handleApplyFilters: () => void;
  setIsFilterOpen: (isOpen: boolean) => void;
  toggleFilterValue: (attribute: string, value: string) => void;
  getFilteredDistincts: () => any[];
  nextAttribute: () => void;
  prevAttribute: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  attributes,
  currentAttribute,
  attributeSelectorRef,
  tempFilter,
  searchTerm,
  selectedFilter,
  isAttributeListOpen,
  setIsAttributeListOpen,
  setTempFilter,
  setSearchTerm,
  addFilter,
  resetFilters,
  handleApplyFilters,
  setIsFilterOpen,
  toggleFilterValue,
  getFilteredDistincts,
  nextAttribute,
  prevAttribute
}) => {
  // Render different filter controls based on attribute type
  const renderFilterControls = () => {
    switch(currentAttribute.type) {
      case 'str':
        return (
          <StringFilter
            tempFilter={tempFilter}
            searchTerm={searchTerm}
            setTempFilter={setTempFilter}
            setSearchTerm={setSearchTerm}
            addFilter={addFilter}
            getFilteredDistincts={getFilteredDistincts}
          />
        );
      case 'number':
        return (
          <NumberFilter
            tempFilter={tempFilter}
            setTempFilter={setTempFilter}
            addFilter={addFilter}
          />
        );
      case 'date':
        return (
          <DateFilter
            tempFilter={tempFilter}
            setTempFilter={setTempFilter}
            addFilter={addFilter}
          />
        );
      default:
        return <div className="text-sm text-on-surface">Unsupported attribute type</div>;
    }
  };

  // Get count of all applied filters
  const getFilterCount = (): number => {
    return Object.keys(selectedFilter).reduce((count, key) => {
      return count + (selectedFilter[key]?.length || 0);
    }, 0);
  };

  return (
    <div data-testid="filter-panel" className="absolute left-0 top-0 bottom-0 border-r border-outline-variant shadow-xl bg-surface z-20 w-72 flex flex-col">
      {/* Header with attribute selector */}
      <div className="border-b border-outline-variant p-3 bg-surface-container">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Advanced Filter</h3>
          <Button
            data-testid="filter-panel-close-button"
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0" 
            onClick={() => setIsFilterOpen(false)}
          >
            <X size={16} />
          </Button>
        </div>
        
        {/* Attribute navigation */}
        {attributes.length > 0 && (
          <div 
            ref={attributeSelectorRef} 
            className="flex items-center mt-3 p-2 rounded-md bg-surface-container-high border border-outline-variant"
          >
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={prevAttribute}
            >
              <ChevronLeft size={16} />
            </Button>
            
            <div 
              className="flex-grow px-2 font-medium text-sm text-center cursor-pointer"
              onClick={() => setIsAttributeListOpen(!isAttributeListOpen)}
            >
              {currentAttribute.name}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={nextAttribute}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
      
      {/* Filter controls based on attribute type */}
      <div className="flex-grow overflow-y-auto">
        {attributes.length > 0 ? renderFilterControls() : (
          <div className="p-4 text-sm text-on-surface-dim flex flex-col items-center justify-center h-full">
            <Filter size={24} className="mb-2 text-on-surface-dim" />
            No attributes available for filtering
          </div>
        )}
      </div>
      
      {/* Current active filters section */}
      {getFilterCount() > 0 && (
        <div className="p-3 border-t border-outline-variant bg-surface-dim">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-on-surface-dim">Active Filters</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 text-xs text-error" 
              onClick={resetFilters}
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilter).map(([attribute, values]) => 
              values && values.map((value) => (
                <ActiveFilterTag 
                  key={`${attribute}-${value}`} 
                  attribute={attribute}
                  value={String(value)}
                  onRemove={() => toggleFilterValue(attribute, String(value))}
                />
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="p-3 border-t border-outline-variant bg-surface-container-high flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsFilterOpen(false)}
        >
          Cancel
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleApplyFilters}
          className="bg-primary text-on-primary"
        >
          <CheckCircle2 size={14} className="mr-1" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};