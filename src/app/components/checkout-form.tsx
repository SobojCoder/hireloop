import {
  BadgeCheck,
  Check,
  CreditCard,
  Lock,
} from "lucide-react";
import { headers } from "next/headers";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

const PLAN = {
  name: "Hireloop Pro",
  usdPrice: 20,
  exchangeRate: 127.5665,
};

function formatAmount() {
  return `৳${Math.round(
    PLAN.usdPrice * PLAN.exchangeRate
  ).toLocaleString("en-US")}`;
}

export default async function CheckoutForm() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email ?? "";

  const amount = formatAmount();

  return (
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
              <span className="text-xl">🇧🇩</span>

              <p className="mt-3 text-sm font-semibold text-white">
                BDT
              </p>

              <p className="mt-1 text-[11px] text-zinc-500">
                Bangladeshi Taka
              </p>
            </div>

            <Check className="size-5 text-indigo-400" />
          </div>

          <p className="mt-3 text-sm font-bold text-indigo-300">
            {amount}
          </p>
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
            {PLAN.name}
          </span>

          <span className="font-medium text-zinc-300">
            {amount}
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
            {amount}
          </span>
        </div>
      </div>

      {/* Payment information */}
      <div className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-400">
        <CreditCard className="size-5 text-indigo-400" />
        Payment processing will be handled securely.
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-500">
        <Lock className="size-3.5 text-emerald-400" />
        Encrypted and secure checkout
      </div>

      <div className="mt-auto flex items-center justify-center gap-2 pt-10 text-xs text-zinc-600">
        <BadgeCheck className="size-4" />
        Powered by Stripe
      </div>
    </section>
  );
}