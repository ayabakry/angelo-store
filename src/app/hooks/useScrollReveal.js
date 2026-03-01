"use client";

import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (options = {}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (!options.repeat) {
            observer.unobserve(entry.target);
          }
        } else if (options.repeat) {
          setIsRevealed(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.repeat, options.threshold, options.rootMargin]);

  return [ref, isRevealed];
};

export default useScrollReveal;
