import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cairo, Amiri } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toptop-parfums.tn"),
  title: {
    default: "TOP TOP — Parfums de Luxe | عطور فاخرة في تونس",
    template: "%s | TOP TOP Parfums",
  },
  description:
    "Découvrez des parfums authentiques haut de gamme chez Top Top Bizerte. اكتشف عطوراً أصيلة فاخرة من متجر توب توب في بنزرت. Livraison partout en Tunisie — التوصيل لجميع ولايات تونس.",
  keywords: [
    "parfums tunisie",
    "عطور تونس",
    "parfums luxe",
    "عطور فاخرة",
    "top top parfums",
    "توب توب عطور",
    "bizerte parfums",
    "عطور بنزرت",
    "oud tunisie",
    "عود تونس",
  ],
  authors: [{ name: "TOP TOP Parfums" }],
  creator: "TOP TOP Parfums",
  openGraph: {
    type: "website",
    locale: "fr_TN",
    alternateLocale: "ar_TN",
    url: "https://toptop-parfums.tn",
    siteName: "TOP TOP Parfums",
    title: "TOP TOP — Parfums de Luxe | عطور فاخرة في تونس",
    description:
      "Découvrez des parfums authentiques haut de gamme chez Top Top Bizerte. Livraison partout en Tunisie.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TOP TOP Parfums — Le Luxe dans Chaque Goutte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOP TOP — Parfums de Luxe | عطور فاخرة في تونس",
    description:
      "Découvrez des parfums authentiques haut de gamme chez Top Top Bizerte.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0B" },
    { media: "(prefers-color-scheme: light)", color: "#F5F1E8" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover", // Required for env(safe-area-inset-*) on iOS Safari
};

// Flash-of-RTL prevention: reads localStorage before first paint and sets
// dir + lang on the <html> element so there is zero layout shift on reload.
const antiFlashScript = `
(function() {
  try {
    var lang = localStorage.getItem('toptop_lang');
    if (lang === 'fr') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'fr');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${playfair.variable} ${cairo.variable} ${amiri.variable} h-full antialiased dark`}
    >
      <head>
        {/* Inline script runs synchronously before any paint — zero flash */}
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black dark:bg-black dark:text-white-warm transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-grow">{children}</main>
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
