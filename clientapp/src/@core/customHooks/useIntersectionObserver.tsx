import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  root?: HTMLElement | null;
  rootMargin?: string;
  delay?: number;
  getProperties?: boolean;
}

const useIntersectionObserver = (
  options: UseInViewOptions = {}
): {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
  allProperties: any;
  InView: any;
} => {
  const [inView, setInView] = useState(false);
  const [allProperties, setAllProperties] = useState({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof window.IntersectionObserver === 'undefined') {
      // Fallback if IntersectionObserver is not supported
      setInView(true); // Or false, depending on your default state
      return;
    }
    const observerOptions: IntersectionObserverInit = {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    };

    const observer = new IntersectionObserver((entries) => {
      // console.log("Observer callback triggered", entries);

      if (entries[0]) {
        const isIntersecting = entries[0].isIntersecting;
        const delay = options.delay ?? 100;
        const getProperties = options.getProperties ?? false;
        if (delay) {
          setTimeout(() => {
            setInView(isIntersecting);
            if (getProperties) {
              setAllProperties(isIntersecting);
            }
          }, delay);
        } else {
          setInView(isIntersecting);
          if (getProperties) {
            setAllProperties(isIntersecting);
          }
        }
      }
    }, observerOptions);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [
    options.threshold,
    options.root,
    options.rootMargin,
    options.delay,
    options.getProperties,
  ]);
  const InView = ({ children, onChange }: any) => {
    const { ref } = useIntersectionObserver();
    console.log(inView);
    return (
      <div ref={ref} onChange={onChange(inView)}>
        {children}
      </div>
    );
  };
  return { ref, inView, allProperties, InView };
};

export default useIntersectionObserver;

// How threshold Works

//     Single Number: If you specify a single number (e.g., 0.5), the callback will be triggered when at least 50% of the target element is visible in the viewport (or the root element if specified).
//     Array of Numbers: If you provide an array of numbers (e.g., [0, 0.5, 1]), the callback will be triggered whenever the visibility of the target element crosses any of the specified thresholds. This means the callback will fire multiple times as the element's visibility changes.
