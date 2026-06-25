/**
 * StatCounter.jsx
 * Animated count-up number that triggers when the element enters the viewport.
 * Used in the Trust Matrix section to display scale statistics.
 */

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * @param {number}  end         - Target number to count up to
 * @param {number}  duration    - Animation duration in milliseconds
 * @param {string}  suffix      - Text appended after the number (e.g. "+", "Cr", "%")
 * @param {string}  prefix      - Text prepended before the number (e.g. "₹")
 * @param {boolean} once        - If true, only animates once per mount
 */
export default function StatCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  once = true,
  className = "",
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
