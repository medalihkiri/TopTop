"use client";

import { Product, ProductSize } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem, setIsCartOpen } = useCart();
  const { lang, t } = useLanguage();
  const [displayProduct, setDisplayProduct] = useState<Product | null>(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setDisplayProduct(product);
      setCurrentImageIndex(0);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [product]);

  // Handle browser back button to close modal instead of exiting app
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: "product" }, "");

      const handlePopState = () => {
        onClose();
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    if (window.history.state?.modal === "product") {
      window.history.back();
    } else {
      onClose();
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => { 
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  const p = product || displayProduct;
  const size = selectedSize || p?.sizes[0];
  const safeImageIndex = p && p.images.length > currentImageIndex ? currentImageIndex : 0;

  if (!p || !size) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % p.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + p.images.length) % p.images.length);
  };

  const handleAddToCart = () => {
    addItem(p, size, quantity, false);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(p, size, quantity, false);
    handleClose();
    setTimeout(() => {
      setIsCartOpen(true);
    }, 300); // give the modal time to close smoothly before opening cart
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 dark:bg-black/80"
          onClick={handleClose}
        >

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-4xl md:mx-4 max-h-[94svh] md:max-h-[88svh] bg-white dark:bg-[#0e0e0e] border-t md:border border-black/10 dark:border-white/[0.06] shadow-2xl overflow-hidden rounded-t-2xl md:rounded-lg flex flex-col md:flex-row transform-gpu"
            style={{ WebkitTransform: "translateZ(0)" }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 rtl:left-3 ltr:right-3 z-20 p-2 bg-white/90 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-gold dark:hover:text-gold rounded-full transition-colors backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* ─── Mobile: Single scrollable column ───── */}
            {/* ─── Desktop: Side-by-side layout ───────── */}

            {/* Image section - fixed height on mobile, fills half on desktop */}
            <div className="relative w-full md:w-[45%] h-[280px] sm:h-[340px] md:h-auto md:min-h-[480px] bg-neutral-100 dark:bg-black flex-shrink-0">
              <AnimatePresence initial={false}>
                {p.images[safeImageIndex] && (
                  <motion.div
                    key={safeImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={p.images[safeImageIndex]}
                      alt={p.name[lang]}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preload adjacent images */}
              <div className="hidden">
                {p.images.map((img) => (
                  <Image key={`preload-${img}`} src={img} alt="preload" width={1} height={1} priority />
                ))}
              </div>

              {/* Nav arrows */}
              {p.images.length > 1 && (
                <>
                  <button
                    onClick={lang === "ar" ? handleNextImage : handlePrevImage}
                    className="absolute rtl:right-3 ltr:left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/50 text-black dark:text-white rounded-full hover:bg-gold hover:text-white dark:hover:bg-gold dark:hover:text-black transition shadow-sm backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} className="rtl:rotate-180" />
                  </button>
                  <button
                    onClick={lang === "ar" ? handlePrevImage : handleNextImage}
                    className="absolute rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/50 text-black dark:text-white rounded-full hover:bg-gold hover:text-white dark:hover:bg-gold dark:hover:text-black transition shadow-sm backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} className="rtl:rotate-180" />
                  </button>
                </>
              )}

              {/* Image dots */}
              {p.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {p.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition duration-300 ${
                        idx === safeImageIndex
                          ? "bg-gold w-5"
                          : "bg-white/60 dark:bg-white/40 hover:bg-white w-1.5"
                      }`}
                      aria-label={`Image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ─── Product Details - scrollable ────── */}
            <div className="w-full md:w-[55%] overflow-y-auto flex flex-col">
              <div className="p-5 md:p-8 flex flex-col flex-grow">
                {/* Category */}
                <p className="text-gold text-[10px] uppercase tracking-[0.2em] mb-1">
                  {p.category === "Men" ? t("men") : t("women")} · {t("fragrance")}
                </p>

                {/* Name */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-black dark:text-white-warm mb-3 leading-tight">
                  {p.name[lang]}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                  {size.oldPrice && (
                    <span className="text-black/35 dark:text-white/35 line-through text-sm">
                      {size.oldPrice} TND
                    </span>
                  )}
                  <span className="text-lg font-semibold text-gold">
                    {size.price} TND
                  </span>
                </div>

                {/* Description */}
                <p className="text-black/60 dark:text-white/60 font-light text-sm leading-relaxed mb-4">
                  {p.description[lang]}
                </p>

                {/* Notes */}
                <div className="mb-4">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2">
                    {t("notes")}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.notes[lang].map((note: string) => (
                      <span
                        key={note}
                        className="px-2.5 py-1 bg-neutral-100 dark:bg-white/[0.04] text-black/75 dark:text-white/75 text-[11px] tracking-wider rounded-sm"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Size + Quantity row */}
                <div className="flex flex-wrap gap-5 mb-5">
                  {/* Size selector */}
                  <div className="flex-1 min-w-[140px]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-2">
                      {t("size")}
                    </h4>
                    <div className="flex gap-2">
                      {p.sizes.map((s) => (
                        <button
                          key={s.size}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-2 text-sm transition duration-200 rounded-sm ${
                            size.size === s.size
                              ? "bg-gold text-white dark:text-black font-medium shadow-sm"
                              : "bg-neutral-100 dark:bg-white/[0.04] text-black/60 dark:text-white/60 hover:bg-neutral-200 dark:hover:bg-white/[0.08]"
                          }`}
                        >
                          {s.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-2">
                      {t("quantity")}
                    </h4>
                    <div className="inline-flex items-center bg-neutral-100 dark:bg-white/[0.04] rounded-sm overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-gold dark:hover:text-gold transition-colors text-base"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-black dark:text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-gold dark:hover:text-gold transition-colors text-base"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky CTA buttons at bottom */}
              <div className="sticky bottom-0 px-5 md:px-8 py-4 bg-white/95 dark:bg-[#0e0e0e]/95 backdrop-blur-sm border-t border-black/[0.04] dark:border-white/[0.04] flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-xs uppercase tracking-[0.12em] font-semibold transition duration-300 rounded-sm flex items-center justify-center ${
                    addedFeedback
                      ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30"
                      : "border border-gold text-gold hover:bg-gold/10 active:bg-gold/15"
                  }`}
                >
                  {addedFeedback ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check size={14} /> ✓
                    </span>
                  ) : (
                    t("addToCart")
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 bg-gold text-white dark:text-black hover:bg-gold-dark active:bg-gold-dark transition duration-300 uppercase tracking-[0.12em] text-xs font-semibold rounded-sm hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                >
                  {t("buyNow")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
