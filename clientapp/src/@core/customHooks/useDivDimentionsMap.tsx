import { useCallback, useEffect, useRef, useState } from 'react';

export interface DimensionProps {
  offsetWidth: number;
  offsetLeft: number;
}

const useDivDimensionsMap = () => {
  const [dimensions, setDimensions] = useState<Map<string, DimensionProps>>(
    new Map()
  );
  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

  const updateDimensions = useCallback(() => {
    const newDimensions = new Map<string, DimensionProps>();
    refs.current.forEach((ref, key) => {
      if (ref) {
        const { offsetWidth, offsetLeft } = ref;
        newDimensions.set(key, { offsetWidth, offsetLeft });
      }
    });
    setDimensions(newDimensions);
  }, []);

  useEffect(() => {
    updateDimensions(); // Initial update
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  return { dimensions, refs };
};

export default useDivDimensionsMap;
