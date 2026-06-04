"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Check, Loader2, User, Phone, MapPin, FileText, ShoppingBag } from "lucide-react";

interface CheckoutFormProps {
  onComplete: () => void;
}

export default function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { lang, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    governorate: "",
    city: "",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const orderData = {
        customer: formData,
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name[lang],
          size: item.size.size,
          price: item.size.price,
          quantity: item.quantity
        })),
        totalAmount: totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      const writeOrder = addDoc(collection(getDb(), "orders"), orderData);
      const timeout = new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new Error("timeout")), 20000);
      });
      await Promise.race([writeOrder, timeout]);

      const itemsList = items
        .map((item) => `- ${item.quantity}x ${item.product.name[lang]} (${item.size.size}) : ${item.size.price * item.quantity} TND`)
        .join("\n");

      const message = `*NEW ORDER - TOP TOP* 🌟\n\n*Customer Details:*\nName: ${formData.fullName}\nPhone: ${formData.phone}\nGovernorate: ${formData.governorate}\nCity: ${formData.city}\n\n*Order:*\n${itemsList}\n\n*Total:* ${totalPrice} TND\n\n*Notes:* ${formData.note || "None"}`;

      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21699336444";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      setSuccess(true);
      clearCart();

      window.open(whatsappUrl, "_blank");

      setTimeout(() => {
        onComplete();
      }, 3000);

    } catch (error) {
      console.error("Error submitting order:", error);

      if (error instanceof FirebaseError && error.code === "permission-denied") {
        setSubmitError(t("orderErrorRules"));
      } else if (error instanceof Error && error.message === "timeout") {
        setSubmitError(t("orderErrorTimeout"));
      } else if (error instanceof Error && error.message.includes("not configured")) {
        setSubmitError(t("orderErrorConfig"));
      } else {
        setSubmitError(t("orderErrorGeneric"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center py-16 text-center gap-5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 20 }}
          className="w-16 h-16 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center"
        >
          <Check className="text-gold" size={26} />
        </motion.div>
        <div>
          <h3 className="text-xl font-serif text-gold mb-2">{t("orderReceived")}</h3>
          <p className="text-black/55 dark:text-white/50 text-sm leading-relaxed max-w-xs">
            {t("orderSuccessMsg")}
          </p>
        </div>
      </motion.div>
    );
  }

  const inputBase =
    "w-full bg-white dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.08] px-4 py-3 text-sm text-black dark:text-white focus:border-gold focus:ring-2 focus:ring-gold/15 outline-none transition-all duration-200 rounded-sm placeholder:text-black/30 dark:placeholder:text-white/30";

  const labelBase =
    "flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Order summary mini */}
      <div className="bg-neutral-50 dark:bg-white/[0.025] border border-black/[0.06] dark:border-white/[0.05] rounded-sm p-3 mb-1">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag size={13} className="text-gold" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-black/50 dark:text-white/50">
            {lang === "ar" ? "ملخص الطلب" : "Résumé de la commande"}
          </span>
        </div>
        <div className="space-y-1 max-h-28 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-xs text-black/60 dark:text-white/55">
              <span className="truncate flex-1 me-2">{item.quantity}× {item.product.name[lang]} ({item.size.size})</span>
              <span className="flex-shrink-0 text-gold font-medium">{item.size.price * item.quantity} TND</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-baseline pt-2 mt-2 border-t border-black/[0.06] dark:border-white/[0.05]">
          <span className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-wider">{t("total")}</span>
          <span className="text-gold font-serif font-semibold text-base">{totalPrice} TND</span>
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label className={labelBase}>
          <User size={11} />
          {t("fullName")}
        </label>
        <input
          required
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={inputBase}
          placeholder={t("namePlaceholder")}
          autoComplete="name"
        />
      </div>

      {/* Phone */}
      <div>
        <label className={labelBase}>
          <Phone size={11} />
          {t("phoneNumber")}
        </label>
        <input
          required
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputBase}
          placeholder={t("phonePlaceholder")}
          autoComplete="tel"
          dir="ltr"
        />
      </div>

      {/* Governorate + City row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelBase}>
            <MapPin size={11} />
            {t("governorate")}
          </label>
          <input
            required
            type="text"
            name="governorate"
            value={formData.governorate}
            onChange={handleChange}
            className={inputBase}
            placeholder={t("govPlaceholder")}
            autoComplete="address-level1"
          />
        </div>
        <div>
          <label className={labelBase}>
            <MapPin size={11} />
            {t("city")}
          </label>
          <input
            required
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputBase}
            placeholder={t("cityPlaceholder")}
            autoComplete="address-level2"
          />
        </div>
      </div>

      {/* Note */}
      <div>
        <label className={labelBase}>
          <FileText size={11} />
          {t("noteOptional")}
        </label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows={2}
          className={`${inputBase} resize-none`}
          placeholder={t("notePlaceholder")}
        />
      </div>

      {/* COD note */}
      <p className="text-[11px] text-black/40 dark:text-white/40 text-center leading-relaxed py-1">
        💵 {t("codMessage")}
      </p>

      {submitError && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center leading-relaxed px-1">
          {submitError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gold text-black hover:bg-gold-dark transition-all duration-300 uppercase tracking-[0.18em] text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed rounded-sm hover:shadow-[0_6px_24px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin relative" />
            <span className="relative">{t("processing")}</span>
          </>
        ) : (
          <span className="relative">{t("completeOrder")}</span>
        )}
      </button>
    </form>
  );
}
