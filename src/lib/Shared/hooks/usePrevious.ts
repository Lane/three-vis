import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T, defaultValue?: T) {
  const ref = useRef<T | undefined>(defaultValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
