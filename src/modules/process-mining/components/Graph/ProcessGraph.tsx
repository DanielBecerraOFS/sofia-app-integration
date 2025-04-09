
// src/features/ProcessMining/components/Graph/ProcessGraph.tsx
import React from 'react';
import ReactFlowElkCanvas from "../ReactFlowElkCanvas";
import { ActiveFilterTags } from '../Filters/ActiveFilterTags';
import { SelectedVariantsInfo } from '../VariantPanel/SelectedVariantsInfo';
import { DynamicFilter } from '../../types/types';

interface ProcessGraphProps {
  graphData: {
    nodes: any[];
    edges: any[];
  } | null;
  selectedFilter: DynamicFilter;
  selectedVariants: string[];
  totalSelectedPercentage: number;
  isVariantPanelOpen: boolean;
  toggleFilterValue: (attribute: string, value: string) => void;
  applyFilters: (specificFilter?: DynamicFilter) => void;
}

export const ProcessGraph: React.FC<ProcessGraphProps> = ({
  graphData,
  selectedFilter,
  selectedVariants,
  totalSelectedPercentage,
  isVariantPanelOpen,
  toggleFilterValue,
  applyFilters
}) => {
  return (
    <div data-testid="process-graph" className="w-full h-full bg-surface-dim">
      <ReactFlowElkCanvas
        key={`flow-${JSON.stringify(selectedFilter)}-${selectedVariants.join()}`}
        nodes={graphData?.nodes || []}
        edges={graphData?.edges || []}
      />
      
      {/* Stats overlay - positioned at bottom right */}
      <div className={`absolute bottom-3 flex flex-col items-end gap-2 ${isVariantPanelOpen ? 'right-[24rem]' : 'right-3'} transition-all duration-300`}>
        {/* For mobile, show selected variants info */}
        {selectedVariants.length > 0 && (
          <SelectedVariantsInfo 
            selectedVariants={selectedVariants}
            totalSelectedPercentage={totalSelectedPercentage}
          />
        )}
        
        {/* Active filters tags */}
        <ActiveFilterTags 
          selectedFilter={selectedFilter}
          toggleFilterValue={toggleFilterValue}
          applyFilters={applyFilters}
        />
      </div>
    </div>
  );
};