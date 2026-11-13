import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/**
 * Root layout with providers, fonts, metadata, and skip-to-content link.
 */

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Do Quintal à Cozinha",
  description:
    "Descubra produtos artesanais únicos feitos por mulheres artesãs do interior de Sergipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${montserratSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-purple-600 focus:text-white focus:top-0 focus:left-0"
        >
          Pular para o conteúdo principal
        </a>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col justify-between h-[100vh]">
              <Header />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
