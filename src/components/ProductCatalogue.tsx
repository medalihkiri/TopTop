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
  const { t } = useLanguage();

  const filteredProducts = products.filter((p) => p.category === activeCategory);

  return (
    <section id="catalogue" className="py-16 md:py-24 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-black dark:text-white-warm mb-8">
            {t("ourCollection")}
          </h2>

          {/* Category tabs */}
          <div className="inline-flex gap-1 p-1 bg-neutral-100 dark:bg-white/[0.04] rounded-sm">
            {(["Women", "Men"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-8 py-2.5 text-xs uppercase tracking-[0.2em] transition duration-300 rounded-sm ${
                  activeCategory === cat
                    ? "bg-gold text-white dark:text-black font-semibold shadow-sm"
                    : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat === "Women" ? t("women") : t("men")}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12"
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
