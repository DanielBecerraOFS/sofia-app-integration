// src/features/ProcessMining/components/VariantPanel/CustomTooltip.tsx
// Modificar el CustomTooltip para aceptar tanto string como number en convertFromSeconds

import React from 'react';
import { VariantData } from '../../types/types';
import { useTimeConversion } from "@/modules/process-mining/hooks/useTimeConversion";

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: VariantData;
  }>;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  // Usar el hook directamente en el componente para evitar problemas de tipos
  const { convertFromSeconds, getUnitLabel } = useTimeConversion();

  if (active && payload && payload.length > 0) {
    return (
      <div className="p-3 rounded-md shadow-lg border backdrop-blur-md text-xs bg-surface text-on-surface border-outline-variant">
        <p className="font-medium text-sm mb-1">Frequency</p>
        <p className="text-lg font-semibold text-primary">{Math.round(payload[0].value)}%</p>
        <p className="font-medium text-sm mt-2 mb-1">Duration</p>
        <p className="text-lg font-semibold text-secondary">
          {convertFromSeconds(Math.round(payload[0].payload.avg_time))} {getUnitLabel()}
        </p>
      </div>
    );
  }
  return null;
};