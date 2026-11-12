// ─── Browse-jobs job card ───
// Presentational (server-safe): no state, no client hooks. One card per
// JobRow, styled like the other dark cards in the app. The bookmark button
// intentionally has no handler yet.

import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Banknote, Bookmark, Clock } from "lucide-react";

import { cn } from "cn";
import type { JobRow } from "@/types";

/** Small bordered chip with an optional leading icon. */
function Chip({
  icon: Icon,
  className,
  children,
}: ComponentProps<"span"> & { icon: LucideIcon; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300",
        className
      )}
    >
      <Icon aria-hidden="true" className="size-3.5 shrink-0 text-zinc-500" />
      {children}
    </span>
  );
}

export function JobCard({ job }: { job: JobRow }) {
  return (
    <article className="rounded-xl border border-white/5 bg-[#141417] p-5">
      <div className="flex items-start gap-4">
        {/* Company logo placeholder — first letter of the company name */}
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-lg bg-white/5 text-lg font-semibold text-zinc-400"
        >
          {job.companyName.charAt(0).toUpperCase() || "?"}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-white">{job.title}</h2>
          <p className="mt-1 truncate text-sm text-zinc-500">
            {job.companyName} • {job.location}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Chip icon={Banknote}>
              {job.minSalary} - {job.maxSalary} {job.frequency}
            </Chip>
            <Chip icon={Clock}>{job.type}</Chip>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Save ${job.title}`}
          className="rounded-lg p-1.5 text-zinc-500 transition-colors outline-none hover:bg-white/5 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Bookmark aria-hidden="true" className="size-4" />
        </button>
      </div>
    </article>
  );
}
