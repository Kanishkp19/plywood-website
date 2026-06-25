/**
 * Navbar.jsx
 * Sticky navigation bar.
 * Pure charcoal on scroll; transparent over the hero video.
 * Contains the brand mark, nav links, quote basket trigger, and WhatsApp shortcut.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, Phone, Menu, X } from "lucide-react";
import { useQuote } from "../../context/QuoteContext";

const NAV_LINKS = [
  { label: "Our Scale", href: "#trust" },
  { label: "Catalog", href: "#catalog" },
  { label: "Services", href: "#services" },
  { label: "Partner With Us", href: "#retailer-hub" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleDrawer } = useQuote();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled
    ? "bg-[#2C2520]/95 backdrop-blur-md shadow-lg shadow-stone-900/20"
    : "bg-transparent";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${navBg}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Brand */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-sm bg-[#D4AF37] flex items-center justify-center">
                <span className="text-[#2C2520] font-black text-sm leading-none">V</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-none tracking-wide">
                  Vishal Ply
                </p>
                <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase leading-none mt-0.5">
                  Jodhpur
                </p>
              </div>
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-stone-300 hover:text-white text-sm tracking-wide transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* WhatsApp quick-call */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors duration-200"
                aria-label="WhatsApp us"
              >
                <Phone size={12} />
                <span className="hidden md:inline">Quick Inquiry</span>
              </a>

              {/* RFQ basket */}
              <button
                onClick={toggleDrawer}
                className="relative p-2.5 rounded-full hover:bg-white/10 transition-colors text-stone-300 hover:text-white"
                aria-label={`Open quote basket (${totalItems} items)`}
              >
                <ShoppingBasket size={20} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center bg-[#D4AF37] text-[#2C2520] text-[9px] font-bold rounded-full px-1"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 text-stone-300 hover:text-white"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-[#2C2520] pt-20 px-6 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-semibold text-stone-200 hover:text-[#D4AF37] transition-colors"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="absolute bottom-10 left-6 right-6">
              <a
                href="https://wa.me/919999999999"
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-4 rounded-xl font-medium text-sm"
              >
                <Phone size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
