"use client";

import { MapPin, Phone, MessageCircle, Clock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ContactSection() {
  const { t, lang } = useLanguage();

  const infoItems = [
    {
      icon: <MapPin size={18} />,
      title: t("location"),
      content: (
        <a
          href="https://maps.app.goo.gl/KcqTwDEAuRxtnY4DA"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/60 dark:text-white/55 hover:text-gold dark:hover:text-gold font-light text-sm whitespace-pre-line leading-relaxed transition-colors flex items-start gap-1 group"
        >
          <span>{t("locationAddress")}</span>
          <ExternalLink size={11} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ),
    },
    {
      icon: <Phone size={18} />,
      title: t("phoneWhatsApp"),
      content: (
        <div className={`flex flex-col gap-3 ${lang === "ar" ? "items-start md:items-start" : "items-start"}`}>
          <p
            className="text-black/80 dark:text-white/80 font-medium text-base tracking-wide"
            dir="ltr"
          >
            +216 99 336 444
          </p>
          <a
            href="https://wa.me/21699336444"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-md shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 px-4 py-2.5 rounded-full w-fit"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <MessageCircle size={15} />
            {t("whatsappUs")}
          </a>
        </div>
      ),
    },
    {
      icon: <Clock size={18} />,
      title: lang === "ar" ? "ساعات العمل" : "Horaires",
      content: (
        <div className="text-sm text-black/60 dark:text-white/55 font-light space-y-1">
          <p>{lang === "ar" ? "الاثنين – السبت" : "Lun – Sam"}: <span className="text-black/80 dark:text-white/80 font-medium">9h – 20h</span></p>
          <p>{lang === "ar" ? "الأحد" : "Dim"}: <span className="text-black/80 dark:text-white/80 font-medium">10h – 18h</span></p>
        </div>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-28 bg-white dark:bg-[#050505] border-t border-black/[0.04] dark:border-white/[0.03] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold/70 mb-3">
            {lang === "ar" ? "نحن هنا لك" : "Nous sommes là pour vous"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-gold mb-3">
            {t("visitBoutique")}
          </h2>
          <p className="text-black/55 dark:text-white/50 font-light text-sm max-w-md mx-auto leading-relaxed">
            {t("visitDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">

          {/* Info column */}
          <div className="flex flex-col gap-5">
            {infoItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: lang === "ar" ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 p-4 md:p-5 bg-neutral-50 dark:bg-white/[0.025] border border-black/[0.05] dark:border-white/[0.04] rounded-sm hover:border-gold/30 dark:hover:border-gold/25 transition-all duration-300 group"
              >
                <div className="p-2.5 bg-gold/10 rounded-full text-gold flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-serif text-black dark:text-white-warm mb-1.5">
                    {item.title}
                  </h4>
                  {item.content}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? 16 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 md:p-5 bg-neutral-50 dark:bg-white/[0.025] border border-black/[0.05] dark:border-white/[0.04] rounded-sm hover:border-gold/30 dark:hover:border-gold/25 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gold/10 rounded-full text-gold flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-serif text-black dark:text-white-warm mb-3">
                    {t("followUs")}
                  </h4>
                  <div className="flex gap-2.5">
                    <a
                      href="https://www.instagram.com/toptop.parfums/?hl=fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0a0a0a] text-black/70 dark:text-white/70 hover:text-gold dark:hover:text-gold hover:border-gold/50 border border-black/10 dark:border-white/10 shadow-sm transition-all rounded-md text-[11px] font-semibold"
                      aria-label="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0a0a0a] text-black/70 dark:text-white/70 hover:text-gold dark:hover:text-gold hover:border-gold/50 border border-black/10 dark:border-white/10 shadow-sm transition-all rounded-md text-[11px] font-semibold"
                      aria-label="Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            className="w-full h-[340px] md:h-full md:min-h-[440px] bg-black/[0.03] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.04] relative overflow-hidden rounded-sm group cursor-pointer"
          >
            <a
              href="https://maps.app.goo.gl/KcqTwDEAuRxtnY4DA"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Open in Google Maps"
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.234!2d9.8735!3d37.2746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2e41a7bffffff%3A0x1!2sRue%202%20Mars%2C%20Bizerte%207000%2C%20Tunisie!5e0!3m2!1sfr!2stn!4v1700000000000!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) contrast(1.08) opacity(0.75)", pointerEvents: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TOP TOP Parfums — Hela Centre, Rue 2 Mars, Bizerte"
              className="transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
            ></iframe>

            {/* Overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none flex items-center justify-center">
              <span className="bg-black/80 text-white text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <ExternalLink size={12} />
                {lang === "ar" ? "فتح الخريطة" : "Ouvrir la carte"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
