
import { useState, useEffect } from "react";

export const LOCAL_STORAGE = ".APPDATA";

export default function useLocalStorage (name = LOCAL_STORAGE, onUnmountDestroy = false) {
    const [value, setValue] = 
      useState(() => localStorage.getItem(name));

    useEffect(() => {
        localStorage.setItem(name, value);

        return () => onUnmountDestroy && localStorage.removeItem(name);
    }, [
        name, 
        value,
    ]);

    return val;

    function val  (...input) {
        return 0 === input.length ? 
          value : setValue(_ => input[0]);
    }
}
