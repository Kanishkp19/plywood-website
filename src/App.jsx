/**
 * App.jsx
 * Application root. Wraps the app in:
 *   - QuoteProvider  (global RFQ state)
 * Renders:
 *   - Navbar
 *   - Home page (all 5 sections)
 *   - Footer
 *   - QuoteDrawer (portal-style slide-in panel)
 *
 * WhatsApp floating button pinned to bottom-right on all pages.
 */

import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import QuoteDrawer from "./components/ui/QuoteDrawer";
import Home from "./pages/Home";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

function WhatsAppFAB() {
  return (
    <motion.a
      href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20wholesale%20quote."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3.5 rounded-full shadow-xl shadow-emerald-900/30 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline text-sm">Quick Inquiry</span>
    </motion.a>
  );
}

export default function App() {
  return (
    <QuoteProvider>
      {/* Sticky navigation */}
      <Navbar />

      {/* Main page content */}
      <Home />

      {/* Footer */}
      <Footer />

      {/* RFQ slide-in drawer */}
      <QuoteDrawer />

      {/* WhatsApp floating action button */}
      <WhatsAppFAB />
    </QuoteProvider>
  );
}
