/**
 * Home.jsx
 * Master page that composes all five sections in order:
 *   1. HeroSection      — Staggered text reveal + video background
 *   2. TrustMatrix      — Count-up stats (Our Scale)
 *   3. BentoCatalog     — Asymmetrical bento product grid
 *   4. ServiceTheater   — Before/after polishing + service cards
 *   5. RetailerHub      — B2B CTA with drawing border animation
 */

import HeroSection from "../components/sections/HeroSection";
import TrustMatrix from "../components/sections/TrustMatrix";
import BentoCatalog from "../components/sections/BentoCatalog";
import ServiceTheater from "../components/sections/ServiceTheater";
import RetailerHub from "../components/sections/RetailerHub";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustMatrix />
      <BentoCatalog />
      <ServiceTheater />
      <RetailerHub />
    </main>
  );
}
