/**
 * Redux slice for managing time unit preferences across the application.
 * Persists the selected time unit in localStorage.
 * @module features/timeUnit/timeUnitSlice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/core/store/store';

/**
 * Available time units in the application
 * @typedef {('seconds'|'minutes'|'hours'|'days')} TimeUnit
 */
export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days';

/**
 * State structure for the time unit slice
 * @interface TimeUnitState
 * @property {TimeUnit} unit - The currently selected time unit
 */
export interface TimeUnitState {
  unit: TimeUnit;
}

/**
 * Retrieves the initial time unit state.
 * First tries to load from localStorage if available, otherwise defaults to 'minutes'.
 * 
 * @returns {TimeUnitState} The initial state for the time unit slice
 */
const getInitialState = (): TimeUnitState => {
  if (typeof window !== 'undefined') {
    const savedUnit = localStorage.getItem('timeUnit') as TimeUnit | null;
    return { unit: savedUnit || 'minutes' };
  }
  return { unit: 'minutes' };
};

/**
 * Redux slice for time unit management.
 * Includes reducers for setting the time unit and persisting it to localStorage.
 */
const timeUnitSlice = createSlice({
  name: 'timeUnit',
  initialState: getInitialState(),
  reducers: {
    /**
     * Sets the active time unit and persists it in localStorage
     * 
     * @param {TimeUnitState} state - Current state
     * @param {PayloadAction<TimeUnit>} action - Action containing the new time unit
     */
    setTimeUnit: (state, action: PayloadAction<TimeUnit>) => {
      state.unit = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('timeUnit', action.payload);
      }
    }
  }
});

// Export actions and reducer
export const { setTimeUnit } = timeUnitSlice.actions;

/**
 * Selector function to get the current time unit from the Redux store
 * 
 * @param {RootState} state - The Redux root state
 * @returns {TimeUnit} The currently selected time unit
 * 
 * @example
 * // In a component
 * const timeUnit = useSelector(selectTimeUnit);
 * console.log(timeUnit); // 'minutes'
 */
export const selectTimeUnit = (state: RootState) => state.timeUnit.unit;

export default timeUnitSlice.reducer;