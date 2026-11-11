// ─── STEP 3: Reusable <FormSection /> ───
// The numbered, carded sections of the post-job form ("1. Basic Information",
// "2. Location, Compensation & Timeline", "3. Responsibilities & Requirements")
// repeated the same card + dot-heading markup three times. This component is
// that pattern extracted, so the styling lives in exactly one place.

import type { ReactNode } from "react";

import { cn } from "cn";

export function FormSection({
  title,
  className,
  children,
}: {
  /** Section heading, e.g. "1. Basic Information". */
  title: string;
  /** Extra classes for the outer <section> card. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex flex-col gap-5 rounded-xl border border-white/5 bg-[#141417] p-6",
        className
      )}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-indigo-500" />
        {title}
      </h2>
      {children}
    </section>
  );
}
