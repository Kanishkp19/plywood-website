/**
 * CustomCursor.jsx
 * High-performance liquid cursor and magnetic interaction handler.
 * Tracks mouse using GSAP quickTo physics and implements global event
 * delegation to draw click targets and pull buttons toward the mouse.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices for performance and native interactions
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const cursor = cursorRef.current;
    
    // QuickTo functions for sub-pixel smooth, high-performance tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    // Center the cursor offset (ring is 24px wide, so offset by 12px)
    const handleMouseMove = (e) => {
      xTo(e.clientX - 12);
      yTo(e.clientY - 12);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ── Global Event Delegation for Interactive Hover Effects ──
    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Expand cursor on links, buttons, and clickable elements
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.hasAttribute("data-clickable") ||
        target.closest("[data-clickable]")
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.hasAttribute("data-clickable") ||
        target.closest("[data-clickable]")
      ) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // ── Global Event Delegation for Magnetic Button Pull Physics ──
    const activeMagneticElements = new Map();

    const handleMagneticMove = (e) => {
      const target = e.target.closest("[data-magnetic]");
      if (!target) return;

      // Get dimensions of the button
      let rect = activeMagneticElements.get(target);
      if (!rect) {
        rect = target.getBoundingClientRect();
        activeMagneticElements.set(target, rect);
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Distance from mouse to center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Pull strength (factor of 0.3)
      gsap.to(target, {
        x: deltaX * 0.35,
        y: deltaY * 0.35,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });

      // Stretch cursor slightly towards target center for liquid effect
      gsap.to(cursor, {
        scale: 1.6,
        backgroundColor: "rgba(212, 175, 55, 0.08)",
        borderColor: "rgba(212, 175, 55, 0.8)",
        duration: 0.2
      });
    };

    const handleMagneticLeave = (e) => {
      const target = e.target.closest("[data-magnetic]");
      if (!target) return;

      activeMagneticElements.delete(target);

      // Spring the button back to its origin
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto"
      });

      // Reset cursor size
      gsap.to(cursor, {
        scale: 1.0,
        backgroundColor: "rgba(212, 175, 55, 0)",
        borderColor: "rgba(212, 175, 55, 0.6)",
        duration: 0.3
      });
    };

    // Attach listeners to document for magnetic delegation
    document.addEventListener("mousemove", (e) => {
      if (e.target.closest("[data-magnetic]")) {
        handleMagneticMove(e);
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("[data-magnetic]")) {
        handleMagneticLeave(e);
      }
    });

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };
    const handleMouseEnterWindow = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#D4AF37]/60 pointer-events-none z-50 transition-transform duration-150 ease-out ${
        isHovered ? "scale-[1.8] bg-[#D4AF37]/10 border-[#D4AF37]" : ""
      }`}
      style={{
        transformOrigin: "center center",
        transform: "translate3d(0, 0, 0)", // Hardware acceleration
      }}
    />
  );
}
