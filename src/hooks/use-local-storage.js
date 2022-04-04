
import { useState, useEffect } from "react";

export const LOCAL_STORAGE = ".APPDATA";

export default function useLocalStorage (name = LOCAL_STORAGE, onUnmountDestroy = false) {
    const [value, setValue] = useState(localStorage.getItem(name));

    useEffect(() => {
        localStorage.setItem(name, value);
    }, [name, value]);

    return [value, setValue];

}
