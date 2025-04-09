
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { 
  Filter, 
  Clock, 
  X, 
  BarChart as BarChartIcon,
  Minimize 
} from 'lucide-react';
import { TimeUnit } from '../../store/timeUnitSlice';

interface ToolbarProps {
  isCompactMode: boolean;
  isFilterOpen: boolean;
  isTimeUnitOpen: boolean;
  timeUnit: TimeUnit;
  selectedVariants: string[];
  isVariantPanelOpen: boolean;
  filterCount: number;
  timeUnitButtonRef: React.RefObject<HTMLDivElement | null>;
  totalSelectedPercentage: number | null;
  filterButtonRef: React.RefObject<HTMLDivElement | null>;
  toggleCompactMode: () => void;
  toggleFilterPanel: () => void;
  toggleVariantPanel: () => void;
  toggleTimeUnitDropdown: (e: React.MouseEvent) => void;
  clearFilters: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  isCompactMode,
  isFilterOpen,
  isTimeUnitOpen,
  timeUnit,
  selectedVariants,
  isVariantPanelOpen,
  filterCount,
  timeUnitButtonRef,
  filterButtonRef,
  toggleCompactMode,
  toggleFilterPanel,
  toggleVariantPanel,
  toggleTimeUnitDropdown,
  clearFilters
}) => {
  const getTimeUnitInEnglish = (unit: TimeUnit): string => {
    switch (unit) {
      case 'seconds': return 'Seconds';
      case 'minutes': return 'Minutes';
      case 'hours': return 'Hours';
      case 'days': return 'Days';
      default: return String(unit);
    }
  };

  return (
    <div data-testid="toolbar" className={`flex items-center justify-between border-b border-outline-variant bg-surface-container z-10 ${isCompactMode ? 'p-1 sm:p-1' : 'p-2 sm:p-3'}`}>
      <div className="flex items-center gap-2">
        {/* Filter Button */}
        <div ref={filterButtonRef}>
          <Button 
            data-testid="filter-button"
            variant="secondary" 
            size={isCompactMode ? "sm" : "default"}
            onClick={toggleFilterPanel}
            className={`flex items-center gap-1 ${isFilterOpen ? 'bg-primary-container text-on-primary-container' : ''}`}
          >
            <Filter size={isCompactMode ? 14 : 16} />
            <span className={isCompactMode ? "hidden" : "hidden sm:inline"}>Filters</span>
            {filterCount > 0 && (
              <span data-testid="filter-badge" className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-primary text-on-primary">
                {filterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Time unit button */}
        <div ref={timeUnitButtonRef}>
          <Button 
            data-testid="time-unit-button"
            variant="secondary" 
            size={isCompactMode ? "sm" : "default"} 
            onClick={toggleTimeUnitDropdown}
            className={`flex items-center gap-1 ${isTimeUnitOpen ? 'bg-secondary-container text-on-secondary-container' : ''}`}
          >
            <Clock size={isCompactMode ? 14 : 16} />
            <span className={isCompactMode ? "hidden" : "hidden sm:inline"}>{getTimeUnitInEnglish(timeUnit)}</span>
          </Button>
        </div>

        {/* Clear button */}
        {(!isCompactMode || (selectedVariants.length > 0 || filterCount > 0)) && (
          <Button
            variant="outline"
            size={isCompactMode ? "sm" : "default"}
            onClick={clearFilters}
            disabled={!selectedVariants.length && filterCount === 0}
            className={isCompactMode ? "flex items-center" : "hidden sm:flex items-center gap-1"}
          >
            <X size={isCompactMode ? 14 : 16} />
            {!isCompactMode && <span>Clear</span>}
          </Button>
        )}
      </div>
      
      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Compact mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCompactMode}
          title={isCompactMode ? "Expand toolbar" : "Compact toolbar"}
          className="hidden sm:flex"
        >
          <Minimize size={16} />
        </Button>
        
        {/* Variants toggle */}
        <Button
          data-testid="variant-button"
          variant={isVariantPanelOpen ? "default" : "outline"}
          size={isCompactMode ? "sm" : "default"}
          onClick={toggleVariantPanel}
          className={`flex items-center gap-1 ${isVariantPanelOpen ? 'bg-primary text-on-primary' : ''}`}
        >
          <BarChartIcon size={isCompactMode ? 14 : 16} />
          {!isCompactMode && <span className="hidden sm:inline">Variants</span>}
          {!isVariantPanelOpen && selectedVariants.length > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-primary text-on-primary">
              {selectedVariants.length}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};