"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SplashCursor from "./SplashCursor";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);
  const { t } = useLanguage();

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

  return (
    <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {isDesktop && <SplashCursor />}
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white dark:from-black/50 dark:via-black/70 dark:to-black z-10 transition-colors duration-500" />
        <Image
          src="/images/femme ysl libre (1).webp"
          alt="Luxury Perfume"
          fill
          className="object-cover object-center opacity-15 dark:opacity-30 mix-blend-multiply dark:mix-blend-luminosity"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-[clamp(3rem,10vw,6.5rem)] font-serif text-gold leading-[0.95] tracking-[0.04em] mb-3 drop-shadow-sm dark:drop-shadow-lg"
            dir="ltr"
          >
            TOP TOP
          </h1>
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-sans text-black/85 dark:text-white-warm/85 mb-8 leading-tight transition-colors">
            {t("heroSubtitle")}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-black/70 dark:text-white/70 max-w-lg mb-12 font-light leading-relaxed tracking-wide transition-colors"
        >
          {t("heroDesc")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToCatalogue}
          className="group px-10 py-4 bg-gold text-white dark:text-black font-semibold uppercase tracking-[0.2em] text-xs hover:bg-gold-dark active:bg-gold-dark transition duration-300 hover:shadow-[0_4px_24px_rgba(212,175,55,0.3)]"
        >
          {t("exploreCollection")}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-black/50 dark:text-white/50 text-[10px] uppercase tracking-[0.25em] transition-colors">
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
