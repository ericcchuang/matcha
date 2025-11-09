import { useState, useSyncExternalStore } from "react";

export default function useLocalStorage(key, defaultVal) {
  if (defaultVal != null && !localStorage.getItem(key)) {
    localStorage.setItem(key, defaultVal);
  }
  const subscribe = (callback) => {
    const handleChange = (event) => {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener("storage", handleChange);
    };
  };

  const getSnapshot = () => {
    return localStorage.getItem(key);
  };

  const store = useSyncExternalStore(subscribe, getSnapshot);

  const setItem = (value) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: value }));
  };
  return [store, setItem];
}
