/**
 * BeforeAfterSlider.jsx
 * Drag-to-reveal polishing showcase.
 * Left side = raw matte wood; Right side = glossy polished finish.
 * The divider line has a pulsing gold glow to signal interactivity.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Default placeholder images — swap with real photography
const RAW_WOOD_SRC =
  "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=900&q=80"; // raw plywood surface
const POLISHED_WOOD_SRC =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"; // glossy finished wood

export default function BeforeAfterSlider({
  beforeSrc = RAW_WOOD_SRC,
  afterSrc = POLISHED_WOOD_SRC,
  beforeLabel = "Raw Plywood",
  afterLabel = "Polished Finish",
  className = "",
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  // position as a percentage 0–100, default 50%
  const [position, setPosition] = useState(50);

  // ── Pointer helpers ───────────────────────
  const clampPercent = (val) => Math.min(100, Math.max(0, val));

  const getPercentFromEvent = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return clampPercent(((clientX - rect.left) / rect.width) * 100);
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onPointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setPosition(getPercentFromEvent(e));
    },
    [isDragging, getPercentFromEvent]
  );

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  // Attach global move/up so the drag works even outside the element
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("touchmove", onPointerMove, { passive: false });
      window.addEventListener("mouseup", onPointerUp);
      window.addEventListener("touchend", onPointerUp);
    }
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [isDragging, onPointerMove, onPointerUp]);

  // Allow clicking anywhere on the container to jump the slider
  const onContainerClick = (e) => {
    if (isDragging) return;
    setPosition(getPercentFromEvent(e));
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none cursor-col-resize ${className}`}
      style={{ aspectRatio: "16/9" }}
      onClick={onContainerClick}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
    >
      {/* ── AFTER (polished) — full width underneath ── */}
      <img
        src={afterSrc}
        alt={afterLabel}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── BEFORE (raw) — clipped on the left ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${10000 / position}%`, maxWidth: "none" }}
        />
        {/* Desaturate raw side slightly for contrast */}
        <div className="absolute inset-0 bg-stone-900/20" />
      </div>

      {/* ── Divider line ── */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Gold glow line */}
        <motion.div
          className="w-0.5 h-full"
          style={{ background: "#D4AF37" }}
          animate={{ opacity: isDragging ? 1 : [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Drag handle */}
        <motion.div
          className="absolute flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-stone-900/80 backdrop-blur-sm"
          animate={
            isDragging
              ? { scale: 1.15, boxShadow: "0 0 24px 4px rgba(212,175,55,0.5)" }
              : { scale: 1, boxShadow: "0 0 12px 2px rgba(212,175,55,0.3)" }
          }
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Double arrow icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-[#D4AF37]"
          >
            <path
              d="M6 10H14M6 10L9 7M6 10L9 13M14 10L11 7M14 10L11 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* ── Labels ── */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full bg-stone-900/70 backdrop-blur-sm text-xs font-medium tracking-widest uppercase text-stone-300 border border-stone-700">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 backdrop-blur-sm text-xs font-medium tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/40">
          {afterLabel}
        </span>
      </div>

      {/* ── Drag hint (fades out after first interaction) ── */}
      {position === 50 && !isDragging && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ delay: 1.2, duration: 2, times: [0, 0.2, 0.8, 1] }}
        >
          <span className="text-white/60 text-sm tracking-wider">
            ← Drag to reveal →
          </span>
        </motion.div>
      )}
    </div>
  );
}
