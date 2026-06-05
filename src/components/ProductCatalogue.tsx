"use client";

import { useState } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCatalogueProps {
  onOpenModal: (product: Product) => void;
}

export default function ProductCatalogue({ onOpenModal }: ProductCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState<"Men" | "Women">("Women");
  const { t, lang } = useLanguage();

  const filteredProducts = products.filter((p) => p.category === activeCategory || p.category === "Unisex");

  return (
    <section id="catalogue" className="py-16 md:py-28 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold/70 mb-3">
            {lang === "ar" ? "كل المقاسات متاحة" : "Toutes tailles disponibles"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-black dark:text-white-warm mb-8">
            {t("ourCollection")}
          </h2>

          {/* Category tabs */}
          <div className="inline-flex gap-1 p-1 bg-neutral-100/80 dark:bg-white/[0.05] rounded-sm border border-black/[0.04] dark:border-white/[0.04]">
            {(["Women", "Men"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-8 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-sm overflow-hidden ${
                  activeCategory === cat
                    ? "bg-gold text-black font-bold shadow-sm"
                    : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                }`}
              >
                {cat === "Women" ? t("women") : t("men")}
              </button>
            ))}
          </div>

          {/* Product count */}
          <p className="text-[10px] text-black/30 dark:text-white/30 mt-4 tracking-wide">
            {filteredProducts.length}{" "}
            {lang === "ar"
              ? filteredProducts.length === 1 ? "منتج" : "منتجات"
              : filteredProducts.length === 1 ? "produit" : "produits"}
          </p>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onOpenModal(product)}
                priority={index < 4}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
