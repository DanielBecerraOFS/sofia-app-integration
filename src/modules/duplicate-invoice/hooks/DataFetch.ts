import { useCallback, useEffect, useState } from "react";

// Crear un hook personalizado para manejar fetching de datos
const useDataFetch = <T>(
    fetchFn: () => Promise<T>, 
    initialState: T,
    onError?: (error: any) => void
  ) => {
    const [data, setData] = useState<T>(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    const fetchData = useCallback(async () => {
      setLoading(true);
      try {
        const result = await fetchFn();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        onError?.(err);
      } finally {
        setLoading(false);
      }
    }, [fetchFn, onError]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    return { data, loading, error, refetch: fetchData };
  };


  export default useDataFetch;