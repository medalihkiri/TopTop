"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

interface CheckoutFormProps {
  onComplete: () => void;
}

export default function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { lang, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    try {
      // 1. Save to Firebase
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

      await addDoc(collection(db, "orders"), orderData);

      // 2. Generate WhatsApp Message
      const itemsList = items
        .map((item) => `- ${item.quantity}x ${item.product.name[lang]} (${item.size.size}) : ${item.size.price * item.quantity} TND`)
        .join("%0A");

      const message = `*NEW ORDER - TOP TOP* 🌟%0A%0A*Customer Details:*%0AName: ${formData.fullName}%0APhone: ${formData.phone}%0AGovernorate: ${formData.governorate}%0ACity: ${formData.city}%0A%0A*Order:*%0A${itemsList}%0A%0A*Total:* ${totalPrice} TND%0A%0A*Notes:* ${formData.note || "None"}`;

      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21699336444";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      setSuccess(true);
      clearCart();
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");
      
      // Close drawer after short delay
      setTimeout(() => {
        onComplete();
      }, 3000);

    } catch (error) {
      console.error("Error submitting order: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mb-5">
          <Check className="text-gold" size={24} />
        </div>
        <h3 className="text-xl font-serif text-gold mb-2">{t("orderReceived")}</h3>
        <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed max-w-xs">
          {t("orderSuccessMsg")}
        </p>
      </motion.div>
    );
  }

  const inputClasses =
    "w-full bg-neutral-50 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.06] px-4 py-3 text-sm text-black dark:text-white focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all duration-200 rounded-sm placeholder:text-black/30 dark:placeholder:text-white/25";

  const labelClasses =
    "block text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className={labelClasses}>{t("fullName")}</label>
        <input
          required
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={inputClasses}
          placeholder={t("namePlaceholder")}
          autoComplete="name"
        />
      </div>

      <div>
        <label className={labelClasses}>{t("phoneNumber")}</label>
        <input
          required
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClasses}
          placeholder={t("phonePlaceholder")}
          autoComplete="tel"
        />
      </div>

      <div>
        <label className={labelClasses}>{t("governorate")}</label>
        <input
          required
          type="text"
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          className={inputClasses}
          placeholder={t("govPlaceholder")}
          autoComplete="address-level1"
        />
      </div>

      <div>
        <label className={labelClasses}>{t("city")}</label>
        <input
          required
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={inputClasses}
          placeholder={t("cityPlaceholder")}
          autoComplete="address-level2"
        />
      </div>

      <div>
        <label className={labelClasses}>{t("noteOptional")}</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows={2}
          className={`${inputClasses} resize-none`}
          placeholder={t("notePlaceholder")}
        />
      </div>

      <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] mt-2">
        <div className="flex justify-between items-baseline mb-5">
          <span className="text-black/60 dark:text-white/60 text-sm">{t("total")}</span>
          <span className="text-lg font-serif text-gold font-bold">{totalPrice} TND</span>
        </div>
        <p className="text-[11px] text-black/35 dark:text-white/35 mb-4 text-center leading-relaxed">
          {t("codMessage")}
        </p>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gold text-white dark:text-black hover:bg-gold-dark transition-all duration-300 uppercase tracking-[0.15em] text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed rounded-sm hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              {t("processing")}
            </>
          ) : (
            t("completeOrder")
          )}
        </button>
      </div>
    </form>
  );
}
