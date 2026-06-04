"use client";

import { Product } from "@/data/products";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface PromoSpotlightProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export default function PromoSpotlight({ products, onOpenModal }: PromoSpotlightProps) {
  const { lang, t } = useLanguage();
  const promoProducts = products.filter((p) => p.isPromo);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (promoProducts.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="promos"
      className="py-16 md:py-24 bg-neutral-50 dark:bg-[#070707] border-b border-black/5 dark:border-white/[0.03] transition-colors duration-500 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-5">
          <div className="h-px flex-grow bg-gradient-to-r rtl:bg-gradient-to-l from-transparent to-gold/50" />
          <div className="text-center">
            <p className="text-[9px] uppercase tracking-[0.35em] text-gold/60 mb-1">
              {lang === "ar" ? "لفترة محدودة" : "Durée limitée"}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-gold whitespace-nowrap">
              {t("exclusiveOffers")}
            </h2>
          </div>
          <div className="h-px flex-grow bg-gradient-to-l rtl:bg-gradient-to-r from-transparent to-gold/50" />
        </div>
      </div>

      {/* Scroll wrapper + arrows */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll(lang === "ar" ? "right" : "left")}
          className="hidden md:flex absolute rtl:right-2 ltr:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 items-center justify-center text-black/60 dark:text-white/60 hover:border-gold hover:text-gold dark:hover:border-gold dark:hover:text-gold transition shadow-md backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} className="rtl:rotate-180" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll(lang === "ar" ? "left" : "right")}
          className="hidden md:flex absolute rtl:left-2 ltr:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 items-center justify-center text-black/60 dark:text-white/60 hover:border-gold hover:text-gold dark:hover:border-gold dark:hover:text-gold transition shadow-md backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} className="rtl:rotate-180" />
        </button>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 md:px-16 pb-4 gap-4 md:gap-5"
        >
          {promoProducts.map((product, index) => {
            const promoSize = product.sizes.find((s) => s.oldPrice) || product.sizes[0];
            const discountPct = promoSize.oldPrice
              ? Math.round(((promoSize.oldPrice - promoSize.price) / promoSize.oldPrice) * 100)
              : 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 w-[240px] sm:w-[270px] md:w-[300px] snap-center cursor-pointer group"
                onClick={() => onOpenModal(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.07] transition-colors">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name[lang]}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 300px"
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      unoptimized
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 opacity-90 dark:opacity-85 group-hover:opacity-100"
                    />
                  )}

                  {/* Discount badge */}
                  {discountPct > 0 ? (
                    <div className="absolute top-3 rtl:right-3 ltr:left-3 bg-gold text-black text-[10px] font-bold px-2.5 py-1 shadow-sm">
                      -{discountPct}%
                    </div>
                  ) : (
                    <div className="absolute top-3 rtl:right-3 ltr:left-3 bg-gold text-black text-[10px] font-bold px-2.5 py-1 shadow-sm uppercase tracking-[0.1em]">
                      {t("promo")}
                    </div>
                  )}

                  {/* Bottom info gradient */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 pt-16 bg-gradient-to-t from-white via-white/96 to-transparent dark:from-black dark:via-black/92 dark:to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base font-serif text-black dark:text-white-warm mb-2 leading-snug">
                      {product.name[lang]}
                    </h3>
                    <div className="flex items-baseline gap-2.5">
                      {promoSize.oldPrice && (
                        <span className="text-black/45 dark:text-white/45 line-through text-sm">
                          {promoSize.oldPrice} TND
                        </span>
                      )}
                      <span className="text-gold font-semibold text-base">
                        {promoSize.price} TND
                      </span>
                    </div>
                    {/* Quick view hint */}
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t("quickView")} →
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 rtl:right-0 ltr:left-0 w-8 md:w-16 h-full bg-gradient-to-r rtl:bg-gradient-to-l from-neutral-50 dark:from-[#070707] to-transparent pointer-events-none z-[1]" />
        <div className="absolute top-0 rtl:left-0 ltr:right-0 w-8 md:w-16 h-full bg-gradient-to-l rtl:bg-gradient-to-r from-neutral-50 dark:from-[#070707] to-transparent pointer-events-none z-[1]" />
      </div>
    </section>
  );
}
