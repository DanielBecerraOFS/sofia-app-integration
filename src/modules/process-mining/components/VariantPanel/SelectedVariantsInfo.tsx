
// src/features/ProcessMining/components/VariantPanel/SelectedVariantsInfo.tsx
import React from 'react';

export interface SelectedVariantsInfoProps {
  selectedVariants: string[];
  totalSelectedPercentage: number;
}

export const SelectedVariantsInfo: React.FC<SelectedVariantsInfoProps> = ({
  selectedVariants,
  totalSelectedPercentage
}) => {
  return (
    <div className="md:hidden flex items-center gap-1 px-3 py-1.5 rounded-md text-xs shadow-sm border backdrop-blur-md bg-surface text-on-surface border-outline-variant">
      <span className="font-medium">{selectedVariants.length} var.</span>
      <span >({totalSelectedPercentage}%)</span>
    </div>
  );
};

