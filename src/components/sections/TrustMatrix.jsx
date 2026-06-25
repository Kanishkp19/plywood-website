/**
 * TrustMatrix.jsx
 * "Our Scale" section featuring count-up statistics.
 * Clean cream background with charcoal type; gold accents on numbers.
 * Stats animate in when the section scrolls into view.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import StatCounter from "../ui/StatCounter";
import { Truck, ShieldCheck, Warehouse, Users } from "lucide-react";

const STATS = [
  {
    icon: Users,
    end: 500,
    suffix: "+",
    label: "Active Retail Partners",
    sublabel: "Across Rajasthan & Gujarat",
  },
  {
    icon: Warehouse,
    end: 40000,
    suffix: " sq ft",
    label: "Warehouse Capacity",
    sublabel: "Mandore Road, Jodhpur",
  },
  {
    icon: Truck,
    end: 500,
    suffix: "+ Tonnes",
    label: "Moved Every Month",
    sublabel: "Consistent on-time delivery",
  },
  {
    icon: ShieldCheck,
    end: 25,
    suffix: "+ Years",
    label: "Industry Legacy",
    sublabel: "ISI & BWR certified stock",
  },
];

const TRUSTED_CERTIFICATIONS = ["ISI Certified", "BWR Certified", "IS:710 Marine", "IS:303 Commercial"];

const CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const ITEM = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function TrustMatrix() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trust" ref={ref} className="relative py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm tracking-[0.25em] uppercase font-bold">
              Our Scale
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FDFBF7] leading-tight">
            Numbers that prove we're{" "}
            <span className="text-[#D4AF37]">Rajasthan's backbone.</span>
          </h2>
          <p className="text-stone-200 mt-4 text-base leading-relaxed">
            When your project can't afford delays, you need a supplier whose scale ensures
            your order ships the same week — every time.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-10"
        >
          {STATS.map(({ icon: Icon, end, suffix, label, sublabel }) => (
            <motion.div
              key={label}
              variants={ITEM}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 lg:p-6 group hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 shadow-lg shadow-black/20"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 flex items-center justify-center mb-4 transition-colors">
                <Icon size={22} className="text-[#D4AF37]" />
              </div>

              <div className="text-4xl lg:text-5xl font-black text-white transition-colors mb-2.5 leading-none">
                <StatCounter end={end} suffix={suffix} duration={2000} />
              </div>

              <p className="font-bold text-stone-100 group-hover:text-white transition-colors text-sm md:text-base mb-1.5 leading-snug">
                {label}
              </p>
              <p className="text-stone-300 group-hover:text-stone-200 text-xs md:text-sm leading-relaxed">
                {sublabel}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification badges */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="text-stone-300 text-sm uppercase tracking-widest mr-3 font-extrabold">
            Certifications:
          </span>
          {TRUSTED_CERTIFICATIONS.map((cert) => (
            <span
              key={cert}
              className="px-6 py-3 rounded-full border border-white/15 text-stone-200 text-sm font-semibold tracking-wide bg-white/5 backdrop-blur-sm hover:border-[#D4AF37]/40 hover:text-white transition-colors duration-200"
            >
              ✓ {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
