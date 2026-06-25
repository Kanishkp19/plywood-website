/**
 * ServiceTheater.jsx
 * Section 4: The Polishing & Services showcase.
 * Uses the walnut wood texture (image_ddd655.jpg) as a fixed parallax background
 * with a dark overlay — keeping text fully readable.
 * The Before/After slider sits in the centre.
 * Also lists value-added services with staggered card reveals.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Scissors, Shield, Truck } from "lucide-react";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";
import woodTexture from "../../assets/wood-bg.png";

// Wood texture loaded from local assets folder

const SERVICES = [
  {
    icon: Sparkles,
    title: "Wood Polishing",
    desc: "In-house polishing workshop. From raw surface prep to a mirror-grade glossy finish — we handle the full treatment cycle.",
    tag: "Signature Service",
  },
  {
    icon: Scissors,
    title: "Custom Cutting",
    desc: "Precision CNC and panel saw cuts to your exact dimensions. Send us your cutting list and we ship ready-to-assemble pieces.",
    tag: "Value-Add",
  },
  {
    icon: Shield,
    title: "Preservation Treatments",
    desc: "Anti-borer, anti-fungal, and fire-retardant treatments applied to stock before it leaves our warehouse.",
    tag: "Value-Add",
  },
  {
    icon: Truck,
    title: "Bulk Transport",
    desc: "Own fleet of 8 trucks covering all major Rajasthan districts. Same-week dispatch for confirmed wholesale orders.",
    tag: "Logistics",
  },
];

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServiceTheater() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax on the background — drifts slightly opposite to scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden">

      {/* ── Parallax wood texture background ── */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${woodTexture})`,
          y: bgY,
          scale: 1.08,
        }}
      />
      {/* Dark overlay — ensures text readability per blueprint rule */}
      <div className="absolute inset-0 bg-stone-900/75" />

      {/* Gold line accent at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">

        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium">
              Services
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            We don't just sell wood.{" "}
            <span className="text-[#D4AF37]">We finish it.</span>
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed">
            Our in-house polishing workshop, cutting facility, and treatment plant
            mean you receive trade-ready stock — not raw material you still need to process.
          </p>
        </motion.div>

        {/* ── Main grid: Slider + Service cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">

          {/* Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5">
              <p className="text-stone-400 text-sm">
                Drag the handle to see the transformation ↓
              </p>
            </div>
            <BeforeAfterSlider
              beforeLabel="Raw Surface"
              afterLabel="Polished Finish"
              className="shadow-2xl shadow-black/40"
            />

            {/* Caption */}
            <div className="mt-5 flex items-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-500" />
                Unpolished — AS-IS from supplier
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                After our in-house polishing
              </span>
            </div>
          </motion.div>

          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                variants={CARD_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/25 transition-colors">
                  <svc.icon size={16} className="text-[#D4AF37]" />
                </div>

                <span className="inline-block text-[10px] tracking-widest uppercase text-[#D4AF37]/70 font-medium mb-2">
                  {svc.tag}
                </span>

                <h3 className="text-white font-semibold text-base mb-2">{svc.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold line accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    </section>
  );
}
