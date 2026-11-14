
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type Currency = "BDT" | "USD";

const PLAN = {
  name: "Hireloop Pro",
  tagline: "Everything you need to get hired faster.",
  usdPrice: 20,
  exchangeRate: 127.5665,
};

const CURRENCY_BOXES: {
  code: Currency;
  flag: string;
  label: string;
}[] = [
  { code: "BDT", flag: "🇧🇩", label: "Bangladeshi Taka" },
  { code: "USD", flag: "🇺🇸", label: "US Dollar" },
];

function formatAmount(currency: Currency) {
  if (currency === "USD") return `$${PLAN.usdPrice.toFixed(2)}`;

  return `৳${Math.round(
    PLAN.usdPrice * PLAN.exchangeRate
  ).toLocaleString("en-US")}`;
}

const FEATURES = [
  "Unlimited job applications",
  "Advanced job search filters",
  "Priority application visibility",
  "Application tracking dashboard",
  "Premium career insights",
];

export default function PaymentPage() {
  const { data: session } = authClient.useSession();

  const [currency, setCurrency] = useState<Currency>("BDT");
  const [email, setEmail] = useState(session?.user.email ?? "");
  const [paying, setPaying] = useState(false);

  async function handlePay() {
    if (!email) return;

    setPaying(true);

    // TODO: Create Stripe Checkout session and redirect.
    console.log("Redirecting to Stripe checkout…", {
      currency,
      email,
    });

    setPaying(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090f] px-4 py-8 text-white sm:py-12">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 size-[450px] rounded-full bg-indigo-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[450px] rounded-full bg-violet-600/15 blur-[130px]" />

      <div className="relative mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <Link
            href="/dashboard/seeker"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <Lock className="size-3.5" />
            Secure Checkout
          </div>
        </header>

        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Sparkles className="size-7" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Upgrade your career journey
          </h1>

          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Unlock premium tools and take your job search to the next level.
          </p>
        </div>

        {/* Checkout layout */}
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#111119] shadow-2xl shadow-black/40 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Left: Plan details */}
          <section className="relative overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">

            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-indigo-500/10 blur-[90px]" />

            <div className="relative">

              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Your selected plan
                </span>

                <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                  <Zap className="mr-1 inline size-3" />
                  PRO
                </span>
              </div>

              {/* Plan card */}
              <div className="rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 via-violet-500/5 to-transparent p-6">

                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                  <Sparkles className="size-6 text-white" />
                </div>

                <h2 className="text-2xl font-bold">
                  {PLAN.name}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {PLAN.tagline}
                </p>

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {formatAmount(currency)}
                  </span>
                  <span className="mb-1 text-sm text-zinc-500">
                    / one-time
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-emerald-400">
                  <Check className="size-4" />
                  No subscription. No recurring charges.
                </div>
              </div>

              {/* Features */}
              <div className="mt-9">
                <h3 className="mb-5 text-sm font-semibold text-white">
                  What's included
                </h3>

                <ul className="space-y-4">
                  {FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-zinc-400"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <Check className="size-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust */}
              <div className="mt-10 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-4">
                <ShieldCheck className="size-6 shrink-0 text-emerald-400" />

                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    Your payment is protected
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Secure payment processing powered by Stripe.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Payment details */}
          <section className="flex flex-col p-7 sm:p-10">

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Checkout details
              </span>

              <h2 className="mt-3 text-2xl font-bold">
                Complete your purchase
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Just a few details to get you started.
              </p>
            </div>

            {/* Currency */}
            <div className="mt-9">
              <Label className="text-sm font-semibold text-zinc-300">
                Select currency
              </Label>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {CURRENCY_BOXES.map((option) => {
                  const selected = currency === option.code;

                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => setCurrency(option.code)}
                      aria-pressed={selected}
                      className={`relative rounded-xl border p-4 text-left transition-all ${
                        selected
                          ? "border-indigo-500/70 bg-indigo-500/10 ring-1 ring-indigo-500/30"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      {selected && (
                        <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-indigo-500 text-white">
                          <Check className="size-3" />
                        </span>
                      )}

                      <span className="text-xl">{option.flag}</span>

                      <p className="mt-3 text-sm font-semibold text-white">
                        {option.code}
                      </p>

                      <p className="mt-1 text-[11px] text-zinc-500">
                        {option.label}
                      </p>

                      <p className="mt-3 text-sm font-bold text-indigo-300">
                        {formatAmount(option.code)}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-xs text-zinc-600">
                Exchange rate: 1 USD = {PLAN.exchangeRate} BDT
              </p>
            </div>

            {/* Email */}
            <div className="mt-9">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-zinc-300"
              >
                Billing email address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-3 h-12 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <p className="mt-2 text-xs text-zinc-600">
                Your payment confirmation will be sent to this address.
              </p>
            </div>

            {/* Order total */}
            <div className="mt-9 space-y-3 border-t border-white/10 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">
                  {PLAN.name}
                </span>
                <span className="font-medium text-zinc-300">
                  {formatAmount(currency)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Discount</span>
                <span className="text-emerald-400">Included</span>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-semibold text-white">
                  Total due today
                </span>
                <span className="text-2xl font-bold text-white">
                  {formatAmount(currency)}
                </span>
              </div>
            </div>

            {/* Pay button */}
            <Button
              variant="brand"
              className="mt-7 h-13 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.01] hover:from-indigo-400 hover:to-violet-500"
              disabled={!email || paying}
              onClick={handlePay}
            >
              <CreditCard className="mr-2 size-5" />
              {paying ? "Processing..." : `Pay ${formatAmount(currency)}`}
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-500">
              <Lock className="size-3.5 text-emerald-400" />
              Encrypted and secure checkout
            </div>

            <div className="mt-auto flex items-center justify-center gap-2 pt-10 text-xs text-zinc-600">
              <BadgeCheck className="size-4" />
              Powered by Stripe
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-600">
          <Link href="/terms" className="transition hover:text-zinc-300">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/privacy" className="transition hover:text-zinc-300">
            Privacy Policy
          </Link>
          <span>•</span>
          <span>© 2026 HireLoop</span>
        </footer>

      </div>
    </main>
  );
}
