/**
 * BentoCatalog.jsx
 * Section 3: Asymmetrical Bento Box Product Catalog Grid.
 * Large feature cards mixed with smaller square cards.
 * Magnetic hover: card lifts, shadow deepens, image scales, arrow appears.
 */

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useQuote } from "../../context/QuoteContext";

// ── Product catalog data ──────────────────────
const PRODUCTS = [
  {
    id: "marine-ply",
    name: "Marine Plywood",
    category: "Core Range",
    description: "BWR / IS:710 certified. Boiling water-resistant construction-grade ply for humid and structural applications.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "#4A7C59",
    size: "large", // spans 2 columns
    badge: "Best Seller",
    thickness: "6mm – 25mm",
    unit: "sheets",
  },
  {
    id: "commercial-ply",
    name: "Commercial Plywood",
    category: "Core Range",
    description: "MR-grade interiors ply — ideal for furniture, cabinets, and panelling.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    accent: "#8B6914",
    size: "small",
    thickness: "3mm – 19mm",
    unit: "sheets",
  },
  {
    id: "blockboards",
    name: "Blockboards",
    category: "Structural",
    description: "Solid timber batten core — high rigidity over long spans. Perfect for shelving, doors, and tabletops.",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&q=80",
    accent: "#7B4F2E",
    size: "small",
    thickness: "12mm – 25mm",
    unit: "sheets",
  },
  {
    id: "flush-doors",
    name: "Flush Doors",
    category: "Finished Goods",
    description: "Factory-finished flush doors with solid core, honeycomb, or particleboard fill. Ready-to-install for contractors.",
    image: "https://images.unsplash.com/photo-1558618047-fcd8e7f6b8ca?w=800&q=80",
    accent: "#5C4B3A",
    size: "large",
    badge: "High Demand",
    thickness: "30mm – 45mm",
    unit: "units",
  },
  {
    id: "veneers",
    name: "Decorative Veneers",
    category: "Premium",
    description: "Teak, walnut, oak, and wenge face veneers for luxury interior finishing.",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80",
    accent: "#9C4A1A",
    size: "small",
    thickness: "0.5mm – 3mm",
    unit: "sq ft",
  },
];

// ── Magnetic card component ──────────────────
function CatalogCard({ product, className = "" }) {
  const { addItem } = useQuote();
  const cardRef = useRef(null);

  // Magnetic tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), {
    stiffness: 200, damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), {
    stiffness: 200, damping: 25,
  });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
    scale.set(1.02);
  }, [mouseX, mouseY, scale]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  }, [mouseX, mouseY, scale]);

  const isLarge = product.size === "large";

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${className}`}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ boxShadow: "0 32px 64px -12px rgba(44,37,32,0.35)" }}
      transition={{ boxShadow: { duration: 0.25 } }}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2520]/90 via-[#2C2520]/30 to-transparent" />
      </div>

      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white"
            style={{ background: product.accent + "cc" }}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Arrow — slides in on hover */}
      <motion.div
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center"
        initial={{ opacity: 0, x: 8, y: -8 }}
        whileHover={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight size={16} className="text-[#2C2520]" />
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <p
          className="text-xs tracking-widest uppercase font-medium mb-1"
          style={{ color: product.accent === "#4A7C59" ? "#6DCB92" : "#D4AF37" }}
        >
          {product.category}
        </p>
        <h3 className="text-white font-bold text-xl lg:text-2xl mb-1">{product.name}</h3>

        {/* Description — slides up on hover */}
        <motion.p
          className="text-stone-300 text-sm leading-snug mb-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {product.description}
        </motion.p>

        <div className="flex items-center justify-between">
          <span className="text-stone-400 text-xs">{product.thickness}</span>

          {/* Add to quote button */}
          <motion.button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                category: product.category,
                thickness: product.thickness,
                unit: product.unit,
              })
            }
            className="flex items-center gap-1.5 bg-[#D4AF37] text-[#2C2520] text-xs font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={12} />
            Add to Quote
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────
export default function BentoCatalog() {
  const large = PRODUCTS.filter((p) => p.size === "large");
  const small = PRODUCTS.filter((p) => p.size === "small");

  return (
    <section id="catalog" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium">
                Product Catalog
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#FDFBF7] leading-tight">
              Everything your project needs,{" "}
              <br className="hidden sm:block" />
              <span className="text-[#D4AF37]">under one roof.</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-sm text-stone-400 hover:text-white underline underline-offset-4 decoration-stone-600 hover:decoration-[#D4AF37] transition-all shrink-0"
          >
            Download Full Catalog PDF →
          </a>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, staggerChildren: 0.08 }}
          style={{ perspective: "1200px" }}
        >
          {/* Marine Plywood — spans 2 cols, 2 rows */}
          <motion.div
            className="lg:col-span-2 lg:row-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CatalogCard product={PRODUCTS[0]} className="h-full" />
          </motion.div>

          {/* Commercial Plywood */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <CatalogCard product={PRODUCTS[1]} className="h-full" />
          </motion.div>

          {/* Blockboards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <CatalogCard product={PRODUCTS[2]} className="h-full" />
          </motion.div>

          {/* Flush Doors — spans 2 cols */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <CatalogCard product={PRODUCTS[3]} className="h-full" />
          </motion.div>

          {/* Decorative Veneers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <CatalogCard product={PRODUCTS[4]} className="h-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
