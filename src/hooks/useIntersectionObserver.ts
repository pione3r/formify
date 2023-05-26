import { useEffect, useRef } from "react";

export function useIntersectionObserver({
  root,
  rootMargin = "0px",
  threshold = [0, 0.5, 1],
  onIntersect,
}: useIntersectionObserverProps) {
  const target = useRef(null);

  useEffect(() => {
    if (!target.current) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { root, rootMargin, threshold }
    );
    observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
    };
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { target };
}

interface useIntersectionObserverProps {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: IntersectionObserverCallback;
}
