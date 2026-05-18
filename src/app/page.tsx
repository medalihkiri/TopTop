"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import PromoSpotlight from "@/components/PromoSpotlight";
import ProductCatalogue from "@/components/ProductCatalogue";
import ContactSection from "@/components/ContactSection";
import ProductModal from "@/components/ProductModal";
import { products, Product } from "@/data/products";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Hero />
      <PromoSpotlight products={products} onOpenModal={setSelectedProduct} />
      <ProductCatalogue onOpenModal={setSelectedProduct} />
      <ContactSection />
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
