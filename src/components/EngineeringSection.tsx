import { motion } from "motion/react";
import { EngStatItem } from "../types";

interface EngineeringSectionProps {
  stats: EngStatItem[];
  imageUrl: string;
}

export default function EngineeringSection({ stats, imageUrl }: EngineeringSectionProps) {
  return (
    <section
      id="engineering"
      className="relative min-h-[90vh] md:min-h-screen py-24 px-[8%] max-w-[1400px] mx-auto flex items-center border-t border-white/5 overflow-hidden text-white selection:bg-primary-teal selection:text-black"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-primary-teal/5 blur-[120px] pointer-events-none -z-10" />

      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center"
        id="engineering-grid-container"
      >
        {/* Left Side: Professional Product Zoom Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] aspect-[4/3] md:aspect-auto md:h-[480px] w-full flex items-center justify-center bg-transparent group"
          id="engineering-visual"
        >
          {/* Decorative frame elements to imply high-end manufacturing */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-primary-teal/40 group-hover:border-primary-teal group-hover:scale-110 transition-all duration-500" />
          <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-primary-teal/40 group-hover:border-primary-teal group-hover:scale-110 transition-all duration-500" />
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-primary-teal/40 group-hover:border-primary-teal group-hover:scale-110 transition-all duration-500" />
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-primary-teal/40 group-hover:border-primary-teal group-hover:scale-110 transition-all duration-500" />

          {/* Glowing subtle mesh overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-stone-950/20 to-transparent z-10 opacity-85" />

          {/* Micro HUD Overlay */}
          <div className="absolute bottom-5 left-6 z-15 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-teal rounded-full animate-ping" />
            <span className="font-mono text-[9px] tracking-[1.5px] text-white/50 uppercase">
              Chassis Scan Active
            </span>
          </div>
        </motion.div>

        {/* Right Side: Engineering specs and statistics content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-start md:pl-8 lg:pl-12"
          id="engineering-content-right"
        >
          <div className="badge bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] inline-flex items-center gap-2 mb-6 uppercase tracking-wider font-semibold select-none">
            <span className="text-primary-teal">●</span> 
            <span>Engineering Stats</span>
          </div>

          <h2 className="text-4xl lg:text-[52px] font-bold tracking-tight mb-6 leading-[1.1] text-white selection:bg-primary-teal selection:text-black">
            Ultra-Light <br />
            Construction
          </h2>

          <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed mb-10 max-w-[480px]">
            Move faster with a state-of-the-art lightweight chassis engineered to minimize deadweight while maximizing ground force return and lateral responsiveness.
          </p>

          <div className="flex gap-10 lg:gap-14 bg-white/[0.02] border border-white/5 p-6 rounded-2xl w-full sm:w-auto" id="eng-stats-grid">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col gap-2" id={`eng-stat-${index}`}>
                <span className="font-mono text-[10px] text-white/50 font-semibold uppercase tracking-[1.5px]">
                  {stat.label}
                </span>
                <span className="text-lg md:text-xl font-bold text-white tracking-wide">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
