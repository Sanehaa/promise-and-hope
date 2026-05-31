"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { NavLinkItem } from "@/types/content";
import { DonateButton } from "@/components/shared/DonateButton";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavbarProps = { links: NavLinkItem[] };

export function Navbar({ links }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Solid nav on inner pages; transparent-over-hero only on home before scroll
  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          overHero
            ? "bg-transparent py-5"
            : "glass-nav border-b border-border/50 shadow-md py-3"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <span
              className={cn(
                "font-heading text-xl font-semibold transition-colors sm:text-2xl",
                overHero ? "text-white" : "text-primary"
              )}
            >
              Promise & Hope
            </span>
            <span
              className={cn(
                "hidden text-xs italic transition-colors sm:block",
                overHero ? "text-white/70" : "text-muted-foreground"
              )}
            >
              Faith in Action. Hope in Every Heart.
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  pathname === link.href
                    ? overHero
                      ? "bg-white/15 text-white"
                      : "bg-secondary text-primary"
                    : overHero
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <DonateButton size="sm" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "xl:hidden",
                overHero && "text-white hover:bg-white/10 hover:text-white"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </header>

      <MobileMenu
        key={pathname}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
      />
    </>
  );
}
