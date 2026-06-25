/**
 * TechVault.jsx
 * Section 8: Gated technical specification download centre.
 * Users enter their phone number to "unlock" documents.
 * On submit, a pre-filled WhatsApp message is sent to the client
 * containing the user's number + requested document — zero backend needed.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Lock, Unlock, Send, CheckCircle, Phone } from "lucide-react";

// ── Document library ──────────────────────────
const DOCUMENTS = [
  {
    id: "is710",
    name: "IS:710 Marine Grade Certificate",
    desc: "Official BIS certification for boiling water resistant plywood. Required for structural and marine applications.",
    pages: 4,
    category: "Certification",
    accent: "#4A7C59",
  },
  {
    id: "is303",
    name: "IS:303 Commercial Ply Spec Sheet",
    desc: "Full technical specification for MR-grade commercial plywood — bonding class, moisture content, and surface quality standards.",
    pages: 6,
    category: "Specification",
    accent: "#8B6914",
  },
  {
    id: "bwr",
    name: "BWR Bond Strength Test Report",
    desc: "Third-party lab test results confirming BWR bond strength meets IS:710 minimum requirements. Batch-specific report.",
    pages: 3,
    category: "Test Report",
    accent: "#3B5F8A",
  },
  {
    id: "fr",
    name: "Fire-Retardant Treatment Guide",
    desc: "Complete guide to our FR treatment process, chemical composition, and IS:1734 slow-burn compliance certificate.",
    pages: 8,
    category: "Compliance",
    accent: "#8A3B3B",
  },
  {
    id: "catalog",
    name: "Full Product Catalog 2025–26",
    desc: "Complete range with thickness options, price tiers, availability, and ordering instructions for trade partners.",
    pages: 24,
    category: "Catalog",
    accent: "#D4AF37",
  },
  {
    id: "eco",
    name: "Eco-Friendly Sourcing Statement",
    desc: "Our official sustainability statement covering timber sourcing, formaldehyde emission standards, and reforestation policy.",
    pages: 2,
    category: "Sustainability",
    accent: "#4A7C59",
  },
];

// ── Document card ─────────────────────────────
function DocCard({ doc, unlocked, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative rounded-2xl border p-6 cursor-pointer transition-all duration-200 group ${
        unlocked
          ? "bg-white/8 border-white/15 hover:border-[#D4AF37]/45 hover:bg-white/12"
          : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Accent top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-60"
        style={{ background: doc.accent }}
      />

      {/* Lock / Unlock icon */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
          style={{
            background: doc.accent + "22",
            color: doc.accent,
            border: `1px solid ${doc.accent}55`,
          }}
        >
          {doc.category}
        </span>
        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10">
          {unlocked ? (
            <Unlock size={16} className="text-[#D4AF37]" />
          ) : (
            <Lock size={16} className="text-stone-400 group-hover:text-stone-300" />
          )}
        </div>
      </div>

      <FileText size={24} className="mb-3.5" style={{ color: doc.accent }} />

      <p className="text-white font-extrabold text-base md:text-lg leading-snug mb-2.5">{doc.name}</p>
      <p className="text-stone-200 text-sm leading-relaxed mb-4">{doc.desc}</p>

      <div className="flex items-center justify-between">
        <span className="text-stone-400 text-sm font-semibold">{doc.pages} pages · PDF</span>
        {unlocked ? (
          <span className="text-[#D4AF37] text-sm font-bold flex items-center gap-1.5">
            <CheckCircle size={14} /> Ready to send
          </span>
        ) : (
          <span className="text-stone-400 text-sm font-semibold">Enter number to unlock</span>
        )}
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────
export default function TechVault() {
  const [phone,     setPhone]     = useState("");
  const [selected,  setSelected]  = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  const isValid = /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""));
  const unlocked = isValid;

  function toggleDoc(id) {
    if (!unlocked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (selected.size === 0) {
      setError("Please select at least one document.");
      return;
    }
    setError("");

    const docNames = [...selected]
      .map((id) => DOCUMENTS.find((d) => d.id === id)?.name)
      .filter(Boolean)
      .map((n) => `• ${n}`)
      .join("\n");

    const text = encodeURIComponent(
      `Hello Vishal Ply,\n\nI'd like to request the following technical documents:\n\n${docNames}\n\nMy number: ${phone}\n\nPlease WhatsApp me the PDFs. Thank you.`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section id="tech-vault" className="relative py-14 lg:py-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm tracking-[0.25em] uppercase font-bold">
              Technical Download Vault
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-[#FDFBF7] leading-tight">
            Certifications your clients{" "}
            <span className="text-[#D4AF37]">need to see.</span>
          </h2>
          <p className="text-stone-200 mt-6 text-xl leading-relaxed">
            ISI certificates, BWR test reports, fire-retardancy compliance, and our full product catalog — all in one place. Enter your number below to unlock and request any document.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 xl:gap-20 items-start">

          {/* ── Document grid ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {DOCUMENTS.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
              >
                <DocCard
                  doc={doc}
                  unlocked={unlocked && selected.has(doc.id)}
                  onClick={() => toggleDoc(doc.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right: Unlock form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-5"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto">
                      <CheckCircle size={36} className="text-[#D4AF37]" />
                    </div>
                    <p className="text-white font-extrabold text-xl animate-pulse">Request Sent!</p>
                    <p className="text-stone-200 text-base leading-relaxed font-semibold">
                      Our team will WhatsApp you the requested documents to{" "}
                      <span className="text-[#D4AF37] font-extrabold">{phone}</span> within 2 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setSelected(new Set()); setPhone(""); }}
                      className="text-sm font-bold text-[#D4AF37] hover:underline"
                    >
                      Request different documents →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Lock icon header */}
                    <div className="flex items-center gap-3.5 mb-2">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        unlocked ? "bg-[#D4AF37]/15" : "bg-white/5"
                      }`}>
                        {unlocked
                          ? <Unlock size={20} className="text-[#D4AF37]" />
                          : <Lock size={20} className="text-stone-400" />
                        }
                      </div>
                      <div>
                        <p className="text-white font-extrabold text-base md:text-lg">
                          {unlocked ? "Vault Unlocked" : "Unlock the Vault"}
                        </p>
                        <p className="text-stone-300 text-sm mt-0.5 font-medium">
                          {unlocked
                            ? "Select documents above, then request"
                            : "Enter your mobile number to access documents"}
                        </p>
                      </div>
                    </div>

                    {/* Phone input */}
                    <div>
                      <label className="text-sm text-stone-200 font-semibold mb-2.5 block tracking-wide">
                        Your WhatsApp Number
                      </label>
                      <div className="flex items-center gap-3 bg-white/5 border border-white/15 focus-within:border-[#D4AF37] rounded-xl px-5 py-4 transition-all focus-within:ring-1 focus-within:ring-[#D4AF37]">
                        <Phone size={18} className="text-stone-400 shrink-0" />
                        <span className="text-stone-200 text-base font-bold">+91</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setError(""); }}
                          placeholder="98765 43210"
                          maxLength={10}
                          className="bg-transparent text-white text-base outline-none w-full placeholder-stone-500 font-semibold"
                        />
                        {isValid && (
                          <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Selected docs */}
                    {unlocked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-2.5"
                      >
                        <p className="text-xs text-stone-300 mb-3 font-semibold">
                          Selected ({selected.size} of {DOCUMENTS.length}) — click cards above to toggle
                        </p>
                        {selected.size === 0 ? (
                          <p className="text-stone-400 text-sm italic">No documents selected yet.</p>
                        ) : (
                          [...selected].map((id) => {
                            const doc = DOCUMENTS.find((d) => d.id === id);
                            return (
                              <div key={id} className="flex items-center gap-2.5 text-xs text-stone-200 font-medium">
                                <CheckCircle size={13} className="text-[#D4AF37] shrink-0" />
                                {doc?.name}
                              </div>
                            );
                          })
                        )}
                      </motion.div>
                    )}

                    {error && (
                      <p className="text-rose-400 text-sm font-semibold">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={!isValid || selected.size === 0}
                      data-magnetic
                      className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF37] disabled:bg-white/10 disabled:text-stone-600 hover:bg-[#b8962e] text-[#2C2520] font-black py-4.5 px-6 rounded-xl transition-all duration-200 text-base tracking-wide disabled:cursor-not-allowed shadow-lg shadow-[#D4AF37]/10 disabled:shadow-none"
                    >
                      <Send size={18} />
                      {selected.size === 0
                        ? "Select documents above"
                        : `Send ${selected.size} Document${selected.size > 1 ? "s" : ""} via WhatsApp`}
                    </button>

                    <p className="text-stone-400 text-xs text-center leading-relaxed font-semibold">
                      Your number is used only to send documents. We do not share it with third parties.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Trust note */}
            <p className="text-stone-200 text-sm text-center mt-6 font-semibold leading-relaxed">
              Documents are authentic. Certifications are renewed annually and available for physical inspection at our Jodhpur office.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
