import { useState } from 'react';

/**
 *
 * @param {string} key localstorage key name
 * @param {*} initialValue any initial value to store
 * @returns [storedValue, setValue]
 */

function useLocalStorage(key, initialValue, ttl = 0) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  function getLocalStorageItem() {
    try {
      // Get from local storage by key
      const item = localStorage.getItem(key);

      if(!item) return initialValue

      const {value, expires } = JSON.parse(item)

      // Parse stored json or if none return initialValue
      return value || initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  }

  const [storedValue, setStoredValue] = useState(getLocalStorageItem());

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify({
        value: valueToStore,
        expires: new Date.getTime() + ttl
    }));
    } catch (_error) {
      // A more advanced implementation would handle the error case
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
