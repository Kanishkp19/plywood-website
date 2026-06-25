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
      className={`relative rounded-xl border p-5 cursor-pointer transition-all duration-200 group ${
        unlocked
          ? "bg-white/8 border-white/15 hover:border-[#D4AF37]/40 hover:bg-white/12"
          : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Accent top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl opacity-60"
        style={{ background: doc.accent }}
      />

      {/* Lock / Unlock icon */}
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            background: doc.accent + "22",
            color: doc.accent,
            border: `1px solid ${doc.accent}55`,
          }}
        >
          {doc.category}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10">
          {unlocked ? (
            <Unlock size={14} className="text-[#D4AF37]" />
          ) : (
            <Lock size={14} className="text-stone-500 group-hover:text-stone-300" />
          )}
        </div>
      </div>

      <FileText size={20} className="mb-3" style={{ color: doc.accent }} />

      <p className="text-white font-semibold text-sm leading-snug mb-2">{doc.name}</p>
      <p className="text-stone-400 text-xs leading-relaxed mb-3">{doc.desc}</p>

      <div className="flex items-center justify-between">
        <span className="text-stone-500 text-xs">{doc.pages} pages · PDF</span>
        {unlocked ? (
          <span className="text-[#D4AF37] text-xs font-semibold flex items-center gap-1">
            <CheckCircle size={11} /> Ready to send
          </span>
        ) : (
          <span className="text-stone-600 text-xs">Enter number to unlock</span>
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
    <section id="tech-vault" className="relative py-24 lg:py-32">
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
              Technical Download Vault
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#FDFBF7] leading-tight">
            Certifications your clients{" "}
            <span className="text-[#D4AF37]">need to see.</span>
          </h2>
          <p className="text-stone-300 mt-4 text-lg leading-relaxed">
            ISI certificates, BWR test reports, fire-retardancy compliance, and our full product catalog — all in one place. Enter your number below to unlock and request any document.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 xl:gap-16 items-start">

          {/* ── Document grid ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto">
                      <CheckCircle size={28} className="text-[#D4AF37]" />
                    </div>
                    <p className="text-white font-bold text-lg">Request Sent!</p>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      Our team will WhatsApp you the requested documents to{" "}
                      <span className="text-white font-medium">{phone}</span> within 2 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setSelected(new Set()); setPhone(""); }}
                      className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
                    >
                      Request different documents →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Lock icon header */}
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        unlocked ? "bg-[#D4AF37]/15" : "bg-white/5"
                      }`}>
                        {unlocked
                          ? <Unlock size={16} className="text-[#D4AF37]" />
                          : <Lock size={16} className="text-stone-400" />
                        }
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {unlocked ? "Vault Unlocked" : "Unlock the Vault"}
                        </p>
                        <p className="text-stone-500 text-xs">
                          {unlocked
                            ? "Select documents above, then request"
                            : "Enter your mobile number to access documents"}
                        </p>
                      </div>
                    </div>

                    {/* Phone input */}
                    <div>
                      <label className="text-xs text-stone-400 mb-2 block tracking-wide">
                        Your WhatsApp Number
                      </label>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/15 focus-within:border-[#D4AF37]/50 rounded-lg px-4 py-3 transition-colors">
                        <Phone size={14} className="text-stone-500 shrink-0" />
                        <span className="text-stone-400 text-sm">+91</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setError(""); }}
                          placeholder="98765 43210"
                          maxLength={10}
                          className="bg-transparent text-white text-sm outline-none w-full placeholder-stone-600"
                        />
                        {isValid && (
                          <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Selected docs */}
                    {unlocked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-2"
                      >
                        <p className="text-xs text-stone-400 mb-3">
                          Selected ({selected.size} of {DOCUMENTS.length}) — click cards above to toggle
                        </p>
                        {selected.size === 0 ? (
                          <p className="text-stone-600 text-xs italic">No documents selected yet.</p>
                        ) : (
                          [...selected].map((id) => {
                            const doc = DOCUMENTS.find((d) => d.id === id);
                            return (
                              <div key={id} className="flex items-center gap-2 text-xs text-stone-300">
                                <CheckCircle size={11} className="text-[#D4AF37] shrink-0" />
                                {doc?.name}
                              </div>
                            );
                          })
                        )}
                      </motion.div>
                    )}

                    {error && (
                      <p className="text-red-400 text-xs">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={!isValid || selected.size === 0}
                      className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF37] disabled:bg-white/10 disabled:text-stone-600 hover:bg-[#b8962e] text-[#2C2520] font-bold py-4 px-6 rounded-xl transition-all duration-200 text-sm tracking-wide disabled:cursor-not-allowed"
                    >
                      <Send size={15} />
                      {selected.size === 0
                        ? "Select documents above"
                        : `Send ${selected.size} Document${selected.size > 1 ? "s" : ""} via WhatsApp`}
                    </button>

                    <p className="text-stone-600 text-xs text-center leading-relaxed">
                      Your number is used only to send documents. We do not share it with third parties.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Trust note */}
            <p className="text-stone-500 text-xs text-center mt-4">
              Documents are authentic. Certifications are renewed annually and available for physical inspection at our Jodhpur office.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
