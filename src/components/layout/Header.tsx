"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm transition-all",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label}
                {pathname === link.href || pathname.startsWith(link.href + "/") ? (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                ) : null}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
