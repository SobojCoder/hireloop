// ─── STEP 6: Reusable <PageHeader /> ───
// The dashboard pages repeated the same header block: a breadcrumb line,
// then a title + description with an optional action button on the right.
// This component is that pattern extracted. The max-width container stays in
// the page (pages differ: max-w-3xl vs max-w-5xl).

import type { ReactNode } from "react";
import Link from "next/link";

/** One breadcrumb entry. `href` renders a link; omit it for plain text. */
export type PageCrumb = {
  label: string;
  href?: string;
  /** Optional extra classes for a plain-text crumb, e.g. "text-indigo-400". */
  className?: string;
};

export function PageHeader({
  crumbs,
  title,
  description,
  action,
}: {
  crumbs: PageCrumb[];
  title: string;
  description?: string;
  /** Optional button/CTA rendered on the right side of the header row. */
  action?: ReactNode;
}) {
  return (
    <>
      {/* Breadcrumb — crumbs joined by a "›" separator */}
      <p className="text-xs text-zinc-500">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <span key={crumb.label}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={crumb.className}>{crumb.label}</span>
              )}
              {!isLast && <span aria-hidden="true"> › </span>}
            </span>
          );
        })}
      </p>

      {/* Title + description on the left, optional action on the right */}
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          )}
        </div>
        {action}
      </div>
    </>
  );
}
