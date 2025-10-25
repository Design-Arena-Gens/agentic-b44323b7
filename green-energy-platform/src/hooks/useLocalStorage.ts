import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const existing = window.localStorage.getItem(key);
    if (existing) {
      try {
        setStoredValue(JSON.parse(existing) as T);
      } catch {
        setStoredValue(initialValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const updateValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, updateValue] as const;
}
