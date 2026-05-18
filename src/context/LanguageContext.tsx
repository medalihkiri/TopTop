"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "fr";

interface Translations {
  [key: string]: {
    ar: string;
    fr: string;
  };
}

export const translations: Translations = {
  promos: { ar: "العروض", fr: "Promos" },
  catalogue: { ar: "المجموعة", fr: "Catalogue" },
  contact: { ar: "اتصل بنا", fr: "Contact" },
  heroSubtitle: { ar: "للـعطور", fr: "Parfums" },
  heroDesc: {
    ar: "اكتشف جوهر الأناقة. عطور أصلية فاخرة مصممة لأصحاب الذوق الرفيع.",
    fr: "Découvrez l'essence de l'élégance. Des parfums authentiques haut de gamme conçus pour les goûts raffinés.",
  },
  exploreCollection: { ar: "تصفح المجموعة", fr: "Explorer la collection" },
  scroll: { ar: "تمرير", fr: "Défiler" },
  exclusiveOffers: { ar: "عروض حصرية", fr: "Offres exclusives" },
  promo: { ar: "تخفيض", fr: "Promo" },
  ourCollection: { ar: "مجموعتنا", fr: "Notre Collection" },
  women: { ar: "نسائي", fr: "Femme" },
  men: { ar: "رجالي", fr: "Homme" },
  quickView: { ar: "نظرة سريعة", fr: "Aperçu" },
  from: { ar: "ابتداءً من", fr: "À partir de" },
  fragrance: { ar: "عطر", fr: "Parfum" },
  notes: { ar: "المكونات", fr: "Notes" },
  size: { ar: "الحجم", fr: "Taille" },
  quantity: { ar: "الكمية", fr: "Quantité" },
  addToCart: { ar: "أضف إلى السلة", fr: "Ajouter au panier" },
  buyNow: { ar: "اشترِ الآن", fr: "Acheter maintenant" },
  yourCart: { ar: "سلة المشتريات", fr: "Votre Panier" },
  checkout: { ar: "إتمام الطلب", fr: "Commander" },
  cartEmpty: { ar: "السلة فارغة", fr: "Le panier est vide" },
  continueShopping: { ar: "مواصلة التسوق", fr: "Continuer les achats" },
  subtotal: { ar: "المجموع الفرعي", fr: "Sous-total" },
  proceedToCheckout: { ar: "متابعة إتمام الطلب", fr: "Passer à la caisse" },
  backToCart: { ar: "← العودة للسلة", fr: "← Retour au panier" },
  fullName: { ar: "الاسم الكامل", fr: "Nom complet" },
  phoneNumber: { ar: "رقم الهاتف", fr: "Numéro de téléphone" },
  governorate: { ar: "الولاية", fr: "Gouvernorat" },
  city: { ar: "المدينة / العنوان بالتفصيل", fr: "Ville / Adresse exacte" },
  noteOptional: { ar: "ملاحظة (اختياري)", fr: "Note (Optionnel)" },
  total: { ar: "المجموع", fr: "Total" },
  codMessage: {
    ar: "الدفع نقداً عند الاستلام. لا حاجة لبطاقة ائتمان.",
    fr: "Paiement à la livraison. Aucune carte de crédit requise.",
  },
  completeOrder: { ar: "تأكيد الطلب", fr: "Confirmer la commande" },
  processing: { ar: "جاري المعالجة...", fr: "Traitement en cours..." },
  orderReceived: { ar: "تم استلام الطلب!", fr: "Commande Reçue !" },
  orderSuccessMsg: {
    ar: "تم تقديم طلبك بنجاح. جاري فتح واتساب لتأكيد الطلب...",
    fr: "Votre commande a été soumise avec succès. Ouverture de WhatsApp pour confirmer...",
  },
  visitBoutique: { ar: "قم بزيارة متجرنا", fr: "Visitez notre boutique" },
  visitDesc: {
    ar: "عش جوهر الفخامة شخصياً. ندعوك لاكتشاف مجموعتنا المختارة.",
    fr: "Découvrez l'essence du luxe en personne. Nous vous invitons à découvrir notre collection.",
  },
  location: { ar: "الموقع", fr: "Emplacement" },
  locationAddress: {
    ar: "شارع الحبيب بورقيبة\nتونس، تونس",
    fr: "Avenue Habib Bourguiba\nTunis, Tunisie",
  },
  phoneWhatsApp: { ar: "الهاتف وواتساب", fr: "Téléphone & WhatsApp" },
  whatsappUs: { ar: "راسلنا على واتساب", fr: "Contactez-nous via WhatsApp" },
  followUs: { ar: "تابعنا", fr: "Suivez-nous" },
  footerDesc: {
    ar: "عطور فاخرة مصممة لأصحاب الذوق الرفيع. الفخامة في كل قطرة.",
    fr: "Des parfums haut de gamme conçus pour les goûts raffinés. Le luxe dans chaque goutte.",
  },
  terms: { ar: "شروط الخدمة", fr: "Conditions d'utilisation" },
  privacy: { ar: "سياسة الخصوصية", fr: "Politique de confidentialité" },
  refunds: { ar: "سياسة الاسترجاع", fr: "Remboursements" },
  rights: { ar: "جميع الحقوق محفوظة.", fr: "Tous droits réservés." },
  namePlaceholder: { ar: "مثال: علي بن صالح", fr: "ex: Ali Ben Saleh" },
  phonePlaceholder: { ar: "مثال: 55 123 456", fr: "ex: 55 123 456" },
  govPlaceholder: { ar: "مثال: تونس", fr: "ex: Tunis" },
  cityPlaceholder: { ar: "مثال: المرسى، شارع 14 جانفي", fr: "ex: La Marsa, Rue 14 Janvier" },
  notePlaceholder: { ar: "أي تعليمات خاصة...", fr: "Toute instruction spéciale..." },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("toptop_lang") as Language;
    if (savedLang && (savedLang === "ar" || savedLang === "fr")) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("toptop_lang", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
