import { useState, useCallback } from 'react';

export const useDebounceCallback = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        func(...args);
      }, delay);
      setTimer(newTimer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return debouncedCallback;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: any;

  return function (...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

//use  debounce and useDebounce // same procedure
//   const debouncedFunction = useDebounceCallback((value: string) => {
//     console.log(value);
//   }, 500);
//     debouncedFunction(value);

//   const debouncedFunction = useDebounceCallback(() => {
//     ...contents
//   }, 500);
