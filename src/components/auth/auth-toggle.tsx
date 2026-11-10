"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "cn";

const authTabs = [
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
] as const;

export function AuthToggle() {
  const pathname = usePathname();

  return (
    <div
      role="tablist"
      aria-label="Authentication"
      className="flex w-full rounded-xl border border-white/10 bg-white/5 p-1"
    >
      {authTabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={active}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex-1 rounded-lg py-2 text-center text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              active
                ? "bg-indigo-500 text-white hover:bg-indigo-500"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
