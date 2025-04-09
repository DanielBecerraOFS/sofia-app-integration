
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export interface VariantPanelToggleButtonProps {
  onClick: () => void;
}

export const VariantPanelToggleButton: React.FC<VariantPanelToggleButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      className="absolute top-1/2 -left-10 -translate-y-1/2 h-20 w-10 flex items-center justify-center shadow-md border bg-surface border-outline"
      onClick={onClick}
      title="Show variants"
    >
      <ChevronLeft size={16} />
    </Button>
  );
};