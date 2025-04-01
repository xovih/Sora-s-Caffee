const storage = typeof window === "undefined" ? null : localStorage;

const getLocalStorage = (key: string) =>
  storage ? JSON.parse(storage.getItem(key) || "{}") : null;

const setLocalStorage = (key: string, value: string) =>
  storage?.setItem(key, JSON.stringify(value));

const removeLocalStorage = (key: string) => storage?.removeItem(key);

export { getLocalStorage, setLocalStorage, removeLocalStorage };
