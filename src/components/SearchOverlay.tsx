"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";
import { products, Product } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { searchProducts } from "@/lib/search";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = {
  fr: ["oud", "vanille", "fraise", "été", "soirée", "bureau", "mariage", "frais"],
  ar: ["عود", "فانيليا", "فراولة", "صيفي", "سهرات", "عمل", "أعراس", "منعش"],
};

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const { lang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [deferredQuery, setDeferredQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollLockRef = useRef<number>(0);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDeferredQuery(value), 120);
  }, []);

  const results = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    return searchProducts(products, deferredQuery);
  }, [deferredQuery]);

  useEffect(() => setMounted(true), []);

  // iOS-safe scroll lock — preserves scroll position on close
  useEffect(() => {
    if (!isOpen) return;

    scrollLockRef.current = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollLockRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollLockRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80);
      return () => clearTimeout(timer);
    }
    setQuery("");
    setDeferredQuery("");
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleProductModalClose = () => setSelectedProduct(null);
  const suggestions = SUGGESTIONS[lang] ?? SUGGESTIONS.fr;

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col bg-white dark:bg-[#070707] h-[100dvh] max-h-[100dvh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("search")}
          >
            {/* Header — sticky, safe-area aware */}
            <div className="flex-shrink-0 border-b border-black/6 dark:border-white/6 bg-white/95 dark:bg-[#070707]/95 backdrop-blur-xl pt-[max(0.75rem,env(safe-area-inset-top))]">
              <div className="max-w-3xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <Search
                    size={18}
                    className="text-black/30 dark:text-white/30 flex-shrink-0 sm:hidden"
                  />
                  <Search
                    size={20}
                    className="text-black/30 dark:text-white/30 flex-shrink-0 hidden sm:block"
                  />
                  <input
                    ref={inputRef}
                    type="search"
                    enterKeyHint="search"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder={t("searchPlaceholder")}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-base sm:text-2xl md:text-3xl font-serif tracking-tight text-black dark:text-white placeholder-black/25 dark:placeholder-white/25 py-1.5 sm:py-2 touch-manipulation"
                  />
                  <AnimatePresence>
                    {query && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => handleQueryChange("")}
                        className="flex-shrink-0 p-1.5 rounded-full bg-black/6 dark:bg-white/8 hover:bg-black/12 dark:hover:bg-white/15 transition-colors"
                        aria-label="Clear search"
                      >
                        <X size={14} className="text-black/60 dark:text-white/60 sm:w-4 sm:h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 p-2 -me-1 text-black/40 dark:text-white/40 hover:text-gold dark:hover:text-gold transition-colors touch-manipulation"
                    aria-label="Close search"
                  >
                    <X size={22} className="sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="h-6 sm:h-7 flex items-center mt-0.5">
                  <AnimatePresence mode="wait">
                    {query.trim() && results.length > 0 && (
                      <motion.span
                        key="count"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-[11px] sm:text-xs font-medium text-black/40 dark:text-white/40 tracking-wide"
                      >
                        {lang === "ar"
                          ? `${results.length} نتيجة`
                          : `${results.length} résultat${results.length > 1 ? "s" : ""}`}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Scrollable body — min-h-0 is required for flex overflow */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 sm:py-10 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <AnimatePresence mode="wait">
                  {!query.trim() && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center gap-6 sm:gap-8 pt-8 sm:pt-16 pb-16 sm:pb-24"
                    >
                      <div className="flex items-center gap-2 text-black/25 dark:text-white/25">
                        <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="text-xs sm:text-sm font-medium tracking-widest uppercase">
                          {lang === "ar" ? "اقتراحات" : "Suggestions"}
                        </span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-lg px-2">
                        {suggestions.map((chip) => (
                          <button
                            key={chip}
                            onClick={() => handleQueryChange(chip)}
                            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-black/10 dark:border-white/10 text-xs sm:text-sm text-black/60 dark:text-white/60 hover:border-gold hover:text-gold dark:hover:border-gold dark:hover:text-gold transition-all duration-200 active:scale-95 touch-manipulation"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {query.trim() && results.length > 0 && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 md:gap-y-12"
                    >
                      {results.map(({ product }, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onClick={() => setSelectedProduct(product)}
                          priority={index < 4}
                        />
                      ))}
                    </motion.div>
                  )}

                  {query.trim() && results.length === 0 && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center gap-5 sm:gap-6 pt-16 sm:pt-24 pb-20 sm:pb-32 text-center px-4"
                    >
                      <Search
                        size={32}
                        className="text-black/10 dark:text-white/10 sm:w-10 sm:h-10"
                      />
                      <div className="space-y-1">
                        <p className="text-base sm:text-lg font-serif text-black/50 dark:text-white/50">
                          {t("noResults")}
                        </p>
                        <p className="text-xs sm:text-sm text-black/30 dark:text-white/30">
                          {lang === "ar"
                            ? "جرّب كلمة أخرى كـ «فانيليا» أو «عود»"
                            : 'Essayez "vanille", "oud" ou "fraise"'}
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 pt-1">
                        {suggestions.slice(0, 5).map((chip) => (
                          <button
                            key={chip}
                            onClick={() => handleQueryChange(chip)}
                            className="px-3 py-1.5 rounded-full border border-black/8 dark:border-white/8 text-xs text-black/50 dark:text-white/50 hover:border-gold hover:text-gold transition-all touch-manipulation"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleProductModalClose}
      />
    </>,
    document.body
  );
}
