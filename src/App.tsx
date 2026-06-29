import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  RotateCw, 
  Sliders, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Zap, 
  Target, 
  Award, 
  Instagram, 
  Twitter, 
  Facebook, 
  ShoppingBag,
  Info
} from "lucide-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EngineeringSection from "./components/EngineeringSection";
import { NavLink, StatItem, EngStatItem } from "./types";

// Static asset constants from dynamic generations
const HERO_BOOT_IMAGE = "/src/assets/images/hero_football_boot_png_1781177205411.png";
const SOLEPLATE_IMAGE = "/src/assets/images/boot_engineering_png_1781177224888.png";

// Nav links definitions
const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Engineering", href: "#engineering" },
  { label: "Configurator", href: "#configurator" },
  { label: "Legacy & Fit", href: "#heritage" },
];

export default function App() {
  // Preloading & Animation State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<"home" | "engineering" | "configurator" | "heritage">("home");
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 240;
    const imgs: HTMLImageElement[] = [];

    const onImageLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      if (loadedCount === totalFrames) {
        setIsLoaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const padNum = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${padNum}.jpg`;
      img.onload = onImageLoad;
      img.onerror = onImageLoad;
      imgs.push(img);
    }
    
    imagesRef.current = imgs;
  }, []);

  // Section Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -35% 0px",
      threshold: 0.1
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "home" || id === "engineering" || id === "configurator" || id === "heritage") {
            setActiveSection(id as any);
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    ["home", "engineering", "configurator", "heritage"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  // Animation Loop
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId: number;
    const easeFactor = 0.08;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      // Always pin to full window dimensions for true fullscreen
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      context.setTransform(1, 0, 0, 1, 0, 0); // reset scale before re-applying
      context.scale(dpr, dpr);
      drawFrame(Math.round(currentFrameRef.current));
    };

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      context.clearRect(0, 0, width, height);

      const imgWidth = img.width;
      const imgHeight = img.height;
      const canvasRatio = width / height;
      const imageRatio = imgWidth / imgHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio > imageRatio) {
        drawWidth = width;
        drawHeight = width / imageRatio;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imageRatio;
        drawHeight = height;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const getScrollFraction = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return Math.min(1, Math.max(0, scrollTop / maxScroll));
    };

    const updateLoop = () => {
      const scrollFraction = getScrollFraction();
      targetFrameRef.current = scrollFraction * 239;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * easeFactor;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      drawFrame(Math.round(currentFrameRef.current));
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    updateLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  // Configurator state variables
  const [selectedSpec, setSelectedSpec] = useState<"speed" | "control" | "traction">("speed");
  const [selectedSize, setSelectedSize] = useState<string>("US 9.5");
  const [activeColorway, setActiveColorway] = useState<string>("volt");
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [reservationName, setReservationName] = useState<string>("");

  // Lock scroll when loader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  // Statistics for components
  const heroStats: StatItem[] = [
    { number: "98%", label: "Player Satisfaction" },
    { number: "250K+", label: "Pairs Sold Worldwide" }
  ];

  const engineeringStats: EngStatItem[] = [
    { label: "FRAMEWEIGHT", value: "142 Grams Total" },
    { label: "AGILITY BOOST", value: "+15% Reactive Edge" }
  ];

  const specsList = {
    speed: {
      title: "V12 Speed Chassis",
      badge: "ULTRA AGILITY",
      description: "Constructed with structural carbon composite. Energy transfers seamlessly from ground contact to immediate mid-sole pushback, cutting down split seconds during explosive accelerations.",
      stats: [
        { label: "Weight", value: "142g" },
        { label: "Sprint Eff.", value: "99.4%" },
        { label: "Flex Rate", value: "High-Response" }
      ],
      icon: Zap
    },
    control: {
      title: "Micro-Touch Vamp",
      badge: "BALL CONTROL",
      description: "Engineered raised silicon micro-ribs patterned systematically across the primary strike zone. Increases surface friction, enabling perfect touch in wet and dry conditions.",
      stats: [
        { label: "Contact Grips", value: "840 points" },
        { label: "Wet Friction", value: "+24%" },
        { label: "Upper Shell", value: "0.8mm Matrix" }
      ],
      icon: Target
    },
    traction: {
      title: "Carbon Traction Array",
      badge: "ROTATIONAL GRIP",
      description: "Engineered using multi-directional chevron studs designed to dig and release instantly. This mitigates ankle rotational strain while letting you turn on a dime at top speed.",
      stats: [
        { label: "Stud Count", value: "11 Multi-stud" },
        { label: "Torque Release", value: "0.04s" },
        { label: "Sole Material", value: "Full Carbon" }
      ],
      icon: Award
    }
  };

  const handlePreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationName.trim()) return;
    setIsReserved(true);
  };

  // Quick reset for order demo
  const resetReservation = () => {
    setIsReserved(false);
    setReservationName("");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-primary-teal selection:text-black" style={{ position: "relative", zIndex: 1 }}>
      
      {/* Premium Loader Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="flex flex-col items-center w-[90%] max-w-[320px]">
            <div className="text-white text-3xl font-extrabold tracking-[0.5em] mr-[-0.5em] mb-3 animate-pulse">VERDANT</div>
            <div className="font-mono text-[9px] tracking-[0.25em] text-white/40 mb-8">INITIALIZING ASSET COMPILER</div>
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-primary-teal shadow-[0_0_12px_#00dfb8]" 
                style={{ width: `${loadProgress}%`, transition: "width 0.1s ease-out" }}
              />
            </div>
            <div className="font-mono text-primary-teal font-bold text-lg">{loadProgress.toString().padStart(2, '0')}%</div>
          </div>
        </div>
      )}

      {/* Full-Page Sticky Canvas Background */}
      {isLoaded && (
        <div className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          {/* The canvas itself — fills entire viewport */}
          <canvas 
            ref={canvasRef} 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              filter: activeColorway === "volt-blue" 
                ? "hue-rotate(90deg) saturate(1.1)" 
                : activeColorway === "volt-red" 
                ? "hue-rotate(240deg) saturate(1.2)" 
                : "none"
            }}
          />
          {/* Dark gradient overlay so text remains legible */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.5) 100%)"
            }}
          />
        </div>
      )}

      {/* Floating Pill Header */}
      <Navbar links={navLinks} />

      {/* Hero Presentation */}
      <HeroSection stats={heroStats} imageUrl={HERO_BOOT_IMAGE} />

      {/* Engineering Blueprint Showcase */}
      <EngineeringSection stats={engineeringStats} imageUrl={SOLEPLATE_IMAGE} />

      {/* Interactive Customizer & Specs Section */}
      <section 
        id="configurator" 
        className="relative min-h-screen px-[8%] py-24 max-w-[1400px] mx-auto border-t border-white/5 flex flex-col justify-center text-white"
      >
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-primary-teal/5 blur-[120px] pointer-events-none -z-10" />

        <div className="mb-14 text-center md:text-left">
          <div className="badge bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] inline-flex items-center gap-2 mb-4 uppercase tracking-wider font-semibold select-none">
            <Sliders className="w-3 h-3 text-primary-teal" />
            <span>Interactive Performance Hub</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Select Your Advantage
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-[600px]">
            Explore the advanced materials and engineering components that make the Verdant Series the fastest boot in the game.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full" id="configurator-board">
          {/* Configurator Left Selectors (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-3" id="configurator-selectors">
            {(Object.keys(specsList) as Array<keyof typeof specsList>).map((key) => {
              const spec = specsList[key];
              const IconComp = spec.icon;
              const isSelected = selectedSpec === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedSpec(key)}
                  className={`relative text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    isSelected 
                      ? "bg-white/[0.12] backdrop-blur-md border-primary-teal/40 shadow-[0_4px_24px_rgba(0,223,184,0.1)]" 
                      : "bg-black/40 backdrop-blur-sm hover:bg-white/[0.08] border-white/[0.06] hover:border-white/10"
                  }`}
                  id={`config-btn-${key}`}
                >
                  <div className={`p-2.5 rounded-xl ${isSelected ? "bg-primary-teal text-black" : "bg-white/5 text-white/80"}`} id={`config-icon-${key}`}>
                    <IconComp className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-white mb-1">
                      {spec.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-primary-teal tracking-[1px] uppercase">
                      {spec.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <motion.div 
                      layoutId="tabUnderlayBorder"
                      className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Technical Specifications Panel (Col 8) */}
          <div className="lg:col-span-8 bg-black/50 backdrop-blur-md border border-white/[0.06] p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[440px]" id="configurator-details">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Spec Details with Exit & Entry Animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSpec}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between"
                id={`tech-specs-${selectedSpec}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary-teal/15 text-primary-teal px-3 py-1 rounded-full text-[9px] tracking-wider font-mono font-bold uppercase select-none">
                      {specsList[selectedSpec].badge}
                    </span>
                    <span className="text-white/40 font-mono text-[10px] uppercase">Spec Code: VRT-00{selectedSpec === 'speed' ? '1' : selectedSpec === 'control' ? '2' : '3'}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight leading-none">
                    {specsList[selectedSpec].title}
                  </h3>
                  <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed max-w-[560px] mb-8">
                    {specsList[selectedSpec].description}
                  </p>
                </div>

                {/* Micro tech metrics stats */}
                <div>
                  <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 w-full" id={`specs-grid-${selectedSpec}`}>
                    {specsList[selectedSpec].stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider">{stat.label}</span>
                        <span className="text-base sm:text-lg font-bold text-white tracking-tight">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Pre-order configuration options inside */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    {/* Size Selectors */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-white/40 tracking-wider">SELECT PLAYER SIZE (US MENS)</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {["US 8", "US 9", "US 9.5", "US 10", "US 11"].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`text-xs px-3.5 py-2 rounded-lg font-mono font-semibold transition-all border ${
                              selectedSize === size
                                ? "bg-primary-teal text-black border-primary-teal"
                                : "bg-white/5 border-transparent text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                            id={`size-btn-${size.replace(" ", "-")}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color filter hue emulation */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-white/40 tracking-wider">SELECT COLORWAY</span>
                      <div className="flex items-center gap-2">
                        {[
                          { id: "volt", name: "Volt", color: "bg-[#00dfb8]" },
                          { id: "volt-blue", name: "Azure Volt", color: "bg-cyan-500" },
                          { id: "volt-red", name: "Crimson Volt", color: "bg-rose-500" }
                        ].map((way) => (
                          <button
                            key={way.id}
                            title={way.name}
                            onClick={() => {
                              setActiveColorway(way.id);
                            }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                              activeColorway === way.id ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                            id={`colorway-btn-${way.id}`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full ${way.color}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Reservation Panel at the bottom of configurator */}
        <div className="mt-14 w-full max-w-[1100px] mx-auto bg-black/50 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl" id="reservation-card">
          <AnimatePresence mode="wait">
            {!isReserved ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handlePreOrder}
                className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-teal animate-pulse" />
                    Reserve Your Pair Today
                  </h3>
                  <p className="text-white/50 text-xs sm:text-sm max-w-[500px]">
                    Demand for the first production run is extremely high. Insert your name to secure a placement for your selected size <span className="text-primary-teal font-mono">{selectedSize}</span> in our priority queue.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch gap-3 min-w-[320px] md:min-w-[420px]">
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={reservationName}
                    onChange={(e) => setReservationName(e.target.value)}
                    className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-primary-teal/60 focus:bg-white/[0.08] transition-all flex-1"
                    id="reserve-name-input"
                  />
                  <button
                    type="submit"
                    className="bg-primary-teal text-black px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-[#00ebd0] transition-colors flex items-center justify-center gap-1.5 select-none"
                    id="reserve-submit-btn"
                  >
                    Confirm Queue
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                id="reserve-success-message"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 bg-primary-teal/10 rounded-2xl flex items-center justify-center text-primary-teal border border-primary-teal/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Reservation Locked In!
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm">
                      Congratulations, <span className="text-white font-semibold">{reservationName}</span>. We've reserved a production allocation for size <span className="text-primary-teal font-mono font-semibold">{selectedSize}</span>. You're set to experience speed unleashed.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetReservation}
                  className="text-xs text-white/40 hover:text-white flex items-center gap-1 border border-white/5 hover:border-white/20 bg-white/[0.02] py-2 px-4 rounded-lg transition-all"
                  id="reserve-reset-btn"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Reserve another size
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Brand Heritage & Technical Pitch Section */}
      <section 
        id="heritage" 
        className="relative py-24 px-[8%] max-w-[1400px] mx-auto border-t border-white/5 flex flex-col justify-center text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" id="heritage-container">
          {/* Left Block */}
          <div className="flex flex-col items-start" id="heritage-pitch-content">
            <div className="badge bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] inline-flex items-center gap-2 mb-6 uppercase tracking-wider font-semibold select-none">
              <Compass className="w-3 h-3 text-primary-teal" />
              <span>Verdant Heritage</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
              Designed for the High-Speed Modern Pitch
            </h2>
            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed mb-6">
              Modern football has transformed. Play is faster, spaces are tighter, and reaction windows require instantaneous reflexes. Standard boots carry heavy, sluggish rubber structures that hold athletes back. 
            </p>
            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed">
              We took a clean, architectural approach to boot engineering. Stripping away ornamental design overlays, we created an active outer shell that directly mirrors your skeletal anatomy, producing the most efficient strength-to-weight profile in football history.
            </p>
          </div>

          {/* Right Block - Graphic Specification Key */}
          <div className="bg-black/50 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 sm:p-8 flex flex-col gap-6" id="spec-key-card">
            <h3 className="font-semibold text-sm uppercase tracking-[1.5px] text-white flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-primary-teal" />
              Verdant Physical Specs (V-Speed Series)
            </h3>

            <div className="flex flex-col gap-4 divide-y divide-white/5">
              {[
                { name: "Upper Material", desc: "Verdant-Matrix mesh, water-repellent micro-coating" },
                { name: "Outsole plate", desc: "V12 responsive unidirectional Carbon Fiber" },
                { name: "Stud configuration", desc: "11 hybrid chevrons optimized for synthetic & natural turf" },
                { name: "Lacing loop array", desc: "Asymmetric ergonomic offset layout" }
              ].map((item, idx) => (
                <div key={idx} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-sm font-semibold text-white/90">{item.name}</span>
                  <span className="text-xs text-white/50 font-mono text-left sm:text-right">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Premium Footer */}
      <footer className="bg-black/60 backdrop-blur-md border-t border-white/5 py-16 px-[8%] text-white select-none">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left" id="app-footer">
          {/* Logo & copyright */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div className="flex items-center gap-2 font-bold tracking-[1.5px] text-[13px] uppercase">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-primary-teal">
                <path d="M21,3c0,0-5.1,0-10.5,5.4C5.1,13.8,3,21,3,21s7.2-2.1,12.6-7.5C21,8.1,21,3,21,3z" />
              </svg>
              <span>Verdant</span>
            </div>
            <p className="text-xs text-white/40">
              © 2026 Verdant Athletics Inc. Engineered for Speed. Built to Win.
            </p>
          </div>

          {/* Social Network Links */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="w-9 h-9 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-all border border-white/5 hover:border-white/10"
              aria-label="Instagram Link"
              id="footer-social-ig"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="w-9 h-9 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-all border border-white/5 hover:border-white/10"
              aria-label="Twitter Link"
              id="footer-social-tw"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="w-9 h-9 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-all border border-white/5 hover:border-white/10"
              aria-label="Facebook Link"
              id="footer-social-fb"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
