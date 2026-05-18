"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-neutral-50 dark:bg-[#050505] border-t border-black/[0.04] dark:border-white/[0.03] py-10 md:py-14 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col items-center">
        <div
          className="text-xl font-serif text-gold mb-4 tracking-[0.1em] flex items-center gap-2"
          dir="ltr"
        >
          TOP TOP
          <span className="text-[11px] font-sans tracking-normal opacity-50 text-black dark:text-white">
            للـعطور
          </span>
        </div>

        <p className="text-black/45 dark:text-white/35 text-xs mb-8 text-center max-w-sm font-light leading-relaxed">
          {t("footerDesc")}
        </p>

        <div className="w-16 h-[1px] bg-gold/20 mb-8" />

        <div className="flex flex-col items-center gap-2">
          <p className="text-black/40 dark:text-white/25 text-[11px] text-center" dir="ltr">
            © {new Date().getFullYear()} TOP TOP Perfumes. {t("rights")}
          </p>
          <p className="text-black/25 dark:text-white/15 text-[9px] tracking-[0.2em] uppercase mt-2">
            developed by nocta.ink
          </p>
        </div>
      </div>
    </footer>
  );
}
