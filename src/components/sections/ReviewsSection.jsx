/**
 * ReviewsSection.jsx
 * Section 7: B2B Verified Testimonials & Reviews.
 * Renders a premium, 3-column glassmorphic grid of reviews from Rajasthan's leading
 * retailers, contractors, and interior designers, styled in dark walnut with gold accents.
 */

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import woodBg from "../../assets/wood-bg.png";

const REVIEWS = [
  {
    id: 1,
    name: "Rajesh Choudhary",
    role: "Proprietor",
    business: "Choudhary Timber Mart",
    city: "Pali",
    rating: 5,
    date: "May 2026",
    text: "We have been sourcing commercial and marine plywood from Vishal Ply since 2018. Their priority stock allocation during peak season is a lifesaver. The calibration on their Gurjan panels is perfectly consistent, which means our furniture manufacturers face zero reject rates."
  },
  {
    id: 2,
    name: "Ananya Mathur",
    role: "Principal Architect",
    business: "Marwar Design Studio",
    city: "Jodhpur",
    rating: 5,
    date: "June 2026",
    text: "Their custom wood polishing and treatment workshop is exceptional. For our premium residential projects, we ordered high-gloss PU-coated Teak Veneers. The finish was mirror-grade, and our clients were thrilled. They are definitely Jodhpur's timber authority."
  },
  {
    id: 3,
    name: "Vikram Singh Rajput",
    role: "Managing Director",
    business: "Rajputana Builders & Developers",
    city: "Jaipur",
    rating: 5,
    date: "April 2026",
    text: "Sourcing certified IS:710 Marine Plywood for our villa projects requires absolute trust. Vishal Ply's Tech Vault made it incredibly easy to retrieve and present certified laboratory test reports to our structural consultants. Highly recommended for high-volume contract orders."
  },
  {
    id: 4,
    name: "Suresh Mewara",
    role: "Senior Partner",
    business: "Mewar Ply & Hardware",
    city: "Udaipur",
    rating: 5,
    date: "March 2026",
    text: "Logistics are the biggest bottleneck in our business, but Vishal Ply's 8-truck fleet has solved this. The weekly dispatch to Udaipur is incredibly reliable. We get automatic WhatsApp updates with the manifest the moment the vehicle leaves their Mandore warehouse."
  },
  {
    id: 5,
    name: "Harish Vyas",
    role: "Founder",
    business: "Desert Craft Architects",
    city: "Jaisalmer",
    rating: 5,
    date: "June 2026",
    text: "The precision cutting service is a massive time saver. We send our CAD cutting lists directly to their wholesale desk, and the sheets arrive pre-dimensioned and labeled. It has cut down our on-site carpentry assembly time by nearly 40%."
  },
  {
    id: 6,
    name: "Deepak Meena",
    role: "Director of Procurement",
    business: "Hadoti Retail Hub",
    city: "Kota",
    rating: 5,
    date: "January 2026",
    text: "In the wholesale timber business, capital rotation is key. Vishal Ply's flexible B2B credit terms and transparent dealer pricing tiers have helped us scale our retail distribution network across southeast Rajasthan. A true partner in every sense."
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-14 lg:py-20 overflow-hidden">
      {/* Background container with fixed wood texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${woodBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm tracking-[0.25em] uppercase font-extrabold">
              Voices of Trust
            </span>
            <div className="w-8 h-px bg-[#D4AF37]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-[#FDFBF7] leading-tight"
          >
            What Rajasthan's leading builders &{" "}
            <span className="text-[#D4AF37]">retailers say.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-200 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed font-semibold"
          >
            With over 25 years of timber supply expertise, we have powered projects and stocked showrooms in every corner of the state.
          </motion.p>
        </div>

        {/* 3-Column Masonry/Grid of Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative rounded-2xl bg-[#2C2520]/80 border border-white/10 hover:border-[#D4AF37]/45 p-6 lg:p-8 flex flex-col justify-between transition-all shadow-xl backdrop-blur-sm group"
            >
              {/* Top Row: Quotes & Stars */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
                <Quote size={26} className="text-[#D4AF37]/20 group-hover:text-[#D4AF37]/45 transition-colors" />
              </div>

              {/* Review Text */}
              <p className="text-stone-100 text-base md:text-lg leading-relaxed mb-10 font-medium italic">
                "{review.text}"
              </p>

              {/* Bottom Row: Reviewer Details */}
              <div className="border-t border-white/5 pt-5 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-extrabold text-base">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-base leading-none">{review.name}</h4>
                  <p className="text-stone-300 text-sm mt-1.5 leading-normal font-semibold">
                    {review.role}, <span className="text-white font-bold">{review.business}</span>
                  </p>
                  <p className="text-[#D4AF37] text-xs tracking-wider uppercase mt-1.5 font-bold">
                    {review.city}, Rajasthan · {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
