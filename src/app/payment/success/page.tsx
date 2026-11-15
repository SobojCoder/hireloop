import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CircleCheck,
  Lock,
  Mail,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

import { paymentVerify } from "@/lib/api/payments";
import { stripe } from "@/lib/stripe";

import CopyButton from "./copy-button";

function formatDate(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatAmount(amount: number | null, currency: string | null) {
  if (amount === null) return "—";
  return `${(amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  })}`;
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_email,
    metadata,
    payment_intent,
    payment_status,
    amount_total,
    currency,
    created,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && payment_status === "paid") {
    console.log({ customer_email, metadata, payment_intent, payment_status });

    const result = await paymentVerify(session_id);
    console.log({ result });

    // `payment_intent` is expanded, so it is the full PaymentIntent object.
    const transactionId =
      typeof payment_intent === "object" && payment_intent !== null
        ? payment_intent.id
        : null;

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090f] px-4 py-16 text-white">
        {/* Background effects */}
        <div className="pointer-events-none absolute -left-40 -top-40 size-[450px] rounded-full bg-emerald-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 size-[450px] rounded-full bg-indigo-600/15 blur-[130px]" />

        <div className="relative w-full max-w-lg">
          {/* Success header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
              <CircleCheck className="size-9 text-emerald-400" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              Payment successful
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Thank you for your purchase! Your{" "}
              <span className="font-semibold text-white">Hireloop Pro</span>{" "}
              plan is now active. A confirmation email will be sent to{" "}
              <span className="font-medium text-zinc-200">
                {customer_email ?? "your email address"}
              </span>
              .
            </p>
          </div>

          {/* Receipt card */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl shadow-black/40 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Receipt
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                <BadgeCheck className="size-3.5" />
                Paid
              </span>
            </div>

            {/* Transaction ID */}
            <div className="mt-6 rounded-xl border border-indigo-500/40 bg-indigo-500/[0.07] p-4">
              <div className="flex items-center gap-2">
                <ReceiptText className="size-4 text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Transaction ID
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <code className="truncate font-mono text-sm font-semibold text-indigo-300">
                  {transactionId ?? "Not available"}
                </code>

                {transactionId && (
                  <CopyButton value={transactionId} />
                )}
              </div>

              <p className="mt-2 text-[11px] text-zinc-500">
                Keep this ID for any billing support requests.
              </p>
            </div>

            {/* Details */}
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-sm text-zinc-500">
                  <Mail className="size-4 shrink-0" />
                  Billing email
                </dt>
                <dd className="truncate text-sm font-medium text-zinc-200">
                  {customer_email ?? "—"}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                <dt className="flex items-center gap-2 text-sm text-zinc-500">
                  <ReceiptText className="size-4 shrink-0" />
                  Amount paid
                </dt>
                <dd className="text-sm font-semibold text-white">
                  {formatAmount(amount_total, currency)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                <dt className="flex items-center gap-2 text-sm text-zinc-500">
                  <CalendarDays className="size-4 shrink-0" />
                  Date
                </dt>
                <dd className="text-sm font-medium text-zinc-200">
                  {typeof created === "number" ? formatDate(created) : "—"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/seeker"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Go to dashboard
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/browse-jobs"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Browse jobs
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-600">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            Secured by Stripe
            <span className="text-zinc-700">•</span>
            <Lock className="size-3 text-zinc-500" />
            Questions? Email{" "}
            <a
              href="mailto:support@hireloop.com"
              className="text-zinc-400 underline-offset-2 hover:underline"
            >
              support@hireloop.com
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Session exists but payment is not confirmed as paid yet.
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090f] px-4 py-16 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 size-[450px] rounded-full bg-indigo-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[450px] rounded-full bg-violet-600/15 blur-[130px]" />

      <div className="relative flex max-w-md flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/30">
          <ReceiptText className="size-8 text-amber-400" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          Payment is still processing
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          We couldn&apos;t confirm your payment yet. If you were charged, this
          usually resolves within a few minutes — check your email for a
          confirmation.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
