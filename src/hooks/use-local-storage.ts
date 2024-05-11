import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const isClient = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (isClient) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error("Error parsing local storage value:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [storedValue, key, isClient]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
