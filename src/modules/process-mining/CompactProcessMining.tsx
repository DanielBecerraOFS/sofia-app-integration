
/**
 * CompactProcessMiningView - Main component for process mining visualization
 * @module ProcessMining/CompactProcessMiningView
 */

import React, { useState, useMemo, useEffect, useRef, JSX } from "react";
import { Card } from "@/shared/components/ui/card";
import { TimeUnit } from "./store/timeUnitSlice";
import { 
  VariantData, 
  FilterCriteria, 
  Attribute,
  VariantAPIResultRow
} from "./types/types";

// Importar hooks
import { useTimeConversion } from "./hooks/useTimeConversion";
import { useProcessMining } from "./hooks/useProcessMining";
import { useProcessMiningFilters } from "./hooks/useProcessMiningFilters";

// Importar componentes UI
import { Toolbar } from './components/Toolbar/Toolbar';
import { LoadingIndicator } from './components/ui/LoadingIndicator';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { ProcessGraph } from './components/Graph/ProcessGraph';
import { VariantPanel } from './components/VariantPanel/VariantPanel';
import { VariantPanelToggleButton } from './components/VariantPanel/VariantPanelToggleButton';
import { FilterPanel } from './components/FilterPanel/FilterPanel';
import { TimeUnitDropdown } from './components/Toolbar/TimeUnitDropdown';
import { AttributeListDropdown } from './components/FilterPanel/AttributeListDropdown';


/**
 * @typedef {Object} VariantData
 * @property {string} value - Unique ID of the variant
 * @property {string} label - Description of the variant's activities
 * @property {number} frequency - Frequency of the variant (percentage)
 * @property {number} avg_time - Average time of the variant in seconds
 * @property {string} [displayName] - Name displayed in the UI
 */


/**
 * Transforms variant data from the API format to the format required by the components.
 * 
 * @param {import('./types/types').VariantAPIResultRow} variant - Variant in API format
 * @returns {VariantData} Variant transformed for component usage
 */

const transformVariant = (variant: VariantAPIResultRow): VariantData => ({
  value: String(variant.id),
  label: variant.activities,
  frequency: variant.percentage,
  avg_time: variant.avg_time
});

/**
 * CompactProcessMiningView - Main component for process visualization and analysis.
 * 
 * This component allows users to visualize business process flows, filter data by various attributes,
 * select variants, and analyze metrics.
 * 
 * @example
 * return (
 *   <CompactProcessMiningView />
 * )
 */

