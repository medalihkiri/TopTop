"use client";

import { Product, ProductSize } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check, ShoppingBag, Zap } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product: incomingProduct, isOpen, onClose }: ProductModalProps) {
  const { addItem, setIsCartOpen } = useCart();
  const { lang, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [product, setProduct] = useState<Product | null>(incomingProduct);

  useEffect(() => {
    if (incomingProduct) {
      setProduct(incomingProduct);
      setCurrentImageIndex(0);
      setSelectedSize(incomingProduct.sizes[0]);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [incomingProduct]);

  // Handle browser back button
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: "product" }, "");
      const handlePopState = () => onClose();
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    if (window.history.state?.modal === "product") {
      window.history.back();
    } else {
      onClose();
    }
  };

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!product || !selectedSize) return null;

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity, false);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, quantity, false);
    handleClose();
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const discountPct = selectedSize.oldPrice
    ? Math.round(((selectedSize.oldPrice - selectedSize.price) / selectedSize.oldPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[210] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full md:max-w-[900px] md:mx-4 max-h-[95vh] md:max-h-[88vh] bg-white dark:bg-[#0d0d0d] border-t md:border border-black/8 dark:border-white/[0.06] shadow-2xl overflow-hidden rounded-t-3xl md:rounded-xl flex flex-col md:flex-row"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 rtl:left-4 ltr:right-4 z-30 p-2 bg-white/90 dark:bg-black/70 text-black/60 dark:text-white/60 hover:text-gold dark:hover:text-gold rounded-full transition-colors backdrop-blur-sm border border-black/[0.06] dark:border-white/[0.06] shadow-sm"
              aria-label="Close modal"
            >
              <X size={17} />
            </button>

            {/* ── Image section ───────────────────────── */}
            <div className="relative w-full md:w-[45%] h-[300px] sm:h-[360px] md:h-auto md:min-h-[500px] bg-neutral-100 dark:bg-[#111] flex-shrink-0">
              {/* Render all images once; switch via opacity for instant transitions. */}
              {product.images.map((img, idx) => {
                const isActive = idx === currentImageIndex;
                return (
                  <div
                    key={img}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-opacity duration-200 ease-out ${
                      isActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={isActive ? product.name[lang] : ""}
                      fill
                      loading="eager"
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority={idx === 0}
                      className="object-cover"
                    />
                  </div>
                );
              })}

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={lang === "ar" ? handleNextImage : handlePrevImage}
                    className="absolute rtl:right-3 ltr:left-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 dark:bg-black/60 text-black dark:text-white rounded-full hover:bg-gold hover:text-white dark:hover:bg-gold dark:hover:text-black transition shadow-md backdrop-blur-sm border border-black/[0.04] dark:border-white/[0.04]"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={17} className="rtl:rotate-180" />
                  </button>
                  <button
                    onClick={lang === "ar" ? handlePrevImage : handleNextImage}
                    className="absolute rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 dark:bg-black/60 text-black dark:text-white rounded-full hover:bg-gold hover:text-white dark:hover:bg-gold dark:hover:text-black transition shadow-md backdrop-blur-sm border border-black/[0.04] dark:border-white/[0.04]"
                    aria-label="Next image"
                  >
                    <ChevronRight size={17} className="rtl:rotate-180" />
                  </button>
                </>
              )}

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative overflow-hidden rounded-sm transition-all duration-300 border ${
                        idx === currentImageIndex
                          ? "w-7 h-7 border-gold shadow-sm"
                          : "w-5 h-5 border-white/40 dark:border-white/20 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Image ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`thumb-${idx}`}
                        fill
                        unoptimized
                        sizes="28px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Details ───────────────────── */}
            <div className="w-full md:w-[55%] overflow-y-auto flex flex-col">
              <div className="p-5 md:p-7 flex flex-col flex-grow">

                {/* Category + fragrance */}
                <p className="text-gold text-[10px] uppercase tracking-[0.25em] mb-1.5">
                  {product.category === "Unisex" ? t("unisex") : product.category === "Men" ? t("men") : t("women")} · {t("fragrance")}
                </p>

                {/* Name */}
                <h2 className="text-2xl md:text-3xl font-serif text-black dark:text-white-warm mb-3 leading-tight">
                  {product.name[lang]}
                </h2>

                {/* Price row */}
                <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-black/[0.06] dark:border-white/[0.05]">
                  {selectedSize.oldPrice && (
                    <span className="text-black/35 dark:text-white/35 line-through text-sm">
                      {selectedSize.oldPrice} TND
                    </span>
                  )}
                  <span className="text-2xl font-serif font-semibold text-gold">
                    {selectedSize.price} TND
                  </span>
                  {discountPct > 0 && (
                    <span className="ml-auto text-[10px] font-bold text-black bg-gold px-2 py-0.5 rounded-sm">
                      -{discountPct}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-black/60 dark:text-white/55 font-light text-sm leading-relaxed mb-5">
                  {product.description[lang]}
                </p>

                {/* Notes */}
                <div className="mb-5">
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/35 mb-2.5">
                    {t("notes")}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.notes[lang].map((note: string) => (
                      <span
                        key={note}
                        className="px-3 py-1 bg-neutral-100 dark:bg-white/[0.05] text-black/70 dark:text-white/70 text-[11px] tracking-wide rounded-sm border border-black/[0.04] dark:border-white/[0.04]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Size + Quantity */}
                <div className="flex flex-wrap gap-5 mb-4">
                  {/* Size selector */}
                  <div className="flex-1 min-w-[140px]">
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-black/45 dark:text-white/45 mb-2">
                      {t("size")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size.size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3.5 py-2 text-xs font-medium transition-all duration-200 rounded-sm border ${
                            selectedSize.size === size.size
                              ? "bg-gold border-gold text-black shadow-sm"
                              : "bg-transparent border-black/15 dark:border-white/15 text-black/60 dark:text-white/60 hover:border-gold/60 hover:text-gold dark:hover:border-gold/60 dark:hover:text-gold"
                          }`}
                        >
                          {size.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-black/45 dark:text-white/45 mb-2">
                      {t("quantity")}
                    </h4>
                    <div className="inline-flex items-center border border-black/12 dark:border-white/12 rounded-sm overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center text-black/55 dark:text-white/55 hover:text-gold hover:bg-gold/8 dark:hover:text-gold transition-colors text-base"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm font-semibold text-black dark:text-white border-x border-black/10 dark:border-white/10 py-2">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-black/55 dark:text-white/55 hover:text-gold hover:bg-gold/8 dark:hover:text-gold transition-colors text-base"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total preview */}
                {quantity > 1 && (
                  <p className="text-[11px] text-black/40 dark:text-white/40 mb-4">
                    {lang === "ar" ? "الإجمالي:" : "Total:"} <span className="text-gold font-semibold">{selectedSize.price * quantity} TND</span>
                  </p>
                )}
              </div>

              {/* Sticky CTA */}
              <div className="sticky bottom-0 px-5 md:px-7 py-4 bg-white/97 dark:bg-[#0d0d0d]/97 backdrop-blur-sm border-t border-black/[0.05] dark:border-white/[0.04] flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 rounded-sm flex items-center justify-center gap-2 border ${
                    addedFeedback
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : "border-gold text-gold hover:bg-gold/8 active:bg-gold/15"
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check size={14} />
                      <span>{lang === "ar" ? "تمت الإضافة" : "Ajouté !"}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      {t("addToCart")}
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 bg-gold text-black hover:bg-gold-dark active:bg-gold-dark transition-all duration-300 uppercase tracking-[0.15em] text-xs font-bold rounded-sm hover:shadow-[0_6px_24px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Zap size={13} className="relative" />
                  <span className="relative">{t("buyNow")}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
