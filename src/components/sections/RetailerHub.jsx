/**
 * RetailerHub.jsx
 * Section 5: The Retailer Hub / CTA Card.
 * When this section scrolls into view, a thin brass/gold border
 * draws itself around the card using SVG stroke-dashoffset animation.
 * Speaks directly to B2B buyers with a "Partner" framing.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Phone, Building2, CheckCircle2 } from "lucide-react";
import { useQuote } from "../../context/QuoteContext";
import woodBg from "../../assets/wood-bg.png";

const BENEFITS = [
  "Verified dealer pricing — not shown publicly",
  "Priority stock allocation during peak seasons",
  "Flexible NET-30 / NET-60 credit terms",
  "Dedicated account manager for your district",
  "WhatsApp dispatch updates on every order",
];

// ── Drawing border SVG ───────────────────────
// We animate stroke-dashoffset from full perimeter → 0
function DrawingBorder({ isVisible, width, height, radius = 16 }) {
  // Approximate perimeter of the rounded rectangle
  const perimeter = 2 * (width + height) - (8 - 2 * Math.PI) * radius;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width="100%"
      height="100%"
      style={{ overflow: "visible" }}
    >
      <motion.rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={radius}
        ry={radius}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeDasharray={perimeter}
        initial={{ strokeDashoffset: perimeter }}
        animate={{ strokeDashoffset: isVisible ? 0 : perimeter }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}

export default function RetailerHub() {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { toggleDrawer } = useQuote();

  return (
    <section id="retailer-hub" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="max-w-xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium">
              Retailer & Contractor Hub
            </span>
            <div className="w-6 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#FDFBF7] leading-tight">
            Partner with Jodhpur's{" "}
            <span className="text-[#D4AF37]">trusted supply chain.</span>
          </h2>
        </motion.div>

        {/* ── The main card with drawing border ── */}
        <motion.div
          ref={cardRef}
          className="relative max-w-5xl mx-auto rounded-2xl bg-[#2C2520] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Drawing border SVG — approximated dimensions */}
          <DrawingBorder isVisible={isInView} width={960} height={440} />

          {/* Subtle wood grain texture overlay at very low opacity */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url(${woodBg})`,
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Benefits list */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Building2 size={18} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium">
                  Dealer Benefits
                </span>
              </div>

              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-6 leading-snug">
                What verified retail partners get
              </h3>

              <ul className="space-y-4">
                {BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    className="flex items-start gap-3 text-stone-300 text-sm"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  >
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: Action area */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <p className="text-stone-400 text-sm leading-relaxed mb-8">
                  Submit your business details below. Our wholesale team will verify your dealer
                  credentials and share our complete price list within{" "}
                  <span className="text-white font-medium">24 hours</span> — guaranteed.
                </p>

                {/* Quick inquiry form */}
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    placeholder="Business / Shop Name"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37]/50 rounded-lg px-4 py-3 text-white placeholder-stone-500 text-sm outline-none transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="bg-white/5 border border-white/15 focus:border-[#D4AF37]/50 rounded-lg px-4 py-3 text-white placeholder-stone-500 text-sm outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="City / District"
                      className="bg-white/5 border border-white/15 focus:border-[#D4AF37]/50 rounded-lg px-4 py-3 text-white placeholder-stone-500 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-3">
                <motion.button
                  className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#b8962e] text-[#2C2520] font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-sm tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FileText size={16} />
                  Request Bulk Price List
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-700/30 border border-emerald-600/30 hover:bg-emerald-700/50 text-emerald-300 font-medium py-3 px-4 rounded-lg transition-colors text-xs"
                  >
                    <Phone size={13} />
                    WhatsApp
                  </a>
                  <button
                    onClick={toggleDrawer}
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/15 hover:border-[#D4AF37]/40 text-stone-300 font-medium py-3 px-4 rounded-lg transition-colors text-xs"
                  >
                    View My Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust footnote */}
        <motion.p
          className="text-center text-stone-400 text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          No advance payment needed to request pricing. We verify all dealer credentials before sharing wholesale rates.
        </motion.p>
      </div>
    </section>
  );
}
