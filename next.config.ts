import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 16,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
      {
        urlPattern: /^https:\/\/api\..*$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60, // 1 hour
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  // Standalone mode for Docker deployment (reduces image size ~50%)
  output: "standalone",

  // Trailing slashes for consistent SEO and social sharing URLs
  trailingSlash: true,

  // CORS headers for external API access (Typebot, WhatsApp integration)
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type, API_KEY",
        },
      ],
    },
  ],

  // Whitelisted domains for Next.js Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "typebot.luisotee.com",
        port: "",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "storage.luisotee.com",
        port: "",
        pathname: "/typebot/public/**",
      },
      {
        protocol: "https",
        hostname: "md.coolab.org",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "typebot.mulheresrurais.com.br",
        port: "",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "storage.mulheresrurais.com.br",
        port: "",
        pathname: "/typebot/public/**",
      },
    ],
  },
};

export default withPWA(nextConfig);
