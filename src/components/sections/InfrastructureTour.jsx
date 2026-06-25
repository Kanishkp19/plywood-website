/**
 * InfrastructureTour.jsx
 * Section 4: Masonry gallery showcasing the warehouse, machinery, and fleet.
 * Upgraded with GSAP ScrollTrigger parallax grid drifts and magnetic CTA buttons.
 * Cards reveal a glassmorphic tooltip with a technical detail on hover.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ── Gallery data ──────────────────────────────
const GALLERY = [
  {
    id: "warehouse",
    title: "40,000 sq ft Warehouse",
    tag: "Storage",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80",
    detail: "Climate-managed storage ensures zero warping or delamination. Stock is rotated on FIFO so you always receive the freshest batch.",
    size: "large", // spans 2 cols + 2 rows
  },
  {
    id: "hotpress",
    title: "Hydraulic Hot Press",
    tag: "Machinery",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80",
    detail: "200-tonne hydraulic press applies uniform heat and pressure. Zero core gaps — every sheet meets IS:710 bonding strength.",
    size: "small",
  },
  {
    id: "timber",
    title: "500+ Tonne Live Stock",
    tag: "Inventory",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=80",
    detail: "500+ tonnes of certified plywood, veneers, and blockboards on hand at all times. No back-order delays.",
    size: "small",
  },
  {
    id: "fleet",
    title: "8-Truck Dispatch Fleet",
    tag: "Logistics",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80",
    detail: "Our own fleet — no third-party delays. Daily dispatches within Jodhpur, bi-weekly routes to outstation retailers.",
    size: "small",
  },
  {
    id: "cnc",
    title: "CNC Cutting Bay",
    tag: "Services",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=700&q=80",
    detail: "Precision panel saw and CNC router. Send us your cutting list — we ship ready-to-assemble panels, no site wastage.",
    size: "small",
  },
  {
    id: "polish",
    title: "Polishing Workshop",
    tag: "Finishing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80",
    detail: "In-house PU, Matte, and Gloss finishing since 2003. We handle the full treatment cycle before the stock leaves our gate.",
    size: "small",
  },
  {
    id: "qc",
    title: "Quality Control Lab",
    tag: "Certification",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
    detail: "Every batch tested for bonding strength, moisture content, and surface defects before dispatch. ISI + BWR certified.",
    size: "small",
  },
];

// ── Card component ────────────────────────────
function TourCard({ item, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = item.size === "large";

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden group cursor-pointer w-full h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        loading="lazy"
      />

      {/* Always-on gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/85 via-[#1C1714]/20 to-transparent" />

      {/* Tag badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
          {item.tag}
        </span>
      </div>

      {/* Zoom icon */}
      <motion.div
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ZoomIn size={16} className="text-white" />
      </motion.div>

      {/* Base title (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-white font-extrabold text-base sm:text-lg lg:text-xl leading-tight">{item.title}</p>
      </div>

      {/* Hover glassmorphic tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="bg-[#1C1714]/85 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <p className="text-[#D4AF37] text-xs tracking-widest uppercase font-extrabold mb-1.5">
                {item.tag}
              </p>
              <p className="text-white font-bold text-base sm:text-lg mb-1.5">{item.title}</p>
              <p className="text-stone-200 text-sm leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────
export default function InfrastructureTour() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip scroll animations on touch/mobile to preserve native frame rendering
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    const container = containerRef.current;
    const cards = container.querySelectorAll(".tour-card-parallax");

    cards.forEach((card, index) => {
      // Alternate drift directions: even index drifts up, odd index drifts down
      const speed = index % 2 === 0 ? -35 : 35;

      gsap.fromTo(
        card,
        { y: 0 },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    // Cleanup triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === container || 
          (trigger.vars.trigger && trigger.vars.trigger.classList && trigger.vars.trigger.classList.contains("tour-card-parallax"))
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="infrastructure" className="relative py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm tracking-[0.25em] uppercase font-bold">
                Our Facility
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FDFBF7] leading-tight">
              Don't take our word for it.{" "}
              <span className="text-[#D4AF37]">See our scale.</span>
            </h2>
            <p className="text-stone-200 mt-6 text-xl leading-relaxed">
              Mandore Road, Jodhpur. 40,000 sq ft of precision-managed timber operations — warehouse, machinery, and transport all under one roof. Hover to explore.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 shrink-0">
            {[
              { num: "40K", label: "sq ft" },
              { num: "8",   label: "Trucks" },
              { num: "25+", label: "Years" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl sm:text-5xl font-black text-[#D4AF37] leading-none">{num}</p>
                <p className="text-stone-200 text-sm sm:text-base font-bold mt-2 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Masonry grid ── */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[180px] overflow-visible"
        >
          {/* Large card — warehouse */}
          <div 
            className="col-span-1 sm:col-span-2 row-span-2 tour-card-parallax"
            style={{ minHeight: "380px" }}
          >
            <TourCard item={GALLERY[0]} delay={0} />
          </div>

          {/* Small cards */}
          {GALLERY.slice(1).map((item, i) => (
            <div 
              key={item.id} 
              className="tour-card-parallax"
              style={{ minHeight: "200px" }}
            >
              <TourCard item={item} delay={(i + 1) * 0.08} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-stone-200 text-base md:text-lg mb-5 font-semibold">
            Want to visit our warehouse before committing to an order?
          </p>
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20visit%20to%20your%20warehouse%20at%20Mandore%20Road%2C%20Jodhpur."
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="btn-premium-secondary px-8 py-4.5 rounded-full text-base font-bold"
          >
            Schedule a Warehouse Visit →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
