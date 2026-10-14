import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
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

export default nextConfig;
