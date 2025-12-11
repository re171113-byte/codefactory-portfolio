"use client";

import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
  prefersReducedMotion: boolean;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  prefersReducedMotion: false,
});

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion 감지
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReduced = mediaQuery.matches;
    setPrefersReducedMotion(prefersReduced);

    // 모션 감소 선호 시 스무스 스크롤 비활성화
    if (prefersReduced) {
      return;
    }

    // Lenis 인스턴스 생성
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // 애니메이션 루프
    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // mediaQuery 변경 감지
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        lenisInstance.destroy();
        setLenis(null);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // 클린업
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback((
    target: string | number | HTMLElement,
    options?: object
  ) => {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    }
  }, [lenis]);

  return (
    <LenisContext.Provider value={{ lenis, scrollTo, prefersReducedMotion }}>
      {children}
    </LenisContext.Provider>
  );
}
