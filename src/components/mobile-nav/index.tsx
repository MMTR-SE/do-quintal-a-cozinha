"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Mobile drawer navigation triggered by hamburger menu icon.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} modal={true}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Abrir menu de navegação"
          aria-expanded={open}
          className="h-8 gap-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent md:hidden"
        >
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80svh] p-0">
        <DrawerTitle className="sr-only">Menu de navegação</DrawerTitle>
        <nav className="flex flex-col" aria-label="Menu principal">
          <div className="flex justify-end p-4 border-b">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar menu"
                autoFocus
              >
                <CloseIcon />
              </Button>
            </DrawerClose>
          </div>
          <div className="flex flex-col p-6 space-y-4">
            <MobileLink href="/" onOpenChange={setOpen}>
              Home
            </MobileLink>
            <MobileLink href="/onde-estamos" onOpenChange={setOpen}>
              Onde Estamos
            </MobileLink>
            <MobileLink href="/nossas-historias" onOpenChange={setOpen}>
              Nossas Histórias
            </MobileLink>
            <MobileLink href="/nossa-producao" onOpenChange={setOpen}>
              Nossa Produção
            </MobileLink>
            <MobileLink href="/nossas-receitas" onOpenChange={setOpen}>
              Nossas Receitas
            </MobileLink>
            <MobileLink href="/nosso-espaco" onOpenChange={setOpen}>
              Nosso Espaço
            </MobileLink>
          </div>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-[1.15rem] py-2", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
