"use client";

import { Product } from "@/data/products";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface PromoSpotlightProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export default function PromoSpotlight({ products, onOpenModal }: PromoSpotlightProps) {
  const { lang, t } = useLanguage();
  const promoProducts = products.filter((p) => p.isPromo);

  if (promoProducts.length === 0) return null;

  return (
    <section
      id="promos"
      className="py-16 md:py-24 bg-neutral-50 dark:bg-[#070707] border-b border-black/5 dark:border-white/[0.03] transition-colors duration-500"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-5">
          <div className="h-[1px] flex-grow bg-gradient-to-r rtl:bg-gradient-to-l from-transparent to-gold/40" />
          <h2 className="text-2xl md:text-3xl font-serif text-gold text-center whitespace-nowrap">
            {t("exclusiveOffers")}
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-l rtl:bg-gradient-to-r from-transparent to-gold/40" />
        </div>
      </div>

      {/* Horizontal scroll */}
      <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 md:px-8 pb-6 gap-5">
        {promoProducts.map((product) => {
          const promoSize = product.sizes.find((s) => s.oldPrice) || product.sizes[0];

          return (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex-shrink-0 w-[260px] md:w-[300px] snap-center cursor-pointer group"
              onClick={() => onOpenModal(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white dark:bg-black/40 border border-black/[0.04] dark:border-white/[0.06] transition-colors">
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name[lang]}
                    fill
                    sizes="(max-width: 768px) 260px, 300px"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 dark:opacity-80 group-hover:opacity-100"
                  />
                )}

                {/* Promo badge */}
                <div className="absolute top-3 rtl:right-3 ltr:left-3 bg-gold text-white dark:text-black text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.15em]">
                  {t("promo")}
                </div>

                {/* Bottom info gradient */}
                <div className="absolute bottom-0 left-0 right-0 p-5 pt-16 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-black dark:via-black/90 dark:to-transparent">
                  <h3 className="text-lg font-serif text-black dark:text-white-warm mb-1.5 leading-snug">
                    {product.name[lang]}
                  </h3>
                  <div className="flex items-baseline gap-2.5">
                    {promoSize.oldPrice && (
                      <span className="text-black/50 dark:text-white/50 line-through text-sm">
                        {promoSize.oldPrice} TND
                      </span>
                    )}
                    <span className="text-gold font-semibold text-base">
                      {promoSize.price} TND
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
