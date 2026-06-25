/**
 * FinishConfigurator.jsx
 * Section 3: Interactive finish & treatment configurator.
 * Users pick a base material + finish type → dynamic image preview updates.
 * Ends with a customized WhatsApp / email inquiry CTA.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Droplets, Shield, Sparkles, Square, Sun, ArrowRight, Mail } from "lucide-react";

// ── Data ─────────────────────────────────────
const MATERIALS = [
  {
    id: "gurjan",
    name: "Gurjan Plywood",
    shortName: "Gurjan",
    desc: "Construction-grade hardwood plywood. High density core with excellent screw-holding capacity. The backbone of structural joinery.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85",
    thicknesses: "6mm – 25mm",
    cert: "IS:303 MR Grade",
    leadTime: "1–2 days",
  },
  {
    id: "marine",
    name: "Marine Plywood",
    shortName: "Marine Ply",
    desc: "Boiling Water Resistant (BWR) construction ply. Zero voids in core, phenolic bonding. Ideal for wet areas, boats, and load-bearing structures.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    thicknesses: "6mm – 25mm",
    cert: "IS:710 / BWR Certified",
    leadTime: "2–3 days",
  },
  {
    id: "commercial",
    name: "Commercial Ply",
    shortName: "Commercial",
    desc: "MR-grade interior plywood. Lightweight, smooth face, ideal for furniture, cabinets, modular kitchens, and wall panelling.",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&q=85",
    thicknesses: "3mm – 19mm",
    cert: "IS:303 MR Grade",
    leadTime: "Same day",
  },
  {
    id: "teak",
    name: "Teak Veneer",
    shortName: "Teak Veneer",
    desc: "Premium A-grade teak face veneer. Natural wood grain, warm amber tones. The choice for luxury furniture and high-end interior finishing.",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&q=85",
    thicknesses: "0.5mm – 3mm",
    cert: "Grade A Face Veneer",
    leadTime: "3–5 days",
  },
  {
    id: "blockboard",
    name: "Blockboard",
    shortName: "Blockboard",
    desc: "Solid timber batten core bonded with hardwood veneers. Exceptional rigidity over long spans — perfect for shelving, doors, and tabletops.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85",
    thicknesses: "12mm – 25mm",
    cert: "IS:1038 Certified",
    leadTime: "2–3 days",
  },
];

const FINISHES = [
  { id: "matte",   name: "Matte PU",          icon: Square,   desc: "Smooth, non-reflective polyurethane coat. Hides surface imperfections. Most requested for furniture." },
  { id: "gloss",   name: "High Gloss",         icon: Sparkles, desc: "Mirror-grade gloss finish. Deep sheen that amplifies natural grain. Premium residential choice." },
  { id: "satin",   name: "Satin",              icon: Sun,      desc: "Balanced mid-sheen. Scratch-resistant coating. Ideal for commercial furniture and office fit-outs." },
  { id: "fire",    name: "Fire-Retardant",     icon: Flame,    desc: "FR chemical treatment. Passes IS:1734 slow-burn standard. Mandatory for hospitality & public spaces." },
  { id: "borer",   name: "Anti-Borer",         icon: Shield,   desc: "Boric acid impregnation. Prevents borer beetle and fungal growth. Essential for Rajasthan's climate." },
  { id: "bwr",     name: "BWR Treatment",       icon: Droplets, desc: "Boiling water resistant adhesive bonding. Suitable for high-humidity and outdoor-adjacent applications." },
];

// Overlay tint per finish — applied on top of the material image
const FINISH_OVERLAY = {
  matte:  "rgba(30,20,10,0.35)",
  gloss:  "rgba(212,175,55,0.12)",
  satin:  "rgba(180,140,80,0.18)",
  fire:   "rgba(160,40,10,0.22)",
  borer:  "rgba(30,80,50,0.20)",
  bwr:    "rgba(20,60,120,0.18)",
};

// ── WhatsApp / Email helpers ──────────────────
function buildWhatsApp(material, finish) {
  const text = encodeURIComponent(
    `Hello Vishal Ply,\n\nI'm interested in a bulk inquiry for:\n\n• Material: ${material.name}\n• Finish / Treatment: ${finish.name}\n• Thickness Range: ${material.thicknesses}\n\nCould you please share pricing, minimum order quantity, and lead time?\n\nThank you.`
  );
  return `https://wa.me/919999999999?text=${text}`;
}

function buildEmail(material, finish) {
  const subject = encodeURIComponent(`Bulk Inquiry — ${material.name} (${finish.name})`);
  const body = encodeURIComponent(
    `Hello,\n\nI'd like to request a bulk quote for:\n\nMaterial: ${material.name}\nFinish / Treatment: ${finish.name}\nThickness: ${material.thicknesses}\n\nPlease share your pricing and MOQ.\n\nRegards`
  );
  return `mailto:wholesale@vishalply.com?subject=${subject}&body=${body}`;
}

// ── Sub-components ────────────────────────────
function MaterialTab({ material, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
        isActive
          ? "bg-[#D4AF37] text-[#2C2520]"
          : "bg-white/5 border border-white/10 text-stone-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {material.shortName}
      {isActive && (
        <motion.span
          layoutId="mat-pill"
          className="absolute inset-0 rounded-full bg-[#D4AF37] -z-10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

function FinishCard({ finish, isActive, onClick }) {
  const Icon = finish.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-center ${
        isActive
          ? "bg-[#D4AF37]/15 border-[#D4AF37]/60 text-[#D4AF37]"
          : "bg-white/5 border-white/10 text-stone-400 hover:bg-white/10 hover:border-white/20 hover:text-stone-200"
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
      <span className="text-xs font-semibold leading-tight">{finish.name}</span>
      {isActive && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-2 ring-[#1C1714]" />
      )}
    </motion.button>
  );
}

// ── Main section ──────────────────────────────
export default function FinishConfigurator() {
  const [activeMat,    setActiveMat]    = useState(MATERIALS[0]);
  const [activeFinish, setActiveFinish] = useState(FINISHES[0]);

  const waLink    = buildWhatsApp(activeMat, activeFinish);
  const emailLink = buildEmail(activeMat, activeFinish);

  return (
    <section id="configurator" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
              Finish Configurator
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#FDFBF7] leading-tight">
            Choose your material.{" "}
            <span className="text-[#D4AF37]">Choose your finish.</span>
          </h2>
          <p className="text-stone-300 mt-4 text-lg leading-relaxed">
            Every order is customised. Select a base material and treatment below to see exactly what we can deliver — then send us a direct bulk inquiry.
          </p>
        </motion.div>

        {/* Main configurator grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* ── Left: Controls ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Step 1 — Material */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF37]/80 font-semibold mb-4">
                Step 1 — Select Base Material
              </p>
              <div className="flex flex-wrap gap-2.5">
                {MATERIALS.map((mat) => (
                  <MaterialTab
                    key={mat.id}
                    material={mat}
                    isActive={activeMat.id === mat.id}
                    onClick={() => setActiveMat(mat)}
                  />
                ))}
              </div>
            </div>

            {/* Step 2 — Finish */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF37]/80 font-semibold mb-4">
                Step 2 — Choose Finish / Treatment
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {FINISHES.map((finish) => (
                  <FinishCard
                    key={finish.id}
                    finish={finish}
                    isActive={activeFinish.id === finish.id}
                    onClick={() => setActiveFinish(finish)}
                  />
                ))}
              </div>
            </div>

            {/* Finish description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeMat.id}-${activeFinish.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-1.5">
                    <p className="font-semibold text-white text-base">
                      {activeMat.name} — {activeFinish.name}
                    </p>
                    <p className="text-stone-400 text-sm leading-relaxed">{activeMat.desc}</p>
                    <p className="text-stone-300 text-sm leading-relaxed italic">
                      Finish note: {activeFinish.desc}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-4 text-xs text-stone-400">
                  <span>📐 <span className="text-stone-200">{activeMat.thicknesses}</span></span>
                  <span>✓ <span className="text-stone-200">{activeMat.cert}</span></span>
                  <span>🚚 Ready in <span className="text-stone-200">{activeMat.leadTime}</span></span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step 3 — CTA */}
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-[#D4AF37]/80 font-semibold">
                Step 3 — Send Your Bulk Inquiry
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#D4AF37] hover:bg-[#b8962e] text-[#2C2520] font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-sm tracking-wide group"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Inquire About {activeMat.shortName} — {activeFinish.name}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={emailLink}
                className="flex items-center justify-center gap-2 w-full border border-white/15 hover:border-[#D4AF37]/40 text-stone-300 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 text-sm"
              >
                <Mail size={14} />
                Email a Specification Summary
              </a>
            </div>
          </motion.div>

          {/* ── Right: Dynamic Preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/50">
              {/* Material image crossfade */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeMat.id}
                  src={activeMat.image}
                  alt={activeMat.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              {/* Finish overlay tint */}
              <AnimatePresence>
                <motion.div
                  key={activeFinish.id}
                  className="absolute inset-0"
                  style={{ background: FINISH_OVERLAY[activeFinish.id] }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Base gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/80 via-transparent to-transparent" />

              {/* Info badge — bottom */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${activeMat.id}-${activeFinish.id}`}
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                >
                  <span className="text-xs tracking-widest uppercase text-[#D4AF37] font-medium block mb-1">
                    {activeFinish.name} Finish
                  </span>
                  <p className="text-white font-bold text-2xl">{activeMat.name}</p>
                  <p className="text-stone-300 text-sm mt-1">{activeMat.thicknesses} · {activeMat.cert}</p>
                </motion.div>
              </AnimatePresence>

              {/* Finish badge — top right */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${activeFinish.id}`}
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="px-3 py-1.5 rounded-full bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wide">
                    {activeFinish.name}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Finish colour swatches row */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-stone-500 text-xs mr-1">Active finish:</span>
              {FINISHES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFinish(f)}
                  title={f.name}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    activeFinish.id === f.id
                      ? "border-[#D4AF37] scale-125"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  style={{ background: FINISH_OVERLAY[f.id].replace(/[\d.]+\)$/, "0.8)") }}
                />
              ))}
            </div>

            {/* Trust line */}
            <p className="text-stone-500 text-xs mt-4 leading-relaxed">
              All finishes applied in our in-house polishing workshop. ISI & BWR stock only. Same-week dispatch on confirmed wholesale orders.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