export function CompactProcessMining(): JSX.Element {
  
  /**
   * Hook para procesar datos de minería de procesos
   * @type {import('@/hooks/useProcessMining').UseProcessMiningReturn}
   */

  const {
    metadata,
    graphData,
    loading,
    error,
    loadMetadata
  } = useProcessMining();

  /**
   * Hook to manage dynamic filters.
   * @type {import('@/hooks/useProcessMiningFilters').UseProcessMiningFiltersReturn}
   */

  const {
    selectedFilter,
    toggleFilterValue,
    setFilterValues,
    resetFilters,
    applyFilters
  } = useProcessMiningFilters();

  /**
   * Hook for converting time units.
   * @type {import('./hooks/useTimeConversion').UseTimeConversionReturn}
   */

  const { timeUnit, changeTimeUnit, convertFromSeconds, getUnitLabel } = useTimeConversion();

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isVariantPanelOpen, setIsVariantPanelOpen] = useState<boolean>(false);
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isTimeUnitOpen, setIsTimeUnitOpen] = useState<boolean>(false);
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);
  /** @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} */
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [sortOrder, setSortOrder] = useState<"frequency" | "duration">("frequency");

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [currentAttributeIndex, setCurrentAttributeIndex] = useState<number>(0);
  const [isAttributeListOpen, setIsAttributeListOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<FilterCriteria[]>([]);
  const [tempFilter, setTempFilter] = useState<Partial<FilterCriteria>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  
  // Refs
  /** @type {React.RefObject<HTMLDivElement>} */
  const componentRef = useRef<HTMLDivElement>(null);
  /** @type {React.RefObject<HTMLDivElement>} */
  const timeUnitButtonRef = useRef<HTMLDivElement>(null);
  /** @type {React.RefObject<HTMLDivElement>} */
  const filterButtonRef = useRef<HTMLDivElement>(null);
  /** @type {React.RefObject<HTMLDivElement>} */
  const attributeSelectorRef = useRef<HTMLDivElement>(null);
  
  // Get the current attribute
  const currentAttribute = attributes[currentAttributeIndex] || { name: "", type: "", distincts: [] };
  
  /**
   * Loads metadata when the component initializes.
   */
  useEffect(() => {
    loadMetadata();
  }, []);

  
  useEffect(() => {
    if (metadata) {
      applyFilters();
      
      // Set up attributes for advanced filter if available
      if (metadata.attributes && Array.isArray(metadata.attributes)) {
        setAttributes(metadata.attributes);
        if (metadata.attributes.length > 0 && !tempFilter.attributeName) {
          setTempFilter({
            attributeName: metadata.attributes[0].name
          });
        }
      }
    }
  }, [metadata]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Handle time unit dropdown
      if (isTimeUnitOpen && 
          timeUnitButtonRef.current && 
          !timeUnitButtonRef.current.contains(event.target as Node) &&
          !document.querySelector('.time-unit-dropdown')?.contains(event.target as Node)) {
        setIsTimeUnitOpen(false);
      }
      
      // Handle attribute list dropdown
      if (isAttributeListOpen && 
          attributeSelectorRef.current && 
          !attributeSelectorRef.current.contains(event.target as Node) &&
          !document.querySelector('.attribute-list-dropdown')?.contains(event.target as Node)) {
        setIsAttributeListOpen(false);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [isTimeUnitOpen, isAttributeListOpen]);
  
  /**
   * Synchronizes selected variants when the graph data changes.
   * 
   * Maintains the selection of variants consistent when filters are applied that might have
   * removed previously selected variants.
   */

  useEffect(() => {
    // Verificar si tenemos datos de variantes
    if (graphData?.variants) {
      // Obtener los IDs de variantes disponibles después de aplicar filtros
      const availableVariantIds = graphData.variants.map(v => String(v.id));
      
      // Filtrar variantes seleccionadas para mantener solo las que siguen disponibles
      const validSelectedVariants = selectedVariants.filter(id => 
        availableVariantIds.includes(id)
      );
      
      // Verificar si hay cambios en las variantes seleccionadas
      if (JSON.stringify(validSelectedVariants) !== JSON.stringify(selectedVariants)) {
        // Actualizar el estado de variantes seleccionadas
        setSelectedVariants(validSelectedVariants);
        
        // Si también cambiaron los filtros, actualizar el estado de filtros
        if (selectedFilter.var && 
            JSON.stringify(selectedFilter.var) !== JSON.stringify(validSelectedVariants)) {
          setFilterValues('var', validSelectedVariants);
        }
      }
    }
  }, [graphData?.variants, selectedFilter]);
  
  /**
   * Transform variants for the chart
   * @type {VariantData[]}
   */
  const variantData: VariantData[] = useMemo(() => {
    if (!graphData?.variants) return [];
    return (graphData.variants || []).map(transformVariant);
  }, [graphData]);
  
  /**
   * Filter and sort variants for display
   * @type {VariantData[]}
   */
  const displayVariants: VariantData[] = useMemo(() => {
    if (!variantData || variantData.length === 0) return [];
    
    return [...variantData]
      .sort((a, b) => 
        sortOrder === "frequency"
          ? b.frequency - a.frequency
          : (Number(b.avg_time) || 0) - (Number(a.avg_time) || 0)
      )
      .map((v, i) => ({
        ...v,
        displayName: `Variant ${i + 1}`
      }))
      .slice(0, 10); // Show top 10 in the sidebar
  }, [variantData, sortOrder]);

  /**
   * Calculate total percentage of selected variants
   * @type {number}
   */
  const totalSelectedPercentage = useMemo(() => {
    return displayVariants
      .filter((v) => selectedVariants.includes(v.value))
      .reduce((acc, cur) => acc + Math.round(cur.frequency), 0);
  }, [displayVariants, selectedVariants]);

  /**
   * Handles variant selection and updates the filters.
   * 
   * @param {string[]} selectedVariantIds - Array of selected variant IDs
   */
  const handleVariantFilter = (selectedVariantIds: string[]): void => {
  if (!graphData?.variants) return;

  // Si hay variantes seleccionadas, actualizar el filtro
  if (selectedVariantIds.length > 0) {
    const updatedFilter = {
      ...selectedFilter,
      var: selectedVariantIds
    };
    
    // Actualizar el estado de variantes seleccionadas
    setSelectedVariants(selectedVariantIds);
    
    // Aplicar el filtro actualizado directamente
    applyFilters(updatedFilter);
    
    // Actualizar el estado de filtros para mantener consistencia
    setFilterValues('var', selectedVariantIds);
  } 
  // Si no hay variantes seleccionadas, eliminar la propiedad var
  else {
    // Crear un nuevo objeto omitiendo la propiedad 'var'
    const { var: _, ...restFilter } = { ...selectedFilter };
    
    // Actualizar el estado de variantes seleccionadas
    setSelectedVariants([]);
    
    // Aplicar el filtro sin la propiedad var
    applyFilters(restFilter);
    
    // Actualizar el estado de filtros
    setFilterValues('var', []);
  }
};

  /**
   * Toggle variant selection.
   * 
   * @param {string} value - ID of the variant to toggle
   * @param {React.MouseEvent} [event] - Click event
   */
  const toggleVariant = (value: string, event?: React.MouseEvent): void => {
    if (event) {
      event.stopPropagation();
    }
    
    const newSelection = selectedVariants.includes(value)
      ? selectedVariants.filter((v) => v !== value)
      : [...selectedVariants, value];
    handleVariantFilter(newSelection);
  };

  /**
   * Clears all filters and resets the state.
   */
  const clearFilters = (): void => {
    // Limpiar estado de filtros en el store
    resetFilters();
    
    // Limpiar selección de variantes local
    setSelectedVariants([]);
    
    // Limpiar filtros activos UI
    setActiveFilters([]);
    
    // Aplicar un objeto de filtro vacío explícitamente
    // Sin usar delete, simplemente pasamos un objeto vacío
    applyFilters({});
  };

  // Function to change time unit
  const handleTimeUnitChange = (unit: TimeUnit, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    changeTimeUnit(unit);
    setIsTimeUnitOpen(false);
  };

  // Toggle compact mode
  const toggleCompactMode = () => {
    setIsCompactMode(!isCompactMode);
  };

  // Get filtered distinct values, excluding already selected ones
  const getFilteredDistincts = () => {
    if (!currentAttribute.distincts) return [];
    
    // Get current selected values for this attribute
    const selectedValues = selectedFilter[currentAttribute.name] || [];
    
    // Filter by search term and exclude already selected values
    const filteredValues = currentAttribute.distincts.filter(value => 
      !selectedValues.includes(String(value)) && 
      (searchTerm ? String(value).toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
    
    return filteredValues.slice(0, 100); // Limit to prevent performance issues
  };

  // Calculate attribute selector position
  const getAttributeSelectorPosition = () => {
    if (!attributeSelectorRef.current) return { top: 0, left: 0 };
    const rect = attributeSelectorRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    };
  };

  // Calculate time unit dropdown position
  const getTimeUnitDropdownPosition = () => {
    if (!timeUnitButtonRef.current) return { top: 0, left: 0 };
    const rect = timeUnitButtonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    };
  };

  // Generate a unique ID for a filter
  const generateFilterId = () => `filter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Add a new filter
  const addFilter = () => {
    if (!tempFilter.attributeName || !tempFilter.operator) return;
    
    const newFilter: FilterCriteria = {
      ...tempFilter as FilterCriteria,
      id: generateFilterId()
    };
    
    setActiveFilters([...activeFilters, newFilter]);
    
    // Add to the dynamic filter system
    if (newFilter.value) {
      const currentValues = selectedFilter[newFilter.attributeName] || [];
      if (!currentValues.includes(String(newFilter.value))) {
        toggleFilterValue(newFilter.attributeName, String(newFilter.value));
      }
    }
    
    // Reset temp filter
    setTempFilter({
      attributeName: currentAttribute.name
    });
  };

  // Apply all filters
  const handleApplyFilters = () => {
    // Apply the filters through the hook
    applyFilters();
    
    // Close the filter panel
    setIsFilterOpen(false);
  };

  // Navigate to the next attribute
  const nextAttribute = () => {
    setCurrentAttributeIndex((prevIndex) => 
      prevIndex + 1 >= attributes.length ? 0 : prevIndex + 1
    );
    // Reset temp filter for new attribute
    setTempFilter({
      attributeName: attributes[(currentAttributeIndex + 1) % attributes.length]?.name
    });
  };

  // Navigate to the previous attribute
  const prevAttribute = () => {
    setCurrentAttributeIndex((prevIndex) => 
      prevIndex - 1 < 0 ? attributes.length - 1 : prevIndex - 1
    );
    // Reset temp filter for new attribute
    const newIndex = currentAttributeIndex - 1 < 0 ? attributes.length - 1 : currentAttributeIndex - 1;
    setTempFilter({
      attributeName: attributes[newIndex]?.name
    });
  };

  // Select a specific attribute
  const selectAttribute = (index: number) => {
    setCurrentAttributeIndex(index);
    setIsAttributeListOpen(false);
    // Reset temp filter for new attribute
    setTempFilter({
      attributeName: attributes[index]?.name
    });
  };

  // Toggle toolbar functions
  const toggleFilterPanel = () => setIsFilterOpen(!isFilterOpen);
  const toggleVariantPanel = () => setIsVariantPanelOpen(!isVariantPanelOpen);
  const toggleTimeUnitDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTimeUnitOpen(!isTimeUnitOpen);
  };

  // Get count of all applied filters
  const getFilterCount = (): number => {
    return Object.keys(selectedFilter).reduce((count, key) => {
      return count + (selectedFilter[key]?.length || 0);
    }, 0);
  };

  return (
    <div 
      ref={componentRef}
      className="w-full h-full"
    >
      <Card 
        className="w-full h-full overflow-hidden relative bg-surface text-on-surface border-outline-variant" 
      >
        {/* Toolbar */}
        <Toolbar 
          isCompactMode={isCompactMode}
          isFilterOpen={isFilterOpen}
          isTimeUnitOpen={isTimeUnitOpen}
          timeUnit={timeUnit}
          selectedVariants={selectedVariants}
          isVariantPanelOpen={isVariantPanelOpen}
          filterCount={getFilterCount()}
          totalSelectedPercentage={totalSelectedPercentage}
          timeUnitButtonRef={timeUnitButtonRef}
          filterButtonRef={filterButtonRef}
          toggleCompactMode={toggleCompactMode}
          toggleFilterPanel={toggleFilterPanel}
          toggleVariantPanel={toggleVariantPanel}
          toggleTimeUnitDropdown={toggleTimeUnitDropdown}
          clearFilters={clearFilters}
        />

        {/* Main container */}
        <div className="relative flex h-[calc(100%-52px)] min-h-[100svh]">
          {/* Process mining graph (main area) */}
          <div className="flex-grow relative overflow-hidden">
            {loading ? (
              <LoadingIndicator />
            ) : error ? (
              <ErrorMessage error={error} />
            ) : (
              <ProcessGraph 
                graphData={graphData}
                selectedFilter={selectedFilter}
                selectedVariants={selectedVariants}
                totalSelectedPercentage={totalSelectedPercentage}
                isVariantPanelOpen={isVariantPanelOpen}
                toggleFilterValue={toggleFilterValue}
                applyFilters={applyFilters}
              />
            )}
          </div>

          {/* Variant sidebar panel */}
          {isVariantPanelOpen && (
            <VariantPanel 
              displayVariants={displayVariants}
              selectedVariants={selectedVariants}
              sortOrder={sortOrder}
              totalSelectedPercentage={totalSelectedPercentage}
              toggleVariant={toggleVariant}
              setSortOrder={setSortOrder}
              setSelectedVariants={setSelectedVariants}
              setIsVariantPanelOpen={setIsVariantPanelOpen}
              convertFromSeconds={convertFromSeconds}
              getUnitLabel={getUnitLabel}
            />
          )}
          
          {/* Button to open variant panel when closed */}
          {!isVariantPanelOpen && (
            <VariantPanelToggleButton 
              onClick={toggleVariantPanel} 
            />
          )}
          
          {/* Filter panel */}
          {isFilterOpen && (
            <FilterPanel 
              attributes={attributes}
              currentAttribute={currentAttribute}
              currentAttributeIndex={currentAttributeIndex}
              attributeSelectorRef={attributeSelectorRef}
              tempFilter={tempFilter}
              searchTerm={searchTerm}
              selectedFilter={selectedFilter}
              isAttributeListOpen={isAttributeListOpen}
              setIsAttributeListOpen={setIsAttributeListOpen}
              setCurrentAttributeIndex={setCurrentAttributeIndex}
              setTempFilter={setTempFilter}
              setSearchTerm={setSearchTerm}
              addFilter={addFilter}
              resetFilters={resetFilters}
              handleApplyFilters={handleApplyFilters}
              setIsFilterOpen={setIsFilterOpen}
              toggleFilterValue={toggleFilterValue}
              getFilteredDistincts={getFilteredDistincts}
              nextAttribute={nextAttribute}
              prevAttribute={prevAttribute}
            />
          )}
        </div>
      </Card>
      
      {/* Dropdowns portales */}
      {isAttributeListOpen && attributes.length > 0 && (
        <AttributeListDropdown 
          attributes={attributes}
          currentAttributeIndex={currentAttributeIndex}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectAttribute={selectAttribute}
          position={getAttributeSelectorPosition()}
          width={attributeSelectorRef.current?.offsetWidth}
        />
      )}
      
      {isTimeUnitOpen && (
        <TimeUnitDropdown 
          timeUnit={timeUnit}
          handleTimeUnitChange={handleTimeUnitChange}
          position={getTimeUnitDropdownPosition()}
        />
      )}
    </div>
  );
}