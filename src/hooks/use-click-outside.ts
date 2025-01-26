import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleEvent(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
    };
  }, [callback, ref]);

  return ref;
}
