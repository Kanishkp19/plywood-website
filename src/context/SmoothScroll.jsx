/**
 * SmoothScroll.jsx
 * Global scroll provider. Uses Lenis for smooth inertia scrolling
 * and integrates it directly with GSAP ScrollTrigger to ensure
 * frame-by-frame synchronization of scroll animations.
 */

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Disable smooth scroll on mobile devices for battery and native scroll performance
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Update ScrollTrigger on every Lenis scroll tick
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Hook Lenis into GSAP's high-performance ticker
    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef.current}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
