/**
 * Time conversion hook that provides utilities for managing and converting between different time units.
 * @module hooks/useTimeConversion
 */

import { useSelector, useDispatch } from 'react-redux';
import { selectTimeUnit, setTimeUnit, TimeUnit } from '@/modules/process-mining/store/timeUnitSlice';
import { useCallback } from 'react';

/**
 * Conversion factors for time units with seconds as the base unit
 * @constant
 * @type {Record<TimeUnit, number>}
 */
const CONVERSION_FACTORS: Record<TimeUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400
};

/**
 * Represents a time conversion option for UI components
 * @typedef {Object} ConversionOption
 * @property {number} value - The time value in the selected unit
 * @property {string} unit - The full name of the time unit
 * @property {string} shortUnit - The abbreviated unit symbol
 */
type ConversionOption = {
  value: number;
  unit: string;
  shortUnit: string;
};

/**
 * Custom hook for time unit conversion functionality.
 * Provides utilities for converting between different time units, formatting time values,
 * and generating time-related UI options.
 * 
 * @returns {Object} Collection of time conversion utilities
 * @property {TimeUnit} timeUnit - The currently selected time unit
 * @property {Function} changeTimeUnit - Function to change the current time unit
 * @property {Function} convertFromSeconds - Converts from seconds to the current unit
 * @property {Function} convertToSeconds - Converts from the current unit to seconds
 * @property {Function} formatTime - Formats a time in seconds to a string with the current unit
 * @property {Function} getTimeOptions - Generates time options for UI components
 * @property {Function} getUnitLabel - Gets the label for the current time unit
 * @property {Function} getTimeUnitInSpanish - Translates time unit names
 * 
 * @example
 * const { formatTime, timeUnit, changeTimeUnit } = useTimeConversion();
 * const formattedTime = formatTime(120); // "2.00 m" if current unit is minutes
 * 
 * // Change the time unit
 * changeTimeUnit('hours');
 */
export const useTimeConversion = () => {
  const timeUnit = useSelector(selectTimeUnit);
  const dispatch = useDispatch();
  
  /**
   * Changes the application's time unit
   * 
   * @param {TimeUnit} unit - The time unit to set
   * @returns {void}
   */
  const changeTimeUnit = useCallback((unit: TimeUnit) => {
    dispatch(setTimeUnit(unit));
  }, [dispatch]);
  
  /**
   * Converts a value from seconds to the currently selected time unit
   * 
   * @param {number} seconds - The time value in seconds
   * @returns {number} The converted value in the current time unit (rounded to 2 decimal places)
   * 
   * @example
   * // If current unit is minutes
   * convertFromSeconds(120); // Returns 2.00
   */
  const convertFromSeconds = useCallback((seconds: number): number => {
    const converted = seconds / CONVERSION_FACTORS[timeUnit];
    return Number(converted.toFixed(2));
  }, [timeUnit]);
  
  /**
   * Converts a value from the currently selected time unit to seconds
   * 
   * @param {number} value - The time value in the current unit
   * @returns {number} The converted value in seconds
   * 
   * @example
   * // If current unit is minutes
   * convertToSeconds(2); // Returns 120
   */
  const convertToSeconds = useCallback((value: number): number => {
    return value * CONVERSION_FACTORS[timeUnit];
  }, [timeUnit]);
  
  /**
   * Formats a time value in seconds to a string with the current unit
   * 
   * @param {number} seconds - The time value in seconds
   * @param {number} [decimals=2] - Number of decimal places to display
   * @returns {string} Formatted string with value and unit symbol
   * 
   * @example
   * // If current unit is minutes
   * formatTime(90); // Returns "1.50 m"
   */
  const formatTime = useCallback((seconds: number, decimals = 2): string => {
    const converted = convertFromSeconds(seconds);
    const unitLabels: Record<TimeUnit, string> = {
      seconds: 's',
      minutes: 'm',
      hours: 'h',
      days: 'd'
    };
    
    return `${converted.toFixed(decimals)} ${unitLabels[timeUnit]}`;
  }, [convertFromSeconds, timeUnit]);
  
  /**
   * Generates time options for UI components like dropdowns or sliders
   * 
   * @param {number} minSeconds - Minimum value in seconds
   * @param {number} maxSeconds - Maximum value in seconds
   * @param {number} [steps=5] - Number of steps between min and max
   * @returns {ConversionOption[]} Array of time options
   * 
   * @example
   * // If current unit is hours, generate 3 options between 3600 and 7200 seconds
   * getTimeOptions(3600, 7200, 2); // Returns [{value: 1, unit: "hours", shortUnit: "h"}, {value: 1.5, unit: "hours", shortUnit: "h"}, {value: 2, unit: "hours", shortUnit: "h"}]
   */
  const getTimeOptions = useCallback((minSeconds: number, maxSeconds: number, steps = 5): ConversionOption[] => {
    const min = convertFromSeconds(minSeconds);
    const max = convertFromSeconds(maxSeconds);
    const step = (max - min) / steps;
    
    const options: ConversionOption[] = [];
    for (let i = 0; i <= steps; i++) {
      const value = min + step * i;
      options.push({
        value,
        unit: timeUnit,
        shortUnit: timeUnit.charAt(0)
      });
    }
    
    return options;
  }, [convertFromSeconds, timeUnit]);
  
  /**
   * Gets the label for the current time unit
   * 
   * @param {boolean} [short=true] - Whether to use short (s, m, h, d) or long form labels
   * @returns {string} Unit label
   * 
   * @example
   * // If current unit is hours
   * getUnitLabel(); // Returns "h"
   * getUnitLabel(false); // Returns "Hours"
   */
  const getUnitLabel = useCallback((short = true): string => {
    type UnitLabels = {
      long: string;
      short: string;
    };
    
    const labels: Record<TimeUnit, UnitLabels> = {
      seconds: { long: 'Seconds', short: 's' },
      minutes: { long: 'Minutes', short: 'm' },
      hours: { long: 'Hours', short: 'h' },
      days: { long: 'Days', short: 'd' }
    };
    
    return short ? labels[timeUnit].short : labels[timeUnit].long;
  }, [timeUnit]);

  /**
   * Translates time unit labels to appropriate display names
   * 
   * @param {TimeUnit} unit - The time unit to translate
   * @returns {string} The translated unit name
   * 
   * @example
   * getTimeUnits('minutes'); // Returns "Minutes"
   */
  const getTimeUnits = useCallback((unit: TimeUnit): string => {
    const translations: Record<TimeUnit, string> = {
      seconds: 'Seconds',
      minutes: 'Minutes',
      hours: 'Hours',
      days: 'Days'
    };
    return translations[unit];
  }, []);
  
  return {
    timeUnit,
    changeTimeUnit,
    convertFromSeconds,
    convertToSeconds,
    formatTime,
    getTimeOptions,
    getUnitLabel,
    getTimeUnitInSpanish: getTimeUnits
  };
};