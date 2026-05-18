"use client";

import { Product } from "@/data/products";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const minPrice = Math.min(...product.sizes.map((s) => s.price));

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] mb-3.5 transition-colors">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name[lang]}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 opacity-90 dark:opacity-75 group-hover:opacity-100"
          />
        )}

        {/* Promo badge */}
        {product.isPromo && (
          <div className="absolute top-2.5 rtl:right-2.5 ltr:left-2.5 bg-gold text-white dark:text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.12em]">
            {t("promo")}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-[11px] uppercase tracking-[0.2em] border-b border-gold/80 pb-0.5">
            {t("quickView")}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow gap-0.5">
        <h3 className="text-sm md:text-base font-serif text-black dark:text-white-warm group-hover:text-gold dark:group-hover:text-gold transition-colors leading-snug">
          {product.name[lang]}
        </h3>
        <p className="text-black/40 dark:text-white/40 text-[10px] uppercase tracking-[0.15em]">
          {product.category === "Men" ? t("men") : t("women")}
        </p>
        <p className="text-gold font-medium text-sm mt-auto pt-1">
          {t("from")} {minPrice} TND
        </p>
      </div>
    </motion.div>
  );
}
