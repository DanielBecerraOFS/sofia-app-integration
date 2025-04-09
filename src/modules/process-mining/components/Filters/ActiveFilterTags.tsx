// src/features/ProcessMining/components/Filters/ActiveFilterTags.tsx
import React from 'react';
import { ActiveFilterTag } from './ActiveFilterTag';
import { DynamicFilter } from '../../types/types';

interface ActiveFilterTagsProps {
  selectedFilter: DynamicFilter;
  toggleFilterValue: (attribute: string, value: string) => void;
  applyFilters: (specificFilter?: DynamicFilter) => void;
}

export const ActiveFilterTags: React.FC<ActiveFilterTagsProps> = ({
  selectedFilter,
  toggleFilterValue,
  applyFilters
}) => {
  // Manejar la eliminación de un filtro - SOLUCIÓN MEJORADA
  const handleRemoveFilter = (attribute: string, value: string) => {
    // Obtener los valores actuales para este atributo
    const currentValues = selectedFilter[attribute] || [];
    
    // Filtrar para eliminar el valor específico
    const newValues = currentValues.filter(v => v !== String(value));
    
    // Crear un nuevo objeto de filtro
    const newFilter = { ...selectedFilter };
    
    if (newValues.length > 0) {
      // Si quedan valores, actualizar el atributo
      newFilter[attribute] = newValues;
    } else {
      // Si no quedan valores, crear un nuevo objeto omitiendo ese atributo
      const { [attribute]: _, ...rest } = newFilter;
      
      // Actualizar el estado del filtro
      toggleFilterValue(attribute, value);
      
      // Aplicar el filtro actualizado sin el atributo
      applyFilters(rest);
      
      return;
    }
    
    // Actualizar el estado del filtro
    toggleFilterValue(attribute, value);
    
    // Aplicar el filtro actualizado
    applyFilters(newFilter);
  };

  // Si no hay filtros, no renderizar nada
  if (Object.keys(selectedFilter).length === 0) {
    return null;
  }

  // Verificar si hay valores en los filtros
  const hasValues = Object.values(selectedFilter).some(values => values && values.length > 0);
  if (!hasValues) return null;

  return (
    <div className="flex flex-wrap gap-1 px-3 py-1.5 rounded-md shadow-sm border backdrop-blur-md bg-surface border-outline-variant max-w-[80%]">
      <div className="w-full text-xs font-medium mb-1 text-on-surface">Active Filters:</div>
      {Object.entries(selectedFilter).map(([attribute, values]) => 
        values && values.map((value) => (
          <ActiveFilterTag 
            key={`${attribute}-${value}`} 
            attribute={attribute}
            value={String(value)}
            onRemove={() => handleRemoveFilter(attribute, String(value))}
          />
        ))
      )}
    </div>
  );
};