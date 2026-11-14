// ─── STEP 1c: Barrel file — the single import point for shared types ───
// Import from "@/types" everywhere instead of reaching into individual
// components or pages.
//
//   import type { JobFormData, JobRow } from "@/types";

export type * from "./job";
export type * from "./application";
export type * from "./dashboard";
