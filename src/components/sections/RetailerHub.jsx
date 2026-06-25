/**
 * RetailerHub.jsx
 * Section 8: The Retailer Hub / CTA Card.
 * Speaks directly to B2B buyers with a "Partner" framing.
 * Features a 3-step B2B onboarding wizard inside the right-hand panel.
 * When this section scrolls into view, a thin brass/gold border
 * draws itself around the card using SVG stroke-dashoffset animation.
 */

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FileText,
  Phone,
  Building2,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  MapPin,
  TrendingUp,
  Check
} from "lucide-react";
import { useQuote } from "../../context/QuoteContext";
import woodBg from "../../assets/wood-bg.png";

const BENEFITS = [
  "Verified dealer pricing — not shown publicly",
  "Priority stock allocation during peak seasons",
  "Flexible NET-30 / NET-60 credit terms",
  "Dedicated account manager for your district",
  "WhatsApp dispatch updates on every order",
];

const RAJASTHAN_DISTRICTS = [
  "Jodhpur",
  "Pali",
  "Nagaur",
  "Barmer",
  "Jaipur",
  "Udaipur",
  "Bikaner",
  "Jaisalmer",
  "Other"
];

// ── Drawing border SVG ───────────────────────
function DrawingBorder({ isVisible, width, height, radius = 16 }) {
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

  // Wizard state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    city: "Jodhpur",
    gstin: "",
    interest: "Both",
    volume: "100–500 sheets",
    phone: "",
    channel: "WhatsApp"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError("");
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.businessName.trim()) {
        setValidationError("Please enter your business or shop name.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      setValidationError("Please enter your mobile number.");
      return;
    }

    const business = formData.businessName.trim();
    const city = formData.city;
    const gstin = formData.gstin.trim() || "N/A";
    const interest = formData.interest;
    const volume = formData.volume;
    const phone = formData.phone.trim();

    if (formData.channel === "WhatsApp") {
      const text = `Hello Vishal Ply,\n\nI would like to apply to become a retail/contractor partner.\n\n*Business Details:*\n- Shop/Company: ${business}\n- District/City: ${city}\n- GSTIN: ${gstin}\n\n*Requirements:*\n- Primary Interest: ${interest}\n- Est. Monthly Volume: ${volume}\n- Mobile: ${phone}\n\nPlease share your wholesale catalog and price list.`;
      const waUrl = `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else {
      const subject = `B2B Partner Inquiry - ${business}`;
      const body = `Hello Vishal Ply,\n\nI would like to apply to become a retail/contractor partner.\n\nBusiness Details:\n- Shop/Company: ${business}\n- District/City: ${city}\n- GSTIN: ${gstin}\n\nRequirements:\n- Primary Interest: ${interest}\n- Est. Monthly Volume: ${volume}\n- Mobile: ${phone}\n\nPlease share your wholesale catalog and price list.\n\nRegards,\n${business}`;
      const mailtoUrl = `mailto:wholesale@vishalply.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    }

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      businessName: "",
      city: "Jodhpur",
      gstin: "",
      interest: "Both",
      volume: "100–500 sheets",
      phone: "",
      channel: "WhatsApp"
    });
    setIsSubmitted(false);
    setValidationError("");
  };

  // Step variants for Framer Motion
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <section id="retailer-hub" ref={ref} className="relative py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm tracking-[0.25em] uppercase font-bold">
              Retailer & Contractor Hub
            </span>
            <div className="w-8 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-[#FDFBF7] leading-tight">
            Partner with Jodhpur's{" "}
            <span className="text-[#D4AF37]">trusted supply chain.</span>
          </h2>
        </motion.div>

        {/* ── The main card with drawing border ── */}
        <motion.div
          ref={cardRef}
          className="relative max-w-5xl mx-auto rounded-2xl bg-[#2C2520] overflow-hidden shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Drawing border SVG */}
          <DrawingBorder isVisible={isInView} width={960} height={480} />

          {/* Subtle wood grain texture overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url(${woodBg})`,
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Benefits list */}
            <div className="p-8 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <Building2 size={22} className="text-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-sm tracking-widest uppercase font-bold">
                    Dealer Benefits
                  </span>
                </div>

                <h3 className="text-white text-3xl lg:text-4xl font-extrabold mb-8 leading-snug">
                  What verified retail partners get
                </h3>

                <ul className="space-y-5">
                  {BENEFITS.map((benefit, i) => (
                    <motion.li
                      key={benefit}
                      className="flex items-start gap-3.5 text-stone-200 text-base md:text-lg font-medium"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                    >
                      <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 hidden lg:block">
                <p className="text-stone-300 text-sm leading-relaxed font-semibold">
                  We supply over 500 tonnes of graded wood monthly, backed by automated calibration and rigorous checks.
                </p>
              </div>
            </div>

            {/* Right: Interactive Wizard Form */}
            <div className="p-8 lg:p-14 flex flex-col justify-between min-h-[500px] bg-black/10">
              <AnimatePresence mode="wait" initial={false}>
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 h-full"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                      <Check size={36} className="text-emerald-400" />
                    </div>
                    <h4 className="text-white text-2xl font-bold mb-4">Application Initiated</h4>
                    <p className="text-stone-200 text-base max-w-md mb-8 leading-relaxed font-semibold">
                      Your details have been compiled. Our B2B verification team will review your shop profile and reach out with wholesale pricing sheets within <span className="text-[#D4AF37] font-extrabold">24 hours</span>.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-sm text-[#D4AF37] hover:underline font-bold"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-sm tracking-widest text-[#D4AF37] uppercase font-black">
                          Step {step} of 3
                        </span>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3].map((s) => (
                            <div
                              key={s}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                s === step
                                  ? "w-10 bg-[#D4AF37]"
                                  : s < step
                                  ? "w-2.5 bg-[#D4AF37]/40"
                                  : "w-2.5 bg-white/15"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {validationError && (
                        <div className="mb-6 text-sm font-semibold text-rose-300 bg-rose-950/30 border border-rose-800/40 px-4 py-3 rounded-xl">
                          {validationError}
                        </div>
                      )}

                      {/* Step Contents */}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                          >
                            <h4 className="text-white font-extrabold text-xl mb-5 flex items-center gap-2.5">
                              <Building2 size={20} className="text-[#D4AF37]" />
                              Business Profile
                            </h4>
                            <div>
                              <label className="block text-stone-200 text-sm mb-2.5 font-semibold">Shop / Company Name *</label>
                              <input
                                type="text"
                                value={formData.businessName}
                                onChange={(e) => updateField("businessName", e.target.value)}
                                placeholder="e.g. Marwar Hardware Mart"
                                className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-white placeholder-stone-400 text-base outline-none transition-colors focus:ring-1 focus:ring-[#D4AF37]"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="block text-stone-200 text-sm mb-2.5 font-semibold">City / District *</label>
                                <select
                                  value={formData.city}
                                  onChange={(e) => updateField("city", e.target.value)}
                                  className="w-full bg-[#231D19] border border-white/15 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-white text-base outline-none transition-colors appearance-none"
                                >
                                  {RAJASTHAN_DISTRICTS.map((d) => (
                                    <option key={d} value={d}>
                                      {d}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-stone-200 text-sm mb-2.5 font-semibold">GSTIN (Optional)</label>
                                <input
                                  type="text"
                                  value={formData.gstin}
                                  onChange={(e) => updateField("gstin", e.target.value)}
                                  placeholder="e.g. 08AAAAA1111A1Z1"
                                  className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-white placeholder-stone-400 text-base outline-none transition-colors focus:ring-1 focus:ring-[#D4AF37]"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                          >
                            <h4 className="text-white font-extrabold text-xl mb-5 flex items-center gap-2.5">
                              <Briefcase size={20} className="text-[#D4AF37]" />
                              Your Requirements
                            </h4>

                            <div>
                              <span className="block text-stone-200 text-sm mb-3 font-semibold">What products interest you most?</span>
                              <div className="grid grid-cols-3 gap-3">
                                {["Raw Plywood", "Custom Work", "Both"].map((item) => (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => updateField("interest", item)}
                                    className={`px-5 py-4 rounded-xl border text-sm md:text-base font-bold transition-all ${
                                      formData.interest === item
                                        ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
                                        : "bg-white/5 border-white/15 text-stone-300 hover:border-white/30"
                                    }`}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="block text-stone-200 text-sm mb-3 font-semibold">Est. Monthly Requirement</span>
                              <div className="space-y-2.5">
                                {["100–500 sheets", "500–2000 sheets", "2000+ sheets"].map((vol) => (
                                  <label
                                    key={vol}
                                    onClick={() => updateField("volume", vol)}
                                    className={`flex items-center gap-4 p-4.5 rounded-xl border cursor-pointer transition-all ${
                                      formData.volume === vol
                                        ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white"
                                        : "bg-white/5 border-white/15 text-stone-300 hover:border-white/30"
                                    }`}
                                  >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                      formData.volume === vol ? "border-[#D4AF37]" : "border-stone-500"
                                    }`}>
                                      {formData.volume === vol && <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />}
                                    </div>
                                    <span className="text-base font-bold">{vol}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {step === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                          >
                            <h4 className="text-white font-extrabold text-xl mb-5 flex items-center gap-2.5">
                              <Phone size={20} className="text-[#D4AF37]" />
                              Contact & Routing
                            </h4>

                            <div>
                              <label className="block text-stone-200 text-sm mb-2.5 font-semibold">Mobile / WhatsApp Number *</label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                placeholder="e.g. +91 98765 43210"
                                className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-white placeholder-stone-400 text-base outline-none transition-colors focus:ring-1 focus:ring-[#D4AF37]"
                              />
                            </div>

                            <div>
                              <span className="block text-stone-200 text-sm mb-3 font-semibold">Routing Channel</span>
                              <div className="grid grid-cols-2 gap-3.5">
                                {["WhatsApp", "Email"].map((ch) => (
                                  <button
                                    key={ch}
                                    type="button"
                                    onClick={() => updateField("channel", ch)}
                                    className={`px-5 py-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-3 transition-all ${
                                      formData.channel === ch
                                        ? "bg-emerald-600/15 border-emerald-500 text-emerald-300 font-extrabold"
                                        : "bg-white/5 border-white/15 text-stone-300 hover:border-white/30"
                                    }`}
                                  >
                                    <div className={`w-2.5 h-2.5 rounded-full ${formData.channel === ch ? "bg-emerald-400" : "bg-transparent"}`} />
                                    {ch === "WhatsApp" ? "WhatsApp (Instant)" : "Email Summary"}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Summary breakdown box */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-sm text-stone-200 space-y-2">
                              <p className="text-stone-400 font-extrabold uppercase tracking-wider text-xs mb-2">Inquiry Summary</p>
                              <p><span className="text-stone-400 font-medium">Business:</span> <span className="font-bold text-white">{formData.businessName || "N/A"}</span></p>
                              <p><span className="text-stone-400 font-medium">Location:</span> <span className="font-bold text-white">{formData.city} (Rajasthan)</span></p>
                              <p><span className="text-stone-400 font-medium">Requirements:</span> <span className="font-bold text-[#D4AF37]">{formData.interest} / {formData.volume}</span></p>
                            </div>
                          </motion.div>
                        )}
                      </form>
                    </div>

                    {/* Step Navigation Actions */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                      {step > 1 ? (
                        <button
                          onClick={handleBack}
                          className="flex items-center gap-2 text-stone-300 hover:text-white text-base font-bold transition-colors py-2"
                        >
                          <ChevronLeft size={18} />
                          Back
                        </button>
                      ) : (
                        <button
                          onClick={toggleDrawer}
                          className="text-stone-400 hover:text-stone-200 text-sm font-semibold transition-colors py-2"
                        >
                          View My Quote
                        </button>
                      )}

                      {step < 3 ? (
                        <button
                          onClick={handleNext}
                          data-magnetic
                          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962e] text-[#2C2520] font-extrabold px-7 py-3.5 rounded-xl transition-all duration-300 text-base ml-auto hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-md"
                        >
                          Next
                          <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          data-magnetic
                          className="btn-premium-primary text-base px-8 py-4 ml-auto"
                        >
                          <FileText size={18} />
                          Submit Application
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Trust footnote */}
        <motion.p
          className="text-center text-stone-200 text-sm mt-10 font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          No upfront payment is required to review dealer rates. We verify business profiles to protect distribution networks.
        </motion.p>
      </div>
    </section>
  );
}
