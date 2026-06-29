import { motion } from "motion/react";
import { Check, ShieldAlert } from "lucide-react";
import { StatItem } from "../types";

interface HeroSectionProps {
  stats: StatItem[];
  imageUrl: string;
}

export default function HeroSection({ stats, imageUrl }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-height-[100vh] xl:min-h-screen flex flex-col md:flex-row items-center justify-between px-[8%] py-28 md:py-36 max-w-[1400px] mx-auto overflow-hidden text-white selection:bg-primary-teal selection:text-black"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary-teal/10 blur-[80px] md:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-white/2 pointer-events-none blur-[100px] -z-10" />

      {/* Hero Content Left */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col items-start z-10"
        id="hero-content-holder"
      >
        <div className="badge bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] inline-flex items-center gap-2 mb-6 uppercase tracking-wider font-semibold select-none">
          <span className="text-primary-teal inline-block animate-pulse">● NEW</span> 
          <span>Verdant Speed Series</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-bold tracking-tight mb-6">
          Engineered for Speed.
          <em className="block font-serif italic font-medium text-primary-teal mt-2 sm:mt-1 not-italic">
            Built to Win.
          </em>
        </h1>

        <p className="description text-white/80 text-[14px] sm:text-[15px] leading-relaxed max-w-[480px] mb-8 font-normal">
          Premium football boots designed for explosive performance, razor-sharp response, and unmatched control on the pitch. Experience the new benchmark of agility.
        </p>

        {/* Call to action and micro features */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto mb-10">
          <a
            href="#engineering"
            className="btn-main bg-primary-teal text-black px-9 py-4 rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_25px_rgba(0,223,184,0.4)] hover:bg-[#00ebd0] transition-all duration-300 text-center flex items-center justify-center gap-2 group cursor-pointer"
            id="hero-cta-button"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("engineering")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop now
            <span className="font-mono text-sm transform group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </a>

          <div className="flex flex-col gap-2.5 sm:pl-3 justify-center">
            <div className="feature-item flex items-center gap-2 text-xs sm:text-[13px] font-medium text-white/90">
              <span className="flex items-center justify-center w-4 h-4 bg-primary-teal/15 rounded-full">
                <Check className="w-2.5 h-2.5 text-primary-teal stroke-[3]" />
              </span>
              Explosive Speed
            </div>
            <div className="feature-item flex items-center gap-2 text-xs sm:text-[13px] font-medium text-white/90">
              <span className="flex items-center justify-center w-4 h-4 bg-primary-teal/15 rounded-full">
                <Check className="w-2.5 h-2.5 text-primary-teal stroke-[3]" />
              </span>
              Precision Control
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Interactive Boot / Visual Render (Center-Right on Desktop, Centered on Mobile) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-1/2 flex items-center justify-center relative mt-8 md:mt-0 select-none"
        id="hero-image-render"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full max-w-[450px] aspect-[16/10] md:aspect-[16/9] flex items-center justify-center group"
        >
          {/* Subtle Outer Glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-teal/20 via-transparent to-transparent rounded-full opacity-60 blur-3xl group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

          {/* Spacer to maintain layout dimensions for the scroll canvas */}
          <div className="w-full aspect-[16/10] md:aspect-[16/9]" />
        </motion.div>
      </motion.div>

      {/* Quick stats floating in lower corner or aligned beautifully */}
      <div
        className="grid grid-cols-2 gap-4 mt-8 md:mt-0 md:absolute md:bottom-12 md:right-[8%] z-20 w-full md:w-auto self-start md:self-auto"
        id="hero-stats-container"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
            className="stat-card bg-black/40 backdrop-blur-md hover:bg-white/[0.08] hover:border-white/10 transition-all p-5 md:py-6 md:px-8 rounded-xl border border-white/[0.06] shadow-md min-w-[170px]"
          >
            <span className="stat-number font-sans font-bold text-2.5xl md:text-3xl block text-white tracking-tight mb-1 mb-0.5">
              {stat.number}
            </span>
            <span className="stat-label text-[10px] text-white/50 uppercase tracking-[1px] font-semibold leading-none">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
