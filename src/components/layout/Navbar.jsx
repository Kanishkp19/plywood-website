/**
 * Navbar.jsx
 * Sticky navigation bar.
 * Upgraded with premium micro-interactions, shared layout hover capsules,
 * morphing SVG menu icon, and smooth scroll transitions.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, Phone, X, Menu } from "lucide-react";
import { useQuote } from "../../context/QuoteContext";

const NAV_LINKS = [
  { label: "Our Scale", href: "#trust" },
  { label: "Finishes", href: "#configurator" },
  { label: "Our Facility", href: "#infrastructure" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Partner Up", href: "#retailer-hub" },
  { label: "Contact", href: "#contact" },
];

// ── Morphing Hamburger SVG Path Component ────
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { totalItems, toggleDrawer } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b transition-colors duration-500 flex items-center"
        initial="top"
        animate={scrolled ? "scrolled" : "top"}
        variants={{
          top: {
            height: "60px",
            backgroundColor: "rgba(44, 37, 32, 0)",
            borderBottomColor: "rgba(255, 255, 255, 0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          },
          scrolled: {
            height: "52px",
            backgroundColor: "rgba(44, 37, 32, 0.95)",
            borderBottomColor: "rgba(255, 255, 255, 0.07)",
            boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.4)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between w-full">
            
            {/* Brand / Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <motion.div 
                className="w-8 h-8 rounded-sm bg-[#D4AF37] flex items-center justify-center shadow-md shadow-[#D4AF37]/20"
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span className="text-[#2C2520] font-black text-sm leading-none">V</span>
              </motion.div>
              <div>
                <p className="text-white font-bold text-sm leading-none tracking-wide group-hover:text-[#D4AF37] transition-colors duration-300">
                  Vishal Ply
                </p>
                <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase leading-none mt-1 font-bold opacity-90">
                  Jodhpur
                </p>
              </div>
            </a>

            {/* Desktop Nav Links (Shared Layout Capsule Hover) */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 py-1.5 px-3 rounded-lg"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Sliding glassmorphic capsule background */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg -z-0"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Sliding gold bottom line indicator */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        layoutId="nav-hover-line"
                        className="absolute bottom-0 left-3.5 right-3.5 h-[2.5px] bg-[#D4AF37] rounded-full -z-0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              
              {/* WhatsApp Quick Inquiry */}
              <motion.a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="relative hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-emerald-900/10 overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 rounded-full border border-emerald-400 opacity-0 group-hover:animate-ping pointer-events-none" />
                <Phone size={13} className="group-hover:rotate-12 transition-transform duration-200" />
                <span>Quick Inquiry</span>
              </motion.a>

              {/* RFQ basket trigger */}
              <motion.button
                onClick={toggleDrawer}
                data-magnetic
                className="relative p-2.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-stone-300 hover:text-white flex items-center justify-center"
                aria-label={`Open quote basket (${totalItems} items)`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <ShoppingBasket size={19} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center bg-[#D4AF37] text-[#2C2520] text-[10px] font-black rounded-full shadow-md shadow-black/20"
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile hamburger menu trigger (Custom SVG Morphing) */}
              <motion.button
                className="lg:hidden p-2 text-stone-200 hover:text-white focus:outline-none flex items-center justify-center"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle mobile menu"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <svg width="20" height="20" viewBox="0 0 23 23" className="w-5 h-5">
                  <Path
                    variants={{
                      closed: { d: "M 2 2.5 L 20 2.5" },
                      open: { d: "M 3 16.5 L 17 2.5" }
                    }}
                    animate={mobileOpen ? "open" : "closed"}
                    transition={{ duration: 0.3 }}
                  />
                  <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    animate={mobileOpen ? "open" : "closed"}
                    transition={{ duration: 0.2 }}
                  />
                  <Path
                    variants={{
                      closed: { d: "M 2 16.346 L 20 16.346" },
                      open: { d: "M 3 2.5 L 17 16.346" }
                    }}
                    animate={mobileOpen ? "open" : "closed"}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </motion.button>

            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in drawer menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-[#2C2520] pt-16 px-6 lg:hidden flex flex-col justify-between pb-10"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {/* Background texture overlay */}
            <div className="absolute inset-0 opacity-5 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url('/src/assets/wood-bg.png')` }}
            />

            <nav className="relative z-10 flex flex-col gap-5 mt-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-bold text-stone-200 hover:text-[#D4AF37] transition-colors flex items-center justify-between group py-1.5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 150 }}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-300">
                    ➔
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="relative z-10 space-y-4">
              <a
                href="https://wa.me/919999999999"
                className="flex items-center justify-center gap-2.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/20 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Phone size={16} />
                Chat on WhatsApp
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  toggleDrawer();
                }}
                className="flex items-center justify-center gap-2.5 w-full bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 py-4 rounded-xl font-semibold text-sm transition-colors"
              >
                <ShoppingBasket size={16} />
                View RFQ Basket
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
