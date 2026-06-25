/**
 * DeliveryMap.jsx
 * Section 6: Delivery network visualization for Rajasthan districts.
 * Stylized district node map centered on Jodhpur HQ, with zone-based coloring
 * and hover tooltips showing delivery schedule.
 * No external map API needed — fully self-contained SVG + CSS.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Truck, Clock, ChevronDown, ChevronUp } from "lucide-react";

// ── Delivery Zone Data ────────────────────────
const ZONES = {
  gold:  { label: "Daily Dispatch",      color: "#D4AF37", bg: "rgba(212,175,55,0.15)",  border: "rgba(212,175,55,0.5)",  days: "Mon – Sat" },
  amber: { label: "3× / Week",           color: "#E87D2B", bg: "rgba(232,125,43,0.12)", border: "rgba(232,125,43,0.45)", days: "Mon, Wed, Fri" },
  slate: { label: "Weekly",              color: "#7BAFC4", bg: "rgba(123,175,196,0.12)", border: "rgba(123,175,196,0.4)", days: "Every Monday" },
};

// Districts arranged in an approximate geographic grid around Jodhpur
// Grid: [col, row] — 0-indexed, Jodhpur at [3, 3]
const DISTRICTS = [
  // Gold zone — daily
  { id: "jodhpur",    name: "Jodhpur",    zone: "gold",  col: 3, row: 3, isHQ: true,  note: "HQ — Mandore Road. Pick-up also available." },
  { id: "pali",       name: "Pali",       zone: "gold",  col: 4, row: 4, note: "Daily delivery. Major distributor hub." },
  { id: "nagaur",     name: "Nagaur",     zone: "gold",  col: 4, row: 2, note: "Daily route. Second-largest market." },

  // Amber zone — 3x/week
  { id: "barmer",     name: "Barmer",     zone: "amber", col: 2, row: 5, note: "Mon, Wed, Fri. Consolidation loads." },
  { id: "jaisalmer",  name: "Jaisalmer",  zone: "amber", col: 1, row: 3, note: "Mon, Wed, Fri. Advance booking preferred." },
  { id: "bikaner",    name: "Bikaner",    zone: "amber", col: 3, row: 1, note: "Mon, Wed, Fri. Northern corridor." },
  { id: "jalore",     name: "Jalore",     zone: "amber", col: 3, row: 5, note: "Mon, Wed, Fri. Desert route." },
  { id: "sirohi",     name: "Sirohi",     zone: "amber", col: 4, row: 5, note: "Mon, Wed, Fri. Connects to Gujarat border." },

  // Slate zone — weekly
  { id: "ajmer",      name: "Ajmer",      zone: "slate", col: 5, row: 3, note: "Every Monday. Central Rajasthan depot." },
  { id: "jaipur",     name: "Jaipur",     zone: "slate", col: 6, row: 2, note: "Every Monday. Large-volume orders." },
  { id: "udaipur",    name: "Udaipur",    zone: "slate", col: 5, row: 5, note: "Every Monday. South Rajasthan hub." },
  { id: "sikar",      name: "Sikar",      zone: "slate", col: 6, row: 1, note: "Every Monday. Northern Shekhawati." },
  { id: "bhilwara",   name: "Bhilwara",   zone: "slate", col: 5, row: 4, note: "Every Monday. Textile belt orders." },
];

const COL_W = 100; // px per grid column
const ROW_H = 80;  // px per grid row
const NODE_R = 34; // node circle radius
const SVG_W  = 7 * COL_W + 40;
const SVG_H  = 7 * ROW_H + 40;

// Convert grid position to SVG coordinates
const cx = (col) => col * COL_W + 20 + NODE_R;
const cy = (row) => row * ROW_H + 20 + NODE_R;

// ── FAQ data ──────────────────────────────────
const FAQS = [
  {
    q: "What's the minimum order for outstation delivery?",
    a: "Minimum 50 sheets for outstation routes. We consolidate multiple dealer orders on a single truck to keep freight costs low.",
  },
  {
    q: "Do you offer express delivery?",
    a: "Yes — for Jodhpur city limits we offer same-day dispatch on orders placed before 11:00 AM. Outstation express is available on request at an additional freight charge.",
  },
  {
    q: "Who bears the freight cost?",
    a: "Freight is charged at actual cost and shared transparently on every invoice. For orders above 200 sheets, we often absorb part of the freight.",
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
        <span className="text-stone-200 text-sm font-medium group-hover:text-white transition-colors">
          {item.q}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
        ) : (
          <ChevronDown size={16} className="text-stone-500 shrink-0 mt-0.5" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-stone-400 text-sm leading-relaxed pb-4 overflow-hidden"
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

  return (
    <section id="delivery-map" className="relative py-24 lg:py-32">
      {/* Subtle section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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
              Delivery Network
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#FDFBF7] leading-tight">
            We cover all of{" "}
            <span className="text-[#D4AF37]">Rajasthan.</span>
          </h2>
          <p className="text-stone-300 mt-4 text-lg leading-relaxed">
            Our own fleet runs fixed routes across Rajasthan. No third-party freight surprises — hover any district to see your exact dispatch schedule.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-start">

          {/* ── Map ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Zone legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              {Object.entries(ZONES).map(([key, z]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: z.color }} />
                  <span className="text-stone-300 text-xs">{z.label}</span>
                </div>
              ))}
            </div>

            {/* SVG Map */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-4 overflow-x-auto">
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className="w-full max-w-full"
                style={{ minWidth: "400px" }}
              >
                {/* Connection lines from Jodhpur HQ to each district */}
                {DISTRICTS.filter((d) => !d.isHQ).map((d) => {
                  const zone = ZONES[d.zone];
                  return (
                    <motion.line
                      key={`line-${d.id}`}
                      x1={cx(3)} y1={cy(3)}
                      x2={cx(d.col)} y2={cy(d.row)}
                      stroke={zone.color}
                      strokeOpacity={0.25}
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  );
                })}

                {/* District nodes */}
                {DISTRICTS.map((d, i) => {
                  const zone   = ZONES[d.zone];
                  const isActive = activeDistrict?.id === d.id;
                  const x = cx(d.col);
                  const y = cy(d.row);

                  return (
                    <g
                      key={d.id}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActiveDistrict(d)}
                      onMouseLeave={() => setActiveDistrict(null)}
                      onClick={() => setActiveDistrict(isActive ? null : d)}
                    >
                      {/* Pulse ring for HQ */}
                      {d.isHQ && (
                        <>
                          <motion.circle
                            cx={x} cy={y} r={NODE_R + 10}
                            fill="none"
                            stroke={zone.color}
                            strokeWidth={1.5}
                            strokeOpacity={0.3}
                            animate={{ r: [NODE_R + 8, NODE_R + 18], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                          <motion.circle
                            cx={x} cy={y} r={NODE_R + 5}
                            fill="none"
                            stroke={zone.color}
                            strokeWidth={1}
                            strokeOpacity={0.2}
                            animate={{ r: [NODE_R + 5, NODE_R + 15], opacity: [0.4, 0] }}
                            transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: "easeOut" }}
                          />
                        </>
                      )}

                      {/* Node circle */}
                      <motion.circle
                        cx={x} cy={y}
                        r={d.isHQ ? NODE_R + 4 : NODE_R}
                        fill={isActive || d.isHQ ? zone.color : zone.bg}
                        stroke={zone.color}
                        strokeWidth={isActive ? 2 : 1.5}
                        strokeOpacity={isActive ? 1 : 0.6}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06, type: "spring" }}
                      />

                      {/* Label */}
                      <text
                        x={x} y={y + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive || d.isHQ ? "#1C1714" : zone.color}
                        fontSize={d.isHQ ? 11 : 9.5}
                        fontWeight={d.isHQ ? "bold" : "600"}
                        style={{ pointerEvents: "none" }}
                      >
                        {d.name}
                      </text>

                      {/* HQ pin */}
                      {d.isHQ && (
                        <text
                          x={x} y={y + 14}
                          textAnchor="middle"
                          fill="#1C1714"
                          fontSize={7}
                          fontWeight="bold"
                          style={{ pointerEvents: "none" }}
                        >
                          HQ
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hover tooltip card */}
            <AnimatePresence>
              {activeDistrict && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.22 }}
                  className="mt-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4 flex items-start gap-4"
                >
                  <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold text-sm">{activeDistrict.name}</p>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: ZONES[activeDistrict.zone].bg,
                          color: ZONES[activeDistrict.zone].color,
                          border: `1px solid ${ZONES[activeDistrict.zone].border}`,
                        }}
                      >
                        {ZONES[activeDistrict.zone].label}
                      </span>
                    </div>
                    <p className="text-stone-300 text-xs">{activeDistrict.note}</p>
                    <p className="text-stone-500 text-xs mt-1 flex items-center gap-1.5">
                      <Clock size={10} />
                      Dispatch days: {ZONES[activeDistrict.zone].days}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right panel: Stats + FAQ ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "13+",   sub: "Districts Covered" },
                { num: "8",     sub: "Trucks in Fleet" },
                { num: "Same Day", sub: "Jodhpur City" },
              ].map(({ num, sub }) => (
                <div
                  key={sub}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                >
                  <p className="text-[#D4AF37] font-black text-xl leading-none">{num}</p>
                  <p className="text-stone-400 text-[10px] mt-1.5 leading-snug">{sub}</p>
                </div>
              ))}
            </div>

            {/* Dispatch schedule */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={16} className="text-[#D4AF37]" />
                <p className="text-white font-semibold text-sm">Fixed Dispatch Schedule</p>
              </div>
              {Object.entries(ZONES).map(([key, z]) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: z.color }} />
                  <div>
                    <p className="text-stone-200 text-xs font-semibold">{z.label}</p>
                    <p className="text-stone-500 text-xs">{z.days}</p>
                  </div>
                </div>
              ))}
              <p className="text-stone-500 text-xs border-t border-white/8 pt-3 mt-2">
                All outstation orders require confirmation by 6 PM the previous day.
              </p>
            </div>

            {/* FAQ */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[#D4AF37]/70 font-semibold mb-4">
                Logistics FAQs
              </p>
              <div className="space-y-0 divide-y divide-white/0">
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
