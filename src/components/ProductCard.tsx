"use client";

import { Product } from "@/data/products";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  priority?: boolean;
}

export default function ProductCard({ product, onClick, priority }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const minPrice = Math.min(...product.sizes.map((s) => s.price));
  const hasDiscount = product.sizes.some((s) => s.oldPrice);
  const maxDiscount = product.sizes.reduce((max, s) => {
    if (s.oldPrice) {
      const pct = Math.round(((s.oldPrice - s.price) / s.oldPrice) * 100);
      return Math.max(max, pct);
    }
    return max;
  }, 0);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Image wrapper */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] mb-3 transition-colors">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name[lang]}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-107 opacity-90 dark:opacity-80 group-hover:opacity-100"
          />
        )}

        {/* Promo badge — top corner */}
        {product.isPromo && hasDiscount && maxDiscount > 0 && (
          <div className="absolute top-2.5 rtl:right-2.5 ltr:left-2.5 bg-gold text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.1em] shadow-sm">
            -{maxDiscount}%
          </div>
        )}
        {product.isPromo && !hasDiscount && (
          <div className="absolute top-2.5 rtl:right-2.5 ltr:left-2.5 bg-gold text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.1em] shadow-sm">
            {t("promo")}
          </div>
        )}

        {/* Hover overlay with eye icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350 flex flex-col items-center justify-end pb-5">
          <span className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.2em] font-medium mb-1">
            <Eye size={13} />
            {t("quickView")}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow gap-0.5 px-0.5">
        <p className="text-black/40 dark:text-white/40 text-[9px] uppercase tracking-[0.18em] mb-0.5">
          {product.category === "Unisex" ? t("unisex") : product.category === "Men" ? t("men") : t("women")}
        </p>
        <h3 className="text-sm md:text-[15px] font-serif text-black dark:text-white-warm group-hover:text-gold dark:group-hover:text-gold transition-colors leading-snug line-clamp-2">
          {product.name[lang]}
        </h3>
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          {hasDiscount && (
            <span className="text-black/35 dark:text-white/35 line-through text-[11px]">
              {Math.min(...product.sizes.filter(s => s.oldPrice).map(s => s.oldPrice!))} TND
            </span>
          )}
          <span className="text-gold font-semibold text-sm">
            {t("from")} {minPrice} TND
          </span>
        </div>
      </div>
    </motion.div>
  );
}
