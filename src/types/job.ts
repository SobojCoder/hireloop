// ─── STEP 1: Shared job domain types ───
// These types used to live inside UI files (`JobFormData` in postJobForm.tsx,
// `JobRow` in dashboard/recruiter/jobs/page.tsx). Importing types from pages
// and client components from server code creates fragile coupling, so they
// now live here — one shared, UI-independent place for job types.

/** Employment type as shown in the job-type picker on the post-job form. */
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

/** Lifecycle status of a job listing. */
export type JobStatus = "Active" | "Expired";

/** Shape collected by the "Post a New Job" form — easy to map when saving to
 * MongoDB later. (Previously exported from postJobForm.tsx.) */
export type JobFormData = {
  title: string;
  companyName: string;
  category: string;
  jobType: JobType;
  remote: boolean;
  status: JobStatus;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
  applicants: number;
};

/** A job as rendered in the Manage Jobs table — the same shape the form
 * collects plus the read-only fields a list needs (applicants, timestamps).
 *
 * Data-only on purpose: the old version also carried UI concerns
 * (`icon: LucideIcon`, `accent: { iconBg, iconText, categoryText }`) that the
 * API never returns. Those belong to the component that renders the row. */
export type JobRow = {
  _id: string;
  title: string;
  category: string;
  companyName: string;
  /** Display string, e.g. "Remote (New York, USA)". */
  location: string;
  type: JobType;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  applicants: number;
  status: JobStatus;
  deadline: string;
  postedAgo: string;
};
