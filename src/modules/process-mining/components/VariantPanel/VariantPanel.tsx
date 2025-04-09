
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ChevronRight, BarChart as BarChartIcon } from 'lucide-react';
import { VariantData } from '../../types/types';
import { VariantCard } from './VariantCard';

export interface VariantPanelProps {
  displayVariants: VariantData[];
  selectedVariants: string[];
  sortOrder: 'frequency' | 'duration';
  totalSelectedPercentage: number;
  toggleVariant: (value: string, event?: React.MouseEvent) => void;
  setSortOrder: (order: 'frequency' | 'duration') => void;
  setSelectedVariants: (variants: string[]) => void;
  setIsVariantPanelOpen: (isOpen: boolean) => void;
  convertFromSeconds: (seconds: number) => string | number;
  getUnitLabel: () => string;
}

export const VariantPanel: React.FC<VariantPanelProps> = ({
  displayVariants,
  selectedVariants,
  sortOrder,
  totalSelectedPercentage,
  toggleVariant,
  setSortOrder,
  setSelectedVariants,
  setIsVariantPanelOpen,
  convertFromSeconds,
  getUnitLabel
}) => {
  return (
    <div data-testid="variant-panel" className="absolute right-0 top-0 bottom-0 border-l border-outline-variant shadow-xl bg-surface z-10 w-96 translate-x-0">
      <div className="h-full flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BarChartIcon size={18} className="text-primary" />
            <h3 className="font-medium text-lg">Variants</h3>
          </div>
          <Button 
            data-testid="variant-panel-close-button"
            variant="ghost" 
            size="icon" 
            onClick={() => setIsVariantPanelOpen(false)}
            className="h-8 w-8"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-on-surface">
            {selectedVariants.length > 0 ? (
              <>
                <span className="font-medium">
                  {selectedVariants.length} selected
                </span>{" "}
                (
                <span data-testid="variant-percentage">
                  {totalSelectedPercentage}%
                </span>{" "}
                of total)
              </>
            ) : (
              "Top variants by"
            )}
          </div>
          
          <select 
            className="text-xs border rounded-md px-2 py-1 bg-surface-container border-outline-variant text-on-surface"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'frequency' | 'duration')}
          >
            <option value="frequency">Frequency</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {displayVariants.length > 0 ? (
            <div className="space-y-4">
              {displayVariants.map((variant) => (
                <VariantCard
                  key={variant.value}
                  variant={variant}
                  isSelected={selectedVariants.includes(variant.value)}
                  toggleVariant={toggleVariant}
                  convertFromSeconds={convertFromSeconds}
                  getUnitLabel={getUnitLabel}
                />
              ))}
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-on-surface">
              No variants available
            </div>
          )}
        </div>
        
        {selectedVariants.length > 0 && (
          <div className="mt-4 pt-4 border-t border-outline-variant">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setSelectedVariants([])}
              className="w-full"
            >
              Clear selection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};