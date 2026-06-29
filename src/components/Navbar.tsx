import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShieldAlert } from "lucide-react";
import { NavLink } from "../types";

interface NavbarProps {
  links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
  const [activeHash, setActiveHash] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth scroll helper
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveHash(href);
    setIsMobileMenuOpen(false);

    if (href === "#") return;
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Listen to scroll to update background or active link shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple intersection-style active states
      const sections = ["home", "engineering"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveHash(`#${section}`);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] rounded-full px-5 py-2.5 md:py-2 md:pl-6 md:pr-3 flex items-center justify-between z-50 border border-white/5 transition-all duration-300 md:h-14 ${
          isScrolled
            ? "bg-stone-950/90 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl border-white/10"
            : "bg-[#121212]/80 backdrop-blur-md"
        }`}
        id="navbar-container"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold tracking-[1.5px] text-xs md:text-sm uppercase text-white selection:bg-primary-teal selection:text-black">
          <svg
            viewBox="0 0 24 24"
            className="w-4.5 h-4.5 fill-primary-teal"
            id="nav-logo-svg"
          >
            <path d="M21,3c0,0-5.1,0-10.5,5.4C5.1,13.8,3,21,3,21s7.2-2.1,12.6-7.5C21,8.1,21,3,21,3z" />
          </svg>
          <span className="text-white">Verdant</span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6" id="desktop-nav">
          {links.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className={`relative text-[13px] font-medium transition-colors py-2 px-1 ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-teal rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4" id="nav-actions">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden md:inline-block text-[13px] text-white/75 hover:text-white transition-colors"
          >
            Log in
          </a>
          <a
            href="#home"
            onClick={(e) => handleScrollToSection(e, "#home")}
            className="btn-shop-nav bg-primary-teal text-black font-semibold text-[13px] px-5 py-2.5 md:py-2 md:px-5 rounded-full hover:shadow-[0_0_20px_rgba(0,223,184,0.3)] transition-all duration-300 flex items-center gap-1.5"
            id="nav-shop-button"
          >
            Shop Now
            <span className="font-mono text-xs">→</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-1.5 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition-all"
            aria-label="Toggle menu"
            id="mobile-nav-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-[5%] w-[90%] bg-[#121212]/95 backdrop-blur-xl border border-white/5 rounded-2xl p-6 z-40 shadow-2xl md:hidden overflow-hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3 py-2">
              {links.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className={`text-[15px] font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      isActive ? "bg-white/5 text-primary-teal" : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && <div className="w-1.5 h-1.5 bg-primary-teal rounded-full" />}
                  </a>
                );
              })}
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                }}
                className="text-center text-sm py-2.5 text-white/60 hover:text-white font-medium"
              >
                Log in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
