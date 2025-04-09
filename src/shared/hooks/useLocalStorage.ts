import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

/**
 * Type alias for the setter function returned by the hook.
 */
type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * Custom hook to synchronize a React state with localStorage.
 *
 * This hook retrieves an initial value from localStorage (or falls back to the provided
 * default value), maintains the state internally, and keeps localStorage in sync whenever
 * the state changes. It also listens for changes to localStorage from other browser tabs or windows.
 *
 * @param key - The key used to store the value in localStorage.
 * @param initialValue - The default value used if there is no corresponding item in localStorage.
 * @returns A tuple containing the current state and a function to update it.
 *
 * @example
 * const [user, setUser] = useLocalStorage<User>('user', { name: '', age: 0 });
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Callback to read and parse the value from localStorage.
  // If running on the server or an error occurs, it returns the initial value.
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      // SSR: Return the initial value if localStorage is unavailable.
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store the current value.
  const [storedValue, setStoredValue] = useState<T>(readValue);

  /**
   * Function to update the state and synchronize the new value with localStorage.
   *
   * It supports both direct values and updater functions (similar to useState). After setting
   * the new value, a custom event 'local-storage-change' is dispatched to notify other components.
   */
  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(`Trying to set localStorage key "${key}" in a non-browser environment.`);
        return;
      }
      try {
        // Determine the new value (supporting functional updates).
        const newValue = value instanceof Function ? value(storedValue) : value;
        // Store the new value in localStorage.
        window.localStorage.setItem(key, JSON.stringify(newValue));
        // Update the state.
        setStoredValue(newValue);
        // Dispatch a custom event to notify other components.
        window.dispatchEvent(new Event('local-storage-change'));
      } catch (error) {
        console.warn(`Error saving localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Effect to update the state when changes occur in localStorage (including from other tabs/windows).
  useEffect(() => {
    /**
     * Event handler for storage events. Updates the state if the key matches.
     */
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    // Listen for native storage events from other tabs.
    window.addEventListener('storage', handleStorageChange);
    // Listen for the custom local-storage-change event in the current tab.
    const customHandler = () => setStoredValue(readValue());
    window.addEventListener('local-storage-change', customHandler);

    // Cleanup event listeners on unmount.
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-change', customHandler);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
