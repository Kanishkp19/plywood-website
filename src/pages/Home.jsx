/**
 * Home.jsx
 * Master page that composes all nine sections in order:
 *   1. HeroSection         — Staggered text reveal + video background
 *   2. TrustMatrix         — Count-up stats (Our Scale)
 *   3. FinishConfigurator  — Material + finish interactive selector
 *   4. InfrastructureTour  — Masonry tour of Mandore warehouse scale
 *   5. ServiceTheater      — Custom wood polishing & sizing show
 *   6. DeliveryMap         — Stylized SVG Rajasthan delivery schedule map
 *   7. ReviewsSection      — Premium B2B reviews/testimonials grid
 *   8. RetailerHub         — 3-step B2B partner onboarding wizard
 *   9. TechVault           — Gated PDF technical spec downloads
 */

import HeroSection from "../components/sections/HeroSection";
import TrustMatrix from "../components/sections/TrustMatrix";
import FinishConfigurator from "../components/sections/FinishConfigurator";
import InfrastructureTour from "../components/sections/InfrastructureTour";
import ServiceTheater from "../components/sections/ServiceTheater";
import DeliveryMap from "../components/sections/DeliveryMap";
import ReviewsSection from "../components/sections/ReviewsSection";
import RetailerHub from "../components/sections/RetailerHub";
import TechVault from "../components/sections/TechVault";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustMatrix />
      <FinishConfigurator />
      <InfrastructureTour />
      <ServiceTheater />
      <DeliveryMap />
      <ReviewsSection />
      <RetailerHub />
      <TechVault />
    </main>
  );
}
