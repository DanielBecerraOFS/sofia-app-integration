
// src/features/ProcessMining/components/Toolbar/TimeUnitDropdown.tsx
import React from 'react';
import { TimeUnit } from '../../store/timeUnitSlice';
import { Portal } from '../ui/Portal';

interface TimeUnitDropdownProps {
  timeUnit: TimeUnit;
  handleTimeUnitChange: (unit: TimeUnit, event?: React.MouseEvent) => void;
  position: { top: number; left: number };
}

export const TimeUnitDropdown: React.FC<TimeUnitDropdownProps> = ({
  timeUnit,
  handleTimeUnitChange,
  position
}) => {
  // English translation for time units
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
    <Portal>
      <div 
        data-testid="time-unit-dropdown"
        className="rounded-lg shadow-xl p-1 w-44 pointer-events-auto bg-surface border border-outline"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`
        }}
      >
        {(['seconds', 'minutes', 'hours', 'days'] as TimeUnit[]).map((unit) => (
          <button
            data-testid="time-unit-dropdown-option"
            key={unit}
            onClick={(e) => handleTimeUnitChange(unit, e)}
            className={`w-full px-3 py-2 text-left flex items-center rounded-md text-sm ${
              timeUnit === unit 
                ? "bg-secondary-container text-on-secondary-container" 
                : "hover:bg-surface-container text-on-surface"
            }`}
          >
            <span>{getTimeUnitInEnglish(unit)}</span>
            {timeUnit === unit && (
              <span className="ml-auto text-secondary">✓</span>
            )}
          </button>
        ))}
      </div>
    </Portal>
  );
};