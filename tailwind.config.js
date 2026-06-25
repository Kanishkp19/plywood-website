/**
 * tailwind.config.js
 * Extends the default Tailwind palette with the "Industrial Luxury" tokens.
 * These match the CSS variables in index.css and the design blueprint exactly.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream:   "#FDFBF7",
        charcoal: "#2C2520",
        gold:    {
          DEFAULT: "#D4AF37",
          dim:     "#b8962e",
          soft:    "#f0d97a",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "wood-gradient":
          "linear-gradient(135deg, #3d2b1f 0%, #6b3e26 50%, #4a2c17 100%)",
      },
      animation: {
        "border-pulse": "borderPulse 2s ease-in-out infinite",
      },
      keyframes: {
        borderPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
