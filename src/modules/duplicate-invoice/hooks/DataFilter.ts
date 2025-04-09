import { useCallback, useMemo, useState } from "react";

const useDataFilter = <T>(
    initialData: T[], 
    filterConfig: Record<keyof T, (value: any) => boolean>
  ) => {
    const [filters, setFilters] = useState<Partial<Record<keyof T, any>>>({});
    
    const filteredData = useMemo(() => {
      return initialData.filter(() => 
        Object.entries(filters).every(([key, value]) => 
          value ? filterConfig[key as keyof T](value) : true
        )
      );
    }, [initialData, filters, filterConfig]);
  
    const updateFilter = useCallback((key: keyof T, value: any) => {
      setFilters(prev => ({
        ...prev,
        [key]: value
      }));
    }, []);
  
    const clearFilters = useCallback(() => {
      setFilters({});
    }, []);
  
    return {
      filteredData,
      updateFilter,
      clearFilters,
      currentFilters: filters
    };
  };

  export default useDataFilter;