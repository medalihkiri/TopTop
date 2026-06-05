"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SplashCursor from "./SplashCursor";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const scrollToCatalogue = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPromos = () => {
    document.getElementById("promos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {isDesktop && <SplashCursor />}

      {/* Background image with layered gradients */}
      <div className="absolute inset-0 z-0">
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-transparent dark:from-black/80 dark:via-black/60 dark:to-transparent z-10 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30 dark:from-black dark:via-transparent dark:to-black/20 z-10 transition-colors duration-500" />
        <Image
          src="/images/hero.webp"
          alt="Luxury Perfume"
          fill
          className="object-cover object-center opacity-25 dark:opacity-45 mix-blend-multiply dark:mix-blend-normal"
          priority
        />
      </div>

      {/* Decorative ambient orb */}
      <div className="absolute top-1/4 rtl:left-1/4 ltr:right-1/4 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full">

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 mb-6"
        >
          <Sparkles size={12} className="text-gold" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold/80 font-medium">
            {lang === "ar" ? "الفخامة في كل قطرة" : "Le luxe dans chaque goutte"}
          </span>
          <Sparkles size={12} className="text-gold" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main title */}
          <h1
            className="text-[clamp(3.5rem,12vw,7.5rem)] font-serif leading-[0.9] tracking-[0.06em] mb-2"
            dir="ltr"
          >
            <span className="gold-sweep">TOP TOP</span>
          </h1>

          {/* Arabic/French subtitle */}
          <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-sans text-black/70 dark:text-white-warm/75 mb-6 leading-tight transition-colors">
            {t("heroSubtitle")}
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-base text-black/65 dark:text-white/65 max-w-md mb-10 font-light leading-relaxed transition-colors"
        >
          {t("heroDesc")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none sm:justify-center"
        >
          <button
            onClick={scrollToCatalogue}
            className="group w-full sm:w-auto px-9 py-3.5 bg-gold text-white dark:text-black font-semibold uppercase tracking-[0.2em] text-[11px] hover:bg-gold-dark active:bg-gold-dark transition duration-300 hover:shadow-[0_6px_32px_rgba(212,175,55,0.4)] relative overflow-hidden"
          >
            {/* shimmer sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative">{t("exploreCollection")}</span>
          </button>

          <button
            onClick={scrollToPromos}
            className="w-full sm:w-auto px-9 py-3.5 border border-black/20 dark:border-white/20 text-black/70 dark:text-white/70 font-medium uppercase tracking-[0.15em] text-[11px] hover:border-gold hover:text-gold dark:hover:border-gold dark:hover:text-gold transition duration-300"
          >
            {t("exclusiveOffers")}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        onClick={scrollToCatalogue}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-black/40 dark:text-white/40 text-[9px] uppercase tracking-[0.3em] transition-colors group-hover:text-gold dark:group-hover:text-gold">
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gold/50 group-hover:text-gold transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
