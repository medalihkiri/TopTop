"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { ShoppingBag, Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t("promos"), href: "#promos" },
    { name: t("catalogue"), href: "#catalogue" },
    { name: t("contact"), href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const toggleLanguage = () => {
    setLang(lang === "ar" ? "fr" : "ar");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Left: burger + logo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 -ms-2 text-black/80 dark:text-white-warm/85 hover:text-gold dark:hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xl md:text-2xl font-serif font-bold text-gold cursor-pointer tracking-[0.08em] flex items-center gap-2"
              dir="ltr"
            >
              TOP TOP
              <span className="text-[11px] font-sans tracking-normal opacity-60 text-black dark:text-white hidden sm:inline">
                للـعطور
              </span>
            </a>
          </div>

          {/* Center: desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="relative text-[11px] uppercase tracking-[0.2em] text-black/70 dark:text-white/65 hover:text-gold dark:hover:text-gold transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-black/60 dark:text-white/60 hover:text-gold dark:hover:text-gold transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 p-2.5 text-black/60 dark:text-white/60 hover:text-gold dark:hover:text-gold transition-colors"
              aria-label="Toggle Language"
            >
              <Globe size={17} />
              <span className="text-[10px] uppercase tracking-[0.15em] font-medium">
                {lang === "ar" ? "FR" : "AR"}
              </span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-black/70 dark:text-white-warm/80 hover:text-gold dark:hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={21} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold leading-none text-black bg-gold rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-white/95 dark:bg-[#050505]/95 z-40 h-[100dvh] w-full flex flex-col pt-24"
          >
            <div className="flex flex-col items-center justify-start h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-serif uppercase tracking-[0.15em] text-black/80 dark:text-white/80 hover:text-gold dark:hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
