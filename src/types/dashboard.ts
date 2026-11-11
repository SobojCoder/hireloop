// ─── STEP 1b: Shared dashboard navigation types ───
// Previously exported from dashboardSidebar.tsx; moved here so other pages
// (layout guards, admin tools, etc.) can use them without importing from a
// client component.

import type { LucideIcon } from "lucide-react";

/** Matches the `role` additional field defined in src/lib/auth.ts. */
export type DashboardRole = "seeker" | "recruiter" | "admin";

/** One entry in the dashboard sidebar menu. */
export type MenuItem = {
  /** Display name of the menu entry. */
  name: string;
  /** Destination path of the menu entry. */
  url: string;
  /** Lucide icon shown before the name. */
  icon: LucideIcon;
};
