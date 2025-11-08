import { useState, useSyncExternalStore } from "react";

export default function useLocalStorage(key) {
  const subscribe = (callback) => {
    const handleChange = (event) => {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener("storage", subscribe);
    return () => {
      window.removeEventListener("storage", subscribe);
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
