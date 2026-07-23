"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

/**
 * Sticky site header with navigation and social contact links.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-yellow-400/95 backdrop-blur supports-[backdrop-filter]:bg-yellow-400/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <h1 className="sr-only">Do Quintal à Cozinha</h1>
          <h2 className="sr-only">Navegação do site</h2>
          <MainNav />
          <MobileNav />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <nav className="flex items-center gap-0.5" aria-label="Contato">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0 text-purple-600 hover:text-purple-800"
              >
                <Link
                  href={siteConfig.links.ig}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visitar página do MMTR-SE no Instagram (abre em nova aba)"
                >
                  <InstagramIcon aria-hidden="true" />
                  <span className="sr-only">Visitar página do MMTR-SE no Instagram (abre em nova aba)</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0 text-purple-600 hover:text-purple-800"
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/api/email?subject=Contato via site', '_blank');
                  }}
                  className="cursor-pointer"
                  aria-label="Enviar email para o MMTR-SE (abre em nova aba)"
                >
                  <MailOutlineIcon aria-hidden="true" />
                  <span className="sr-only">Enviar email para o MMTR-SE (abre em nova aba)</span>
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
