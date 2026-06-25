/**
 * Footer.jsx
 * Full-bleed footer using the walnut wood texture with a dark overlay.
 * Contains contact info, navigation, and brand details for Jodhpur's best wholesale ply supplier.
 * Features a full-width embedded Google Maps locator for the Mandore Road warehouse.
 */

import { MapPin, Phone, Mail, ExternalLink, Navigation } from "lucide-react";
import woodBg from "../../assets/wood-bg.png";

const FOOTER_NAV = {
  Products: ["Marine Plywood", "Commercial Plywood", "Blockboards", "Flush Doors", "Decorative Veneers"],
  Services: ["Custom Cutting", "Wood Polishing", "Preservation Treatments", "Bulk Delivery", "Retailer Partnership"],
  Company: ["About Us", "Our Infrastructure", "Gallery", "Careers", "Contact"],
};

// Mandore Road Industrial Area, Jodhpur — 26.3498° N, 73.0243° E
const MAP_SRC = "https://maps.google.com/maps?q=26.3498,73.0243&z=15&output=embed";
const MAPS_LINK = "https://www.google.com/maps?q=26.3498,73.0243";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative"
      style={{
        backgroundImage: `url(${woodBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#110b08]/90" />

      <div className="relative z-10">

        {/* ── Full-width Google Maps embed ── */}
        <div className="relative w-full overflow-hidden border-b border-white/5">
          <iframe
            title="Vishal Ply & Boards — Warehouse Location, Jodhpur"
            src={MAP_SRC}
            width="100%"
            height="380"
            style={{
              border: 0,
              display: "block",
              filter: "invert(90%) hue-rotate(180deg) brightness(0.82) saturate(0.75)",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#110b08]/80 to-transparent pointer-events-none" />

          {/* Bottom branded overlay bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#110b08] via-[#110b08]/85 to-transparent px-6 sm:px-10 lg:px-16 pt-16 pb-5 flex flex-col sm:flex-row items-end justify-between gap-4 pointer-events-none">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Navigation size={12} className="text-[#D4AF37]" />
                <p className="text-[#D4AF37] text-[11px] font-bold tracking-[0.25em] uppercase leading-none">
                  Vishal Ply & Boards — HQ Warehouse
                </p>
              </div>
              <p className="text-stone-300 text-sm font-medium">
                Industrial Area Phase II, Mandore Road, Jodhpur, Rajasthan — 342007
              </p>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-white bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap shadow-lg shadow-black/20"
            >
              <ExternalLink size={13} />
              Get Directions
            </a>
          </div>
        </div>

        {/* ── Main footer content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Contact + Nav Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 pb-12 border-b border-white/10">

            {/* Brand & Contact column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-[#D4AF37] flex items-center justify-center shadow-md shadow-[#D4AF37]/15">
                  <span className="text-[#2C2520] font-black text-base">V</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-none">Vishal Ply & Boards</p>
                  <p className="text-[#D4AF37] text-xs tracking-widest uppercase mt-1">
                    Jodhpur's Wholesale Timber Authority
                  </p>
                </div>
              </div>

              <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
                Supplying Rajasthan's finest contractors and retailers since 1998. From our 40,000 sq ft
                warehouse in Jodhpur, we move over 500 tonnes of certified plywood every month.
              </p>

              {/* Contact details */}
              <div className="space-y-3">
                <a href="tel:+919999999999" className="flex items-center gap-3 text-stone-300 hover:text-[#D4AF37] transition-colors text-sm group">
                  <Phone size={14} className="text-[#D4AF37] shrink-0" />
                  +91 99999 99999 (Wholesale Inquiries)
                </a>
                <a href="mailto:wholesale@vishalply.com" className="flex items-center gap-3 text-[#D4AF37]/85 hover:text-[#D4AF37] transition-colors text-sm group font-medium">
                  <Mail size={14} className="text-[#D4AF37] shrink-0" />
                  wholesale@vishalply.com
                </a>
                <div className="flex items-start gap-3 text-stone-300 text-sm">
                  <MapPin size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    Industrial Area Phase II, Mandore Road,<br />
                    Jodhpur, Rajasthan — 342007
                  </span>
                </div>
              </div>
            </div>

            {/* Nav columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {Object.entries(FOOTER_NAV).map(([heading, links]) => (
                <div key={heading}>
                  <h3 className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-5">
                    {heading}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-stone-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                        >
                          <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-[#D4AF37]">›</span>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
            <p className="text-stone-500 text-xs">
              © {new Date().getFullYear()} Vishal Ply & Boards, Jodhpur. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-stone-500 hover:text-stone-300 text-xs transition-colors">Privacy Policy</a>
              <span className="text-stone-700">·</span>
              <a href="#" className="text-stone-500 hover:text-stone-300 text-xs transition-colors">Dealer Terms</a>
              <span className="text-stone-700">·</span>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-[#D4AF37] text-xs transition-colors flex items-center gap-1"
              >
                Find us on Maps
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
