"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/site-logo";

const navLinks = [
  { label: "Browse Jobs", href: "#" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
];

function DesktopLinks() {
  return (
    <div className="hidden items-center gap-7 md:flex">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="rounded-md text-sm font-medium text-zinc-300 transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {link.label}
        </Link>
      ))}
      <span className="h-5 w-px bg-white/15" aria-hidden="true" />
      <Link
        href="/sign-in"
        className="rounded-md text-sm font-medium text-indigo-400 transition-colors outline-none hover:text-indigo-300 focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Sign In
      </Link>
      <Button
        render={<Link href="/sign-up" />}
        className="h-9 rounded-lg bg-indigo-500 px-4 text-white shadow-[0_0_16px_rgba(99,102,241,0.35)] hover:bg-indigo-400"
      >
        Get Started
      </Button>
    </div>
  );
}

function MobileMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  if (!open) return null;

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-[#1c1c21] p-3 md:hidden">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 outline-none hover:bg-white/5 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {link.label}
        </Link>
      ))}
      <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
        <Button
          render={<Link href="/sign-in" onClick={onNavigate} />}
          variant="outline"
          className="h-10 rounded-lg border-white/10 bg-transparent text-indigo-400 hover:bg-white/5 hover:text-indigo-300"
        >
          Sign In
        </Button>
        <Button
          render={<Link href="/sign-up" onClick={onNavigate} />}
          className="h-10 rounded-lg bg-indigo-500 text-white shadow-[0_0_16px_rgba(99,102,241,0.35)] hover:bg-indigo-400"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export function SiteNavbar({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn("px-4 pt-4 sm:px-6", className)}>
      <div className="mx-auto w-full max-w-7xl">
        <nav className="relative flex items-center justify-between rounded-xl border border-white/5 bg-[#1d1d22] px-4 py-2.5 shadow-2xl shadow-black/40 sm:px-5">
          <SiteLogo className="h-8 w-auto min-[480px]:h-7" />

          <DesktopLinks />

          <Button
            variant="ghost"
            size="icon"
            aria-expanded={mobileOpen}
            aria-controls="site-nav-mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="text-zinc-300 hover:bg-white/5 hover:text-white md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>

          {mobileOpen && (
            <div
              id="site-nav-mobile-menu"
              className="absolute inset-x-4 top-[calc(100%+8px)] z-50 sm:inset-x-5"
            >
              <MobileMenu
                open={mobileOpen}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
