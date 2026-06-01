"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  const { t, lang } = useLanguage();

  const navLinks = [
    { label: lang === "ar" ? "العروض" : "Promos", href: "#promos" },
    { label: lang === "ar" ? "المجموعة" : "Catalogue", href: "#catalogue" },
    { label: lang === "ar" ? "اتصل بنا" : "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-neutral-50 dark:bg-[#050505] border-t border-black/[0.05] dark:border-white/[0.04] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Top section */}
        <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="text-xl font-serif text-gold tracking-[0.1em] flex items-center gap-2" dir="ltr">
              TOP TOP
              <span className="text-[11px] font-sans tracking-normal opacity-45 text-black dark:text-white">
                للـعطور
              </span>
            </div>
            <p className="text-black/50 dark:text-white/40 text-xs font-light leading-relaxed max-w-[200px] text-center md:text-start">
              {t("footerDesc")}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/35 dark:text-white/30 mb-1">
              {lang === "ar" ? "روابط سريعة" : "Liens rapides"}
            </p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs text-black/50 dark:text-white/45 hover:text-gold dark:hover:text-gold transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className={`flex flex-col gap-3 ${lang === "ar" ? "items-end" : "items-center md:items-end"}`}>
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/35 dark:text-white/30 mb-1">
              {lang === "ar" ? "تواصل معنا" : "Contactez-nous"}
            </p>
            <a
              href="https://wa.me/21699336444"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full transition-all duration-200 border border-emerald-500/20 hover:border-emerald-500/40"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <p
              className={`text-[10px] text-black/35 dark:text-white/30 ${lang === "ar" ? "text-right" : ""}`}
              dir="ltr"
            >
              +216 99 336 444
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-0">
          <div className="h-px flex-1 bg-black/[0.05] dark:bg-white/[0.04]" />
          <div className="w-1 h-1 rounded-full bg-gold/30" />
          <div className="h-px flex-1 bg-black/[0.05] dark:bg-white/[0.04]" />
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-black/40 dark:text-white/30 text-[10px] text-center" dir="ltr">
            © {new Date().getFullYear()} TOP TOP Perfumes. {t("rights")}
          </p>
          <p className="text-black/25 dark:text-white/20 text-[9px] tracking-[0.2em] uppercase" dir="ltr">
            developed by nocta.ink
          </p>
        </div>
      </div>
    </footer>
  );
}
