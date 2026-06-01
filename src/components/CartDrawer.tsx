"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice } = useCart();
  const { lang, t } = useLanguage();
  const [isCheckout, setIsCheckout] = useState(false);

  // Handle browser back button
  useEffect(() => {
    if (isCartOpen) {
      window.history.pushState({ modal: "cart" }, "");
      const handlePopState = () => {
        setIsCartOpen(false);
        setTimeout(() => setIsCheckout(false), 300);
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isCartOpen) {
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
  }, [isCartOpen]);

  const handleClose = () => {
    if (window.history.state?.modal === "cart") {
      window.history.back();
    } else {
      setIsCartOpen(false);
      setTimeout(() => setIsCheckout(false), 300);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/65 dark:bg-black/80 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: lang === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: lang === "ar" ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35, mass: 0.9 }}
            className="fixed inset-y-0 rtl:left-0 ltr:right-0 w-full max-w-[400px] bg-white dark:bg-[#0d0d0d] shadow-2xl z-[101] flex flex-col transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06] flex-shrink-0">
              <div className="flex items-center gap-3">
                {isCheckout && (
                  <button
                    onClick={() => setIsCheckout(false)}
                    className="p-1.5 -ms-1 text-black/40 dark:text-white/40 hover:text-gold dark:hover:text-gold transition-colors rounded-md"
                    aria-label="Back to cart"
                  >
                    <ArrowLeft size={17} className="rtl:rotate-180" />
                  </button>
                )}
                <div>
                  <h2 className="text-base font-serif text-gold leading-tight">
                    {isCheckout ? t("checkout") : t("yourCart")}
                  </h2>
                  {!isCheckout && items.length > 0 && (
                    <p className="text-[10px] text-black/35 dark:text-white/35 tracking-wide mt-0.5">
                      {items.length} {items.length === 1 ? (lang === "ar" ? "منتج" : "article") : (lang === "ar" ? "منتجات" : "articles")}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 -me-1.5 text-black/45 dark:text-white/45 hover:text-gold dark:hover:text-gold transition-colors rounded-md hover:bg-gold/8"
                aria-label="Close cart"
              >
                <X size={19} />
              </button>
            </div>

            {!isCheckout ? (
              <>
                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                      <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-white/[0.04] flex items-center justify-center">
                        <ShoppingBag size={28} className="text-black/25 dark:text-white/25" />
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.15em] text-xs text-black/50 dark:text-white/50 mb-1">
                          {t("cartEmpty")}
                        </p>
                        <p className="text-[11px] text-black/30 dark:text-white/30">
                          {lang === "ar" ? "أضف بعض العطور لتبدأ" : "Ajoutez des parfums pour commencer"}
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="mt-2 px-6 py-2.5 border border-gold/50 text-gold text-xs uppercase tracking-[0.15em] hover:bg-gold hover:text-black transition-all duration-300 rounded-sm font-medium"
                      >
                        {t("continueShopping")}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: lang === "ar" ? 40 : -40, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="flex gap-3.5 group"
                          >
                            {/* Thumbnail */}
                            <div className="relative w-[72px] h-[90px] bg-neutral-100 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] flex-shrink-0 rounded-md overflow-hidden">
                              {item.product.images[0] && (
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.name[lang]}
                                  fill
                                  className="object-cover"
                                  sizes="72px"
                                />
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex flex-col flex-grow min-w-0">
                              <div className="flex justify-between items-start gap-2 mb-1">
                                <div className="min-w-0">
                                  <h4 className="font-serif text-sm text-black dark:text-white-warm truncate leading-snug">
                                    {item.product.name[lang]}
                                  </h4>
                                  <p className="text-black/40 dark:text-white/40 text-[11px] mt-0.5">
                                    {item.size.size}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="flex-shrink-0 p-1 text-black/25 dark:text-white/25 hover:text-red-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                  aria-label="Remove item"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>

                              <div className="mt-auto flex items-center justify-between">
                                {/* Qty stepper */}
                                <div className="inline-flex items-center border border-black/10 dark:border-white/10 rounded-sm overflow-hidden">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-gold hover:bg-gold/8 text-sm transition-colors"
                                    aria-label="Decrease"
                                  >
                                    −
                                  </button>
                                  <span className="w-7 text-center text-xs font-semibold text-black dark:text-white border-x border-black/10 dark:border-white/10">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-gold hover:bg-gold/8 text-sm transition-colors"
                                    aria-label="Increase"
                                  >
                                    +
                                  </button>
                                </div>

                                <span className="text-gold font-semibold text-sm">
                                  {item.size.price * item.quantity} TND
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="px-5 py-5 border-t border-black/[0.06] dark:border-white/[0.06] flex-shrink-0 bg-neutral-50/60 dark:bg-white/[0.015]">
                    {/* Subtotal */}
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-black/55 dark:text-white/50 uppercase tracking-[0.15em] text-[10px]">
                        {t("subtotal")}
                      </span>
                      <span className="text-xl font-serif text-gold">{totalPrice} TND</span>
                    </div>

                    {/* COD note */}
                    <p className="text-[10px] text-black/35 dark:text-white/35 text-center mb-4 leading-relaxed">
                      {lang === "ar" ? "💵 الدفع نقداً عند الاستلام" : "💵 Paiement à la livraison"}
                    </p>

                    <button
                      onClick={() => setIsCheckout(true)}
                      className="group w-full py-3.5 bg-gold text-black hover:bg-gold-dark transition-all duration-300 uppercase tracking-[0.18em] text-xs font-bold rounded-sm hover:shadow-[0_6px_24px_rgba(212,175,55,0.35)] relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">{t("proceedToCheckout")}</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <CheckoutForm onComplete={handleClose} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
