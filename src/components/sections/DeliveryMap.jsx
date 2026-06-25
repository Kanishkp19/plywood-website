/**
 * DeliveryMap.jsx
 * Premium delivery network visualization — Rajasthan route map.
 * Features animated route lines, glowing district nodes, and a full logistics panel.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Truck, Clock, ChevronDown, ChevronUp, Package, Zap } from "lucide-react";

// ── Zone data ─────────────────────────────────
const ZONES = {
  gold:  { label: "Daily Dispatch",  color: "#D4AF37", glow: "rgba(212,175,55,0.4)",  bg: "rgba(212,175,55,0.12)", border: "rgba(212,175,55,0.5)",  days: "Mon – Sat" },
  amber: { label: "3× / Week",       color: "#F59E0B", glow: "rgba(245,158,11,0.4)",  bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.45)", days: "Mon, Wed, Fri" },
  slate: { label: "Weekly",          color: "#60A5FA", glow: "rgba(96,165,250,0.35)", bg: "rgba(96,165,250,0.10)", border: "rgba(96,165,250,0.40)", days: "Every Monday" },
};

// Geographic coordinates mapped to SVG viewBox (650 × 520)
// Approximate Rajasthan district positions
const DISTRICTS = [
  // Gold — HQ & daily
  { id: "jodhpur",   name: "Jodhpur",   zone: "gold",  x: 215, y: 255, isHQ: true,  note: "HQ — Mandore Road. Walk-in & same-day pickup available." },
  { id: "pali",      name: "Pali",      zone: "gold",  x: 252, y: 305, note: "Daily delivery. Key furniture wholesale hub." },
  { id: "nagaur",    name: "Nagaur",    zone: "gold",  x: 290, y: 185, note: "Daily route. Second-largest distributor market." },

  // Amber — 3×/week
  { id: "barmer",    name: "Barmer",    zone: "amber", x: 135, y: 345, note: "Mon, Wed, Fri — Desert corridor consolidation." },
  { id: "jaisalmer", name: "Jaisalmer", zone: "amber", x: 75,  y: 275, note: "Mon, Wed, Fri — Advance booking preferred." },
  { id: "bikaner",   name: "Bikaner",   zone: "amber", x: 235, y: 115, note: "Mon, Wed, Fri — Northern Rajasthan corridor." },
  { id: "jalore",    name: "Jalore",    zone: "amber", x: 200, y: 385, note: "Mon, Wed, Fri — Southern border route." },
  { id: "sirohi",    name: "Sirohi",    zone: "amber", x: 240, y: 420, note: "Mon, Wed, Fri — Gujarat border junction." },

  // Slate — weekly
  { id: "ajmer",     name: "Ajmer",     zone: "slate", x: 365, y: 240, note: "Every Monday — Central Rajasthan transit depot." },
  { id: "jaipur",    name: "Jaipur",    zone: "slate", x: 430, y: 175, note: "Every Monday — Large-volume wholesale orders." },
  { id: "udaipur",   name: "Udaipur",   zone: "slate", x: 310, y: 390, note: "Every Monday — South Rajasthan premium hub." },
  { id: "sikar",     name: "Sikar",     zone: "slate", x: 390, y: 130, note: "Every Monday — Shekhawati region depot." },
  { id: "bhilwara",  name: "Bhilwara",  zone: "slate", x: 355, y: 320, note: "Every Monday — Textile belt bulk orders." },
];

// FAQ data
const FAQS = [
  {
    q: "What's the minimum order for outstation delivery?",
    a: "Minimum 50 sheets for outstation routes. We consolidate multiple dealer orders on a single truck to keep freight costs low.",
  },
  {
    q: "Do you offer express delivery?",
    a: "Yes — for Jodhpur city limits we offer same-day dispatch on orders placed before 11:00 AM. Outstation express is available on request.",
  },
  {
    q: "Who bears the freight cost?",
    a: "Freight is charged at actual cost and shown transparently on every invoice. For orders above 200 sheets, we absorb part of the freight.",
  },
  {
    q: "Can I track my shipment?",
    a: "All dispatched orders receive a WhatsApp update with the truck number, driver contact, and estimated arrival time.",
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
      >
        <span className="text-stone-100 text-sm font-bold group-hover:text-white transition-colors">
          {item.q}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
        ) : (
          <ChevronDown size={16} className="text-stone-400 shrink-0 mt-0.5" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-stone-300 text-sm leading-relaxed pb-4 overflow-hidden"
          >
            {item.a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main section ──────────────────────────────
export default function DeliveryMap() {
  const [activeDistrict, setActiveDistrict] = useState(null);
  const hq = DISTRICTS.find((d) => d.isHQ);

  return (
    <section id="delivery-map" className="relative py-14 lg:py-20">
      {/* Subtle section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="max-w-3xl mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-bold">
              Delivery Network
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FDFBF7] leading-tight">
            We cover all of{" "}
            <span className="text-[#D4AF37]">Rajasthan.</span>
          </h2>
          <p className="text-stone-300 mt-3 text-base leading-relaxed">
            Our own fleet runs fixed routes across Rajasthan. Hover any district to see exact dispatch frequency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 xl:gap-12 items-start">

          {/* ── Premium SVG Map ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4">
              {Object.entries(ZONES).map(([key, z]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: z.color, boxShadow: `0 0 6px ${z.glow}` }} />
                  <span className="text-stone-300 text-xs font-semibold">{z.label}</span>
                </div>
              ))}
            </div>

            {/* Map container */}
            <div className="relative bg-gradient-to-br from-[#1a130f] via-[#1e1510] to-[#161009] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

              <svg
                viewBox="0 0 650 490"
                className="w-full"
                style={{ minHeight: "300px" }}
              >
                {/* Rajasthan outline - simplified polygon */}
                <polygon
                  points="60,80 140,50 260,60 380,45 480,80 530,130 540,200 510,290 480,370 430,440 350,460 270,470 190,450 130,410 90,360 55,300 40,230 50,150"
                  fill="rgba(212,175,55,0.03)"
                  stroke="rgba(212,175,55,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="8 4"
                />

                {/* Route lines from HQ to each district */}
                {DISTRICTS.filter((d) => !d.isHQ).map((d, i) => {
                  const zone = ZONES[d.zone];
                  const isActive = activeDistrict?.id === d.id;
                  return (
                    <motion.path
                      key={`route-${d.id}`}
                      d={`M ${hq.x} ${hq.y} Q ${(hq.x + d.x) / 2 + (d.y - hq.y) * 0.15} ${(hq.y + d.y) / 2 - Math.abs(d.x - hq.x) * 0.1} ${d.x} ${d.y}`}
                      fill="none"
                      stroke={zone.color}
                      strokeOpacity={isActive ? 0.9 : 0.2}
                      strokeWidth={isActive ? 2.5 : 1.2}
                      strokeDasharray={d.zone === "slate" ? "5 4" : d.zone === "amber" ? "8 3" : "none"}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.07, ease: "easeOut" }}
                      style={{
                        filter: isActive ? `drop-shadow(0 0 4px ${zone.color})` : "none",
                        transition: "stroke-opacity 0.3s, stroke-width 0.3s"
                      }}
                    />
                  );
                })}

                {/* Animated truck dots on routes */}
                {DISTRICTS.filter((d) => !d.isHQ && d.zone === "gold").map((d) => (
                  <motion.circle
                    key={`truck-${d.id}`}
                    r={4}
                    fill="#D4AF37"
                    style={{ filter: "drop-shadow(0 0 4px rgba(212,175,55,0.8))" }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                    }}
                  >
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      path={`M ${hq.x} ${hq.y} Q ${(hq.x + d.x) / 2 + (d.y - hq.y) * 0.15} ${(hq.y + d.y) / 2 - Math.abs(d.x - hq.x) * 0.1} ${d.x} ${d.y}`}
                    />
                  </motion.circle>
                ))}

                {/* District nodes */}
                {DISTRICTS.map((d, i) => {
                  const zone = ZONES[d.zone];
                  const isActive = activeDistrict?.id === d.id;
                  const r = d.isHQ ? 22 : 14;

                  return (
                    <g
                      key={d.id}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActiveDistrict(d)}
                      onMouseLeave={() => setActiveDistrict(null)}
                      onClick={() => setActiveDistrict(isActive ? null : d)}
                    >
                      {/* Glow ring */}
                      {(isActive || d.isHQ) && (
                        <motion.circle
                          cx={d.x} cy={d.y}
                          r={r + 10}
                          fill="none"
                          stroke={zone.color}
                          strokeWidth={1.5}
                          strokeOpacity={0.4}
                          animate={{ r: [r + 6, r + 18], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}

                      {/* Second pulse ring for HQ */}
                      {d.isHQ && (
                        <motion.circle
                          cx={d.x} cy={d.y}
                          r={r + 6}
                          fill="none"
                          stroke={zone.color}
                          strokeWidth={1}
                          strokeOpacity={0.3}
                          animate={{ r: [r + 4, r + 14], opacity: [0.4, 0] }}
                          transition={{ duration: 2, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}

                      {/* Node background */}
                      <motion.circle
                        cx={d.x} cy={d.y}
                        r={r}
                        fill={isActive || d.isHQ ? zone.color : zone.bg}
                        stroke={zone.color}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        strokeOpacity={isActive ? 1 : 0.7}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05, type: "spring" }}
                        style={{ 
                          filter: (isActive || d.isHQ) ? `drop-shadow(0 0 8px ${zone.glow})` : "none",
                          transition: "filter 0.3s"
                        }}
                      />

                      {/* Name text */}
                      <text
                        x={d.x} y={d.y + (d.isHQ ? -3 : 1)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive || d.isHQ ? "#1C1714" : "#FDFBF7"}
                        fontSize={d.isHQ ? 9 : 7.5}
                        fontWeight="800"
                        style={{ pointerEvents: "none", fontFamily: "Inter, sans-serif" }}
                      >
                        {d.name}
                      </text>
                      {d.isHQ && (
                        <text
                          x={d.x} y={d.y + 9}
                          textAnchor="middle"
                          fill="#1C1714"
                          fontSize={6.5}
                          fontWeight="900"
                          style={{ pointerEvents: "none", fontFamily: "Inter, sans-serif" }}
                        >
                          HQ
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Hover card overlay */}
              <AnimatePresence>
                {activeDistrict && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 left-4 right-4 bg-[#1C1714]/95 backdrop-blur-md border border-white/15 rounded-xl p-4 flex items-start gap-3"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: ZONES[activeDistrict.zone].bg, border: `1px solid ${ZONES[activeDistrict.zone].border}` }}
                    >
                      <MapPin size={16} style={{ color: ZONES[activeDistrict.zone].color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-bold text-sm">{activeDistrict.name}</p>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                          style={{ background: ZONES[activeDistrict.zone].bg, color: ZONES[activeDistrict.zone].color }}
                        >
                          {ZONES[activeDistrict.zone].label}
                        </span>
                      </div>
                      <p className="text-stone-300 text-xs leading-relaxed">{activeDistrict.note}</p>
                      <p className="text-stone-400 text-xs mt-1.5 flex items-center gap-1">
                        <Clock size={11} style={{ color: ZONES[activeDistrict.zone].color }} />
                        {ZONES[activeDistrict.zone].days}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "13+", sub: "Districts", icon: MapPin },
                { num: "8",   sub: "Trucks",    icon: Truck },
                { num: "⚡",  sub: "Same Day",  icon: Zap },
              ].map(({ num, sub, icon: Icon }) => (
                <div
                  key={sub}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center flex flex-col items-center justify-center gap-1.5 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <p className="text-[#D4AF37] font-black text-xl leading-none">{num}</p>
                  <p className="text-stone-300 text-xs font-semibold">{sub}</p>
                </div>
              ))}
            </div>

            {/* Dispatch schedule */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={16} className="text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-bold text-sm">Fixed Dispatch Schedule</p>
              </div>
              <div className="space-y-3">
                {Object.entries(ZONES).map(([key, z]) => (
                  <div key={key} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: z.bg }}>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: z.color, boxShadow: `0 0 6px ${z.glow}` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-stone-100 text-xs font-bold">{z.label}</p>
                      <p className="text-stone-400 text-xs">{z.days}</p>
                    </div>
                    <Package size={13} style={{ color: z.color }} className="shrink-0" />
                  </div>
                ))}
              </div>
              <p className="text-stone-500 text-xs border-t border-white/8 pt-3 mt-3 leading-relaxed">
                Outstation orders require confirmation by 6 PM the previous day.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-bold mb-3">
                Logistics FAQs
              </p>
              <div className="divide-y divide-white/8">
                {FAQS.map((faq) => (
                  <FAQItem key={faq.q} item={faq} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
