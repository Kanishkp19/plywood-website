/**
 * HeroSection.jsx
 * Full-viewport hero with staggered text mask reveals and a background video loop.
 * The video placeholder can be swapped with a real warehouse/timber loop in production.
 * Dark overlay ensures cream typography stays readable over any footage.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Layers } from "lucide-react";
import SplitText from "../ui/SplitText";

// ── Animation variants ──────────────────────
const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

// Mask-reveal: text slides up from below an overflow:hidden clip
const REVEAL_ITEM = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Premium stacked plywood boards showing layered edges and rich wood grains
const HERO_BG =
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1800&q=80";

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: hero content drifts up slowly as user scrolls
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.65, 0.9]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
    >
      {/* ── Background image / video slot ── */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          y: bgY,
          scale: 1.1, // pre-scale to prevent white edges during parallax
        }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-[#1a110d]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gold grain accent at the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{ y: contentY }}
      >
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow label */}
          <div className="overflow-hidden mb-6">
            <motion.div variants={REVEAL_ITEM} className="flex items-center gap-3">
              <div className="w-10 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase font-bold">
                Jodhpur's Premier B2B Timber Wholesale
              </span>
            </motion.div>
          </div>

          {/* Main headline — each line is a separate overflow:hidden mask */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6">
            {["Rajasthan's", "Trusted Supply", "Chain for Wood."].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  variants={REVEAL_ITEM}
                  className={`block ${
                    i === 2
                      ? "text-[#D4AF37]"
                      : "text-[#FDFBF7]"
                  }`}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Sub-headline */}
          <div className="mb-8 overflow-hidden">
            <motion.p
              variants={REVEAL_ITEM}
              className="text-stone-200 text-base sm:text-lg max-w-xl leading-relaxed font-normal"
            >
              <SplitText delay={0.6}>
                Over 500+ retailers and contractors trust us every month. Marine ply, blockboards, flush doors, and premium veneers — all from one warehouse, with same-week delivery across Rajasthan.
              </SplitText>
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-4">
            <a
              href="#configurator"
              data-magnetic
              className="btn-premium-primary text-sm px-7 py-3.5 shadow-xl shadow-[#D4AF37]/15"
            >
              <Layers size={16} />
              Explore Finishes
            </a>
            <a
              href="#retailer-hub"
              data-magnetic
              className="btn-premium-secondary text-sm px-7 py-3.5 shadow-xl shadow-black/30"
            >
              Become a Dealer Partner
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-stone-400 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#D4AF37]" />
        </motion.div>
      </motion.div>

      {/* ── Stock status badge ── */}
      <motion.div
        className="absolute top-16 right-6 sm:right-10 lg:right-16 z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5, type: "spring" }}
      >
        <div className="bg-emerald-900/60 border border-emerald-500/30 backdrop-blur-sm rounded-full px-3.5 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 text-xs font-medium tracking-wide">
            Massive Stock Available
          </span>
        </div>
      </motion.div>
    </section>
  );
}
