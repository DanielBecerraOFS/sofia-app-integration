// useProcessMiningFilters.ts (Versión mejorada)
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
  setFilterAttribute,
  setDynamicFilters as updateSelectedFilters,
  clearFilters,
  fetchFilteredDataWithVariants,
} from '../store/processMiningSlice';
import { DynamicFilter } from '@/modules/process-mining/types/types';

export function useProcessMiningFilters() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFilter = useSelector((state: RootState) => state.processMining.selectedFilter);
  const metadata = useSelector((state: RootState) => state.processMining.metadata);
  const loading = useSelector((state: RootState) => state.processMining.loading);
  
  // Get attributes that can be used for filtering
  const filterableAttributes = metadata?.attributes?.filter(attr => 
    attr.distincts && attr.distincts.length > 0
  ) || [];
  
  // Toggle a single value for an attribute - SOLUCIÓN MEJORADA
  const toggleFilterValue = (attribute: string, value: string) => {
    const currentValues = selectedFilter[attribute] || [];
    let newValues;
    
    if (currentValues.includes(value)) {
      // Eliminar el valor
      newValues = currentValues.filter(v => v !== value);
    } else {
      // Agregar el valor
      newValues = [...currentValues, value];
    }
    
    // Actualizar el estado del filtro
    dispatch(setFilterAttribute({ attribute, values: newValues }));
    
    // Si hemos eliminado todos los valores para un atributo, 
    // podríamos necesitar limpiar ese atributo del filtro
    if (newValues.length === 0) {
      const updatedFilter = { ...selectedFilter };
      delete updatedFilter[attribute];
      dispatch(updateSelectedFilters(updatedFilter));
    }
  };
  
  // Set multiple values for an attribute
  const setFilterValues = (attribute: string, values: string[]) => {
    if (values.length === 0) {
      // Si no hay valores, eliminar el atributo del filtro
      const updatedFilter = { ...selectedFilter };
      delete updatedFilter[attribute];
      dispatch(updateSelectedFilters(updatedFilter));
    } else {
      dispatch(setFilterAttribute({ attribute, values }));
    }
  };
  
  // Update the entire filter object
  const setAllFilters = (filters: DynamicFilter) => {
    dispatch(updateSelectedFilters(filters));
  };
  
  // Clear all filters
  const resetFilters = () => {
    dispatch(clearFilters());
  };
  
  // Apply the current filters or a specific filter object - MEJORADO
  const applyFilters = (specificFilter?: DynamicFilter) => {
    // Si se proporciona un filtro específico, lo usamos directamente
    if (specificFilter) {
      // Primero actualizamos el estado del filtro (ahora acepta propiedades opcionales)
      dispatch(updateSelectedFilters(specificFilter));
      // Luego aplicamos el filtro
      dispatch(fetchFilteredDataWithVariants(specificFilter));
    } else {
      // Usamos el filtro actual del estado
      dispatch(fetchFilteredDataWithVariants(selectedFilter));
    }
  };
  
  // Get count of filtered values for a specific attribute
  const getFilterCount = (attribute: string): number => {
    return selectedFilter[attribute]?.length || 0;
  };
  
  // Check if filter exists for attribute
  const hasFilter = (attribute: string): boolean => {
    return !!selectedFilter[attribute] && selectedFilter[attribute].length > 0;
  };
  
  // Get total number of filters applied
  const getTotalFilterCount = (): number => {
    return Object.values(selectedFilter).reduce(
      (count, values) => count + values.length, 
      0
    );
  };
  
  return {
    selectedFilter,
    filterableAttributes,
    loading,
    toggleFilterValue,
    setFilterValues,
    setAllFilters,
    resetFilters,
    applyFilters,
    getFilterCount,
    hasFilter,
    getTotalFilterCount
  };
}