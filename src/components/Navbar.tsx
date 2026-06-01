"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { ShoppingBag, Menu, X, Globe, Sun, Moon, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll for mobile menu only — search overlay manages its own lock
  useEffect(() => {
    if (isSearchOpen) return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      if (!isSearchOpen) document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const openSearch = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/92 dark:bg-black/92 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-[68px]">

          {/* Left: burger + logo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 -ms-2 text-black/70 dark:text-white-warm/80 hover:text-gold dark:hover:text-gold transition-colors rounded-md hover:bg-gold/8"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 group"
              dir="ltr"
            >
              <span className="text-xl md:text-2xl font-serif font-bold text-gold tracking-[0.1em] transition-opacity group-hover:opacity-80">
                TOP TOP
              </span>
              <span className="text-[10px] font-sans tracking-normal opacity-50 text-black dark:text-white hidden sm:inline mt-1">
                للـعطور
              </span>
            </a>
          </div>

          {/* Center: desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="relative text-[11px] uppercase tracking-[0.2em] text-black/60 dark:text-white/55 hover:text-gold dark:hover:text-gold transition-colors py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={openSearch}
              className="p-2.5 text-black/55 dark:text-white/55 hover:text-gold dark:hover:text-gold transition-colors rounded-md hover:bg-gold/8"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 text-black/55 dark:text-white/55 hover:text-gold dark:hover:text-gold transition-colors rounded-md hover:bg-gold/8"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 p-2.5 text-black/55 dark:text-white/55 hover:text-gold dark:hover:text-gold transition-colors rounded-md hover:bg-gold/8"
              aria-label="Toggle Language"
            >
              <Globe size={16} />
              <span className="text-[10px] uppercase tracking-[0.12em] font-semibold">
                {lang === "ar" ? "FR" : "AR"}
              </span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-black/65 dark:text-white-warm/75 hover:text-gold dark:hover:text-gold transition-colors rounded-md hover:bg-gold/8"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold leading-none text-black bg-gold rounded-full shadow-sm"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-white/97 dark:bg-[#050505]/97 backdrop-blur-xl z-40 h-[100dvh] w-full flex flex-col"
          >
            {/* Mobile menu top row (spacer for navbar height) */}
            <div className="h-16 flex-shrink-0" />

            {/* Nav links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-2 pb-16">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="w-full max-w-xs text-center py-5 text-2xl font-serif text-black/80 dark:text-white/80 hover:text-gold dark:hover:text-gold transition-colors border-b border-black/[0.04] dark:border-white/[0.04] last:border-0"
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Mobile shortcuts */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-4 mt-8 pt-6"
              >
                <button
                  onClick={openSearch}
                  className="flex flex-col items-center gap-1.5 text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold transition-colors"
                >
                  <Search size={20} />
                  <span className="text-[9px] uppercase tracking-[0.15em]">{t("search")}</span>
                </button>
                <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => setIsCartOpen(true), 200); }}
                  className="flex flex-col items-center gap-1.5 text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold transition-colors relative"
                >
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="text-[9px] uppercase tracking-[0.15em]">{t("yourCart")}</span>
                </button>
                <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
                <button
                  onClick={toggleLanguage}
                  className="flex flex-col items-center gap-1.5 text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold transition-colors"
                >
                  <Globe size={20} />
                  <span className="text-[9px] uppercase tracking-[0.15em]">{lang === "ar" ? "FR" : "AR"}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
