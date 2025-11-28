// src/hooks/useInfiniteScroll.ts
import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll() {
  const [isNearBottom, setIsNearBottom] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIsNearBottom(true);
        });
      },
      { root: null, threshold: 0.1 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return { ref, isNearBottom, setIsNearBottom };
}
