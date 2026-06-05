import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable modern formats — Next.js will serve AVIF then WebP, falling back to the original.
    formats: ["image/avif", "image/webp"],
    // Tailor the device widths to our grid breakpoints (50vw on mobile, 33vw tablet, 25vw desktop).
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 240, 270, 300, 400, 640],
    // Keep 60-day cache for product images (they rarely change).
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },
  // Compress all responses
  compress: true,
};

export default nextConfig;
