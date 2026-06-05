"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  Check,
  Loader2,
  User,
  Phone,
  MapPin,
  FileText,
  ShoppingBag,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

interface CheckoutFormProps {
  onComplete: () => void;
}

export default function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { lang, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successWhatsappUrl, setSuccessWhatsappUrl] = useState<string | null>(null);
  const [confirmedPhone, setConfirmedPhone] = useState("");
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

      setConfirmedPhone(formData.phone);
      setSuccessWhatsappUrl(whatsappUrl);
      setSuccess(true);
      clearCart();

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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
        className="flex flex-col gap-5 py-4"
      >
        {/* Confirmation */}
        <div className="text-center px-1">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.05 }}
            className="relative mx-auto w-[4.5rem] h-[4.5rem] mb-5"
          >
            <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-40" />
            <span className="absolute inset-1 rounded-full bg-gold/10 border border-gold/30" />
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-gold/25 to-gold/10 border border-gold/40 shadow-[0_8px_32px_rgba(212,175,55,0.25)]">
              <Check className="text-gold" size={28} strokeWidth={2.5} />
            </span>
          </motion.div>

          <h3 className="text-xl md:text-2xl font-serif text-gold mb-2 tracking-wide">
            {t("orderReceived")}
          </h3>
          <p className="text-sm text-black/65 dark:text-white/60 leading-relaxed max-w-[18rem] mx-auto">
            {t("orderSuccessMsg")}
          </p>

          {confirmedPhone && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-gold/[0.07] px-4 py-2"
            >
              <PhoneCall size={15} className="text-gold shrink-0" />
              <div className="text-start">
                <p className="text-[9px] uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
                  {t("orderSuccessPhoneLabel")}
                </p>
                <p className="text-sm font-medium text-black dark:text-white tabular-nums" dir="ltr">
                  {confirmedPhone}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Optional WhatsApp */}
        {successWhatsappUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="rounded-sm border border-black/[0.08] dark:border-white/[0.08] bg-neutral-50/90 dark:bg-white/[0.03] p-4 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle size={18} />
              </span>
              <div className="text-start min-w-0">
                <p className="text-sm font-semibold text-black dark:text-white leading-snug">
                  {t("whatsappOptionalTitle")}
                </p>
                <p className="text-xs text-black/55 dark:text-white/50 mt-1 leading-relaxed">
                  {t("whatsappOptionalDesc")}
                </p>
              </div>
            </div>

            <a
              href={successWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2.5 rounded-sm bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-300 hover:bg-[#20BD5A] hover:shadow-[0_6px_28px_rgba(37,211,102,0.45)] active:scale-[0.98]"
            >
              <MessageCircle size={18} className="shrink-0" />
              <span>{t("sendOrderWhatsApp")}</span>
            </a>
          </motion.div>
        )}

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          onClick={onComplete}
          className="w-full py-3.5 text-xs uppercase tracking-[0.16em] text-black/55 dark:text-white/50 border border-black/10 dark:border-white/10 rounded-sm hover:border-gold/40 hover:text-gold dark:hover:text-gold transition-colors duration-200"
        >
          {t("orderDoneShopping")}
        </motion.button>
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
