import { useState, useEffect } from "react";

export const APPDATA = ".APPDATA";

const useLocalStorage = (name = APPDATA, initialValue = "") => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(name) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(name, value);
  }, [name, value]);

  return [value, setValue];
};

export default useLocalStorage;
