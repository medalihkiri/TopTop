"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice } = useCart();
  const { lang, t } = useLanguage();
  const [isCheckout, setIsCheckout] = useState(false);

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsCheckout(false), 300);
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
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: lang === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: lang === "ar" ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 rtl:left-0 ltr:right-0 w-full max-w-[420px] bg-white dark:bg-[#0e0e0e] shadow-2xl z-[101] flex flex-col transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <h2 className="text-lg font-serif text-gold">
                {isCheckout ? t("checkout") : t("yourCart")}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 -me-2 text-black/40 dark:text-white/40 hover:text-gold dark:hover:text-gold transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {!isCheckout ? (
              <>
                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-black/40 dark:text-white/40">
                      <ShoppingBag size={40} className="mb-4 opacity-40" />
                      <p className="uppercase tracking-[0.15em] text-xs mb-5">{t("cartEmpty")}</p>
                      <button
                        onClick={handleClose}
                        className="text-gold text-sm underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
                      >
                        {t("continueShopping")}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          className="flex gap-3.5"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-[72px] h-[90px] bg-neutral-100 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.04] flex-shrink-0 rounded-sm overflow-hidden">
                            {item.product.images[0] && (
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name[lang]}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex flex-col flex-grow min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <div className="min-w-0">
                                <h4 className="font-serif text-sm text-black dark:text-white-warm truncate">
                                  {item.product.name[lang]}
                                </h4>
                                <p className="text-black/40 dark:text-white/40 text-[11px] mt-0.5">
                                  {item.size.size}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex-shrink-0 p-1 text-black/25 dark:text-white/25 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="mt-auto pt-2 flex items-center justify-between">
                              {/* Qty stepper */}
                              <div className="inline-flex items-center bg-neutral-100 dark:bg-white/[0.04] rounded-sm overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-gold text-xs"
                                  aria-label="Decrease"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center text-xs font-medium text-black dark:text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-gold text-xs"
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
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="px-5 py-5 border-t border-black/[0.06] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.015]">
                    <div className="flex justify-between items-baseline mb-5">
                      <span className="text-black/50 dark:text-white/50 uppercase tracking-[0.15em] text-[11px]">
                        {t("subtotal")}
                      </span>
                      <span className="text-xl font-serif text-gold">{totalPrice} TND</span>
                    </div>
                    <button
                      onClick={() => setIsCheckout(true)}
                      className="w-full py-3.5 bg-gold text-white dark:text-black hover:bg-gold-dark transition duration-300 uppercase tracking-[0.15em] text-xs font-bold rounded-sm hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                    >
                      {t("proceedToCheckout")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <button
                  onClick={() => setIsCheckout(false)}
                  className="mb-5 text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {t("backToCart")}
                </button>
                <CheckoutForm onComplete={handleClose} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
