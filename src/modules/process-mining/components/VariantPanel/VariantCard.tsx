import React from 'react';
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { VariantData } from '../../types/types';
import { CustomTooltip } from './CustomTooltip';

export interface VariantCardProps {
  variant: VariantData;
  isSelected: boolean;
  toggleVariant: (value: string, event?: React.MouseEvent) => void;
  convertFromSeconds: (seconds: number) => string | number;
  getUnitLabel: () => string;
}

export const VariantCard: React.FC<VariantCardProps> = ({
  variant,
  isSelected,
  toggleVariant,
  convertFromSeconds,
  getUnitLabel
}) => {
  return (
    <div
      data-testid="variant-item"
      className={`p-3 rounded-lg cursor-pointer transition-all border ${
        isSelected ? 'bg-primary-container border-primary' : 'bg-surface-dim border-outline-variant'
      }`}
      onClick={(e) => toggleVariant(variant.value, e)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`font-medium ${
          isSelected ? 'text-on-primary-container' : 'text-on-surface'
        }`}>
          {variant.displayName}
        </span>
        <span className="text-sm font-semibold">
          {Math.round(variant.frequency)}%
        </span>
      </div>
      
      <ResponsiveContainer width="100%" height={40}>
        <BarChart
          data={[variant]}
          layout="vertical"
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Bar
            dataKey="frequency"
            fill={isSelected ? 'var(--color-primary)' : 'var(--color-secondary)'}
            radius={4}
            background={{ fill: 'var(--color-surface-container)' }}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-2 text-xs text-on-surface">
        <span>Average duration: </span>
        <span className="font-medium">
          {/* Convertir a string para evitar problemas de tipo */}
          {String(convertFromSeconds(variant.avg_time))} {getUnitLabel()}
        </span>
      </div>
    </div>
  );
};