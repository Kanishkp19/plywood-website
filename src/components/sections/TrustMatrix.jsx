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
    <section id="trust" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium">
              Our Scale
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#FDFBF7] leading-tight">
            Numbers that prove we're{" "}
            <span className="text-[#D4AF37]">Rajasthan's backbone.</span>
          </h2>
          <p className="text-stone-300 mt-4 text-lg leading-relaxed">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-16 border border-white/5"
        >
          {STATS.map(({ icon: Icon, end, suffix, label, sublabel }) => (
            <motion.div
              key={label}
              variants={ITEM}
              className="bg-white/5 backdrop-blur-sm p-8 lg:p-10 group hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 flex items-center justify-center mb-6 transition-colors">
                <Icon size={18} className="text-[#D4AF37]" />
              </div>

              <div className="text-4xl lg:text-5xl font-black text-white transition-colors mb-2 leading-none">
                <StatCounter end={end} suffix={suffix} duration={2000} />
              </div>

              <p className="font-semibold text-stone-200 group-hover:text-white transition-colors text-sm mb-1">
                {label}
              </p>
              <p className="text-stone-400 group-hover:text-stone-300 text-xs leading-snug">
                {sublabel}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification badges */}
        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="text-stone-400 text-xs uppercase tracking-widest mr-2">
            Certifications:
          </span>
          {TRUSTED_CERTIFICATIONS.map((cert) => (
            <span
              key={cert}
              className="px-4 py-2 rounded-full border border-white/10 text-stone-300 text-xs font-medium tracking-wide bg-white/5 backdrop-blur-sm"
            >
              ✓ {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
