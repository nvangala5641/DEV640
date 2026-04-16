import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Get initial state (Lazy initialization)
  // Update this part inside your useLocalStorage hook
const [state, setState] = useState<T>(() => {
  if (typeof window === "undefined") return initialValue instanceof Function ? initialValue() : initialValue;

  try {
    const item = window.localStorage.getItem(key);
    if (!item) return initialValue instanceof Function ? initialValue() : initialValue;

    try {
      return JSON.parse(item);
    } catch {
      return item as unknown as T;
    }
  } catch {
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
});

  // Sync changes to LocalStorage and notify other components
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));

      // Dispatch a custom event so other components in the SAME window can update
      window.dispatchEvent(new CustomEvent("local-storage", { detail: { key, value: state } }));
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, state]);

  //Listen for changes from OTHER windows/tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [state, setState] as const;
}