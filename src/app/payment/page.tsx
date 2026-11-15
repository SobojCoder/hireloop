
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Check,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import CheckoutForm from "../components/checkout-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSession } from "@/lib/core/server";


const FEATURES = [
  "Unlimited job applications",
  "Advanced job search filters",
  "Priority application visibility",
  "Application tracking dashboard",
  "Premium career insights",
];

const PLAN = {
  name: "Hireloop Pro",
  usdPrice: 20.00,
  tagline: "Everything you need to get hired faster.",
};




export default async function PaymentPage({searchParams}: {searchParams: {canceled?: string}}) {
     const { canceled } = await searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and check out when you\'re ready.'
    )
  }
  const session = await getSession();
  
    const email = session?.user?.email ?? "";
  
    
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

          {/* Plan details - Server Component */}
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
                    $20.00
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
                  What&apos;s included
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

          {/* Payment form - Client Component */}
          <section className="flex flex-col p-7 sm:p-10">
      {/* Header */}
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
          Selected currency
        </Label>

        <div className="mt-3 rounded-xl border border-indigo-500/70 bg-indigo-500/10 p-4 ring-1 ring-indigo-500/30">
          <div className="flex items-center justify-between">
            <div>
             

              <p className="mt-3 text-sm font-semibold text-white">
                USD
              </p>

              <p className="mt-1 text-[11px] text-zinc-500">
                US Dollar (USD)
              </p>
            </div>

            <Check className="size-5 text-indigo-400" />
          </div>

          <p className="mt-3 text-sm font-bold text-indigo-300">
            ${PLAN.usdPrice}
          </p>
        </div>

        
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
          value={email}
          readOnly
          placeholder="No email found"
          className="mt-2"
        />

        <p className="mt-2 text-xs text-zinc-600">
          Your payment confirmation will be sent to this address.
        </p>
      </div>

      {/* Order total */}
      <div className="mt-9 space-y-3 border-t border-white/10 pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">
            ${PLAN.name}
          </span>

          <span className="font-medium text-zinc-300">
            ${PLAN.usdPrice}
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
            ${PLAN.usdPrice}
          </span>
        </div>
      </div>

      {/* Payment information */}
      <form action="/api/checkout_sessions" method="POST">
      <section>
        <button
  type="submit"
  role="link"
  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-400 hover:via-violet-500 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D10]"
>
  Checkout ${PLAN.usdPrice}
  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
</button>
      </section>
    </form>

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
