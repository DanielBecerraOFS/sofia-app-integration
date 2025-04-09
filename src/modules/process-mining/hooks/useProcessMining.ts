// useProcessMining.ts
// Main hook for process mining functionality

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/core/store/store';
import {
  fetchProjectMetadata,
  fetchFilteredDataWithVariants,
  setFilterAttribute,
  setSelectedCases,
  setSelectedActivities,
  setDynamicFilters,
  clearFilters,
  computeGraphData,
  KPIResult,
} from '../store/processMiningSlice';
import { DynamicFilter } from '../types/types';

export function useProcessMining() {
  const dispatch: AppDispatch = useDispatch();
  const { metadata, rawData, graphData, loading, error, selectedFilter } = useSelector(
    (state: RootState) => state.processMining
  );

  // Convert activityAverages to KPIResult format for backward compatibility
  const localKpis: KPIResult[] = Object.entries(graphData.activityAverages || {}).map(
    ([name, avg_time]) => ({
      name,
      avg_time
    })
  );

  const loadMetadata = () => {
    dispatch(fetchProjectMetadata());
  };

  const loadFilteredData = (filter: DynamicFilter) => {
    dispatch(fetchFilteredDataWithVariants(filter));
  };

  // Legacy support methods
  const updateSelectedCases = (cases: string[]) => {
    dispatch(setSelectedCases(cases));
  };

  const updateSelectedActivities = (activities: string[]) => {
    dispatch(setSelectedActivities(activities));
  };

  // New dynamic filter methods
  const setFilterValues = (attribute: string, values: string[]) => {
    dispatch(setFilterAttribute({ attribute, values }));
  };

  const toggleFilterValue = (attribute: string, value: string) => {
    const currentValues = selectedFilter[attribute] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    dispatch(setFilterAttribute({ attribute, values: newValues }));
  };

  const updateSelectedFilters = (filterObject: DynamicFilter) => {
    dispatch(setDynamicFilters(filterObject));
  };

  const resetFilters = () => {
    dispatch(clearFilters());
  };

  const updateGraphData = () => {
    dispatch(computeGraphData());
  };

  return {
    metadata,
    rawData,
    graphData,
    kpis: localKpis,
    overallAverage: graphData.overallAverage,
    loading,
    error,
    selectedFilter,
    loadMetadata,
    loadFilteredData,
    // Legacy methods
    updateSelectedCases,
    updateSelectedActivities,
    // New dynamic filter methods
    setFilterValues,
    toggleFilterValue,
    updateSelectedFilters,
    resetFilters,
    updateGraphData,
  };
}