/**
 * QuoteDrawer.jsx
 * Slide-in panel from the right showing the current RFQ (Request for Quote) basket.
 * Retailers can adjust quantities and submit their bulk inquiry from here.
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, Send } from "lucide-react";
import { useQuote } from "../../context/QuoteContext";

export default function QuoteDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, clearQuote, totalItems } =
    useQuote();

  const handleSubmit = () => {
    // In production: wire to your backend / WhatsApp API / CRM
    const message = items
      .map((i) => `• ${i.name} (${i.thickness}) — ${i.quantity} ${i.unit}`)
      .join("\n");
    const waText = encodeURIComponent(
      `Hello, I'd like a wholesale quote for:\n\n${message}\n\nPlease share your best bulk pricing.`
    );
    window.open(`https://wa.me/919999999999?text=${waText}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1C1714] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <p className="text-xs tracking-widest uppercase text-[#D4AF37] font-medium mb-0.5">
                  Wholesale Inquiry
                </p>
                <h2 className="text-xl font-semibold text-white">
                  Your Quote Basket
                  {totalItems > 0 && (
                    <span className="ml-2 text-sm font-normal text-stone-400">
                      ({totalItems} item{totalItems !== 1 ? "s" : ""})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-stone-400 hover:text-white"
                aria-label="Close quote drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-stone-400 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                    </svg>
                  </div>
                  <p className="font-medium text-stone-300">Your quote basket is empty</p>
                  <p className="text-sm">Browse the catalog and add items to request bulk pricing.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-white text-sm">{item.name}</p>
                        {item.thickness && (
                          <p className="text-xs text-stone-400 mt-0.5">{item.thickness} — {item.category}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-950/20 hover:text-red-400 transition-colors text-stone-400"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-stone-300 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-stone-300"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-xs text-stone-400">{item.unit || "sheets"}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer — CTA */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 space-y-3">
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#b8962e] text-[#2C2520] font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-sm tracking-wide"
                >
                  <Send size={16} />
                  Send Bulk Inquiry via WhatsApp
                </button>
                <button
                  onClick={clearQuote}
                  className="w-full text-center text-xs text-stone-500 hover:text-stone-300 transition-colors py-1"
                >
                  Clear all items
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
