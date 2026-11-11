// ─── STEP 2: Shared job form option lists ───
// These lists used to be private constants inside postJobForm.tsx. Moving them
// here means any other form or page (e.g. an edit-job form later) reuses the
// exact same options instead of copy-pasting arrays.

import type { JobType } from "@/types";

/** Options for the job-type picker. Order controls rendering order. */
export const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

/** Options for the job-category select. */
export const jobCategories: string[] = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Data & AI",
  "Marketing & Sales",
  "Other",
];

/** Options for the salary-frequency select. */
export const frequencies: string[] = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
];
