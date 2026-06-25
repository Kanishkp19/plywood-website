/**
 * SplitText.jsx
 * GSAP-powered text reveal component.
 * Splits a text string into individual words wrapped in overflow-hidden spans
 * and slides them up with a spring-like stagger delay as they enter the viewport.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ children, className = "", delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof children !== "string") return;

    // Check if device supports touch/mobile to fall back gracefully without animations
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const container = containerRef.current;

    if (isMobile) {
      container.innerText = children;
      return;
    }

    const words = children.split(" ");
    container.innerHTML = "";

    // Create masked DOM structure for each word
    words.forEach((word) => {
      const wrapper = document.createElement("span");
      wrapper.className = "inline-block overflow-hidden mr-[0.22em] py-[0.1em] -my-[0.1em]";
      
      const inner = document.createElement("span");
      inner.className = "inline-block translate-y-[110%] opacity-0";
      inner.innerText = word;

      wrapper.appendChild(inner);
      container.appendChild(wrapper);
    });

    const innerSpans = container.querySelectorAll("span > span");

    // GSAP ScrollTrigger timeline to animate text slide-up
    const animation = gsap.fromTo(
      innerSpans,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.03,
        delay: delay,
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );

    // Clean up animation triggers on unmount
    return () => {
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
      animation.kill();
    };
  }, [children, delay]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
