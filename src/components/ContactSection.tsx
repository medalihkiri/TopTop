"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-white dark:bg-[#050505] border-t border-black/[0.04] dark:border-white/[0.03] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-3">
            {t("visitBoutique")}
          </h2>
          <p className="text-black/50 dark:text-white/50 font-light text-sm max-w-lg mx-auto leading-relaxed">
            {t("visitDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* Info column */}
          <div className="flex flex-col gap-8">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-gold/8 rounded-full text-gold flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-base font-serif text-black dark:text-white-warm mb-1">
                  {t("location")}
                </h4>
                <a 
                  href="https://maps.app.goo.gl/KcqTwDEAuRxtnY4DA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold font-light text-sm whitespace-pre-line leading-relaxed transition-colors block"
                >
                  {t("locationAddress")}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-gold/8 rounded-full text-gold flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-base font-serif text-black dark:text-white-warm mb-1">
                  {t("phoneWhatsApp")}
                </h4>
                <p className="text-black/50 dark:text-white/50 font-light text-sm" dir="ltr">
                  +216 99 336 444
                </p>
                <a
                  href="https://wa.me/21699336444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors"
                >
                  <MessageCircle size={14} />
                  {t("whatsappUs")}
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-gold/8 rounded-full text-gold flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-serif text-black dark:text-white-warm mb-2">
                  {t("followUs")}
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/toptop.parfums/?hl=fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-100 dark:bg-white/[0.04] text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold hover:bg-gold/10 dark:hover:bg-gold/10 transition rounded-full"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-neutral-100 dark:bg-white/[0.04] text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold hover:bg-gold/10 dark:hover:bg-gold/10 transition rounded-full"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-[320px] md:h-[400px] bg-black/[0.03] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.04] relative overflow-hidden rounded-sm group cursor-pointer">
            <a 
              href="https://maps.app.goo.gl/KcqTwDEAuRxtnY4DA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Open in Google Maps"
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102195.42436894565!2d10.100918029517173!3d36.7949999081534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis!5e0!3m2!1sen!2stn!4v1700000000000!5m2!1sen!2stn"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) contrast(1.1) opacity(0.7)", pointerEvents: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store location"
              className="transition-transform duration-700 ease-out group-hover:scale-105"
            ></iframe>
            {/* Optional overlay to hint clickability */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
              <span className="bg-black/80 text-white text-xs tracking-widest uppercase px-4 py-2 rounded-sm backdrop-blur-sm">
                Open Map
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
