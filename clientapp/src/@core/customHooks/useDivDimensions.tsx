import { useCallback, useEffect, useRef, useState } from 'react';

export interface dimensionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  offsetWidth: number;
  offsetLeft: number;
}
type EventType = 'resize' | 'scroll';
const useDivDimensions = (events?: EventType[]) => {
  const [dimension, setDimension] = useState<DOMRect | dimensionProps | null>(
    null
  );
  const divRef = useRef<HTMLDivElement>(null);

  const updateDimensions = useCallback(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const offsetWidth = divRef.current.offsetWidth;
      const offsetLeft = divRef.current.offsetLeft;
      setDimension({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        offsetWidth,
        offsetLeft,
      });
      // const { scrollTop, clientHeight, scrollHeight } = divRef.current;
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    if (events && events.length > 0) {
      events.forEach((event) => {
        window.addEventListener(event, updateDimensions);
      });
      updateDimensions();
      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, updateDimensions);
        });
      };
    } else {
      updateDimensions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDimensions]);

  return { dimension, divRef };
};

export default useDivDimensions;
