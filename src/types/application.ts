// ─── Application domain types ───
// A job seeker's application to a job: what gets sent to the database when
// they hit "Apply Now" on the job details page, and what comes back to fill
// the "My Applications" page of the seeker dashboard.

/** Lifecycle of an application after it is submitted. */
export type ApplicationStatus =
  | "Pending"
  | "Reviewed"
  | "Shortlisted"
  | "Rejected"
  | "Accepted";

/** A saved application, as stored in / returned from the database. */
export type ApplicationRow = {
  _id: string;

  // Who applied (from the auth session at apply time).
  userId: string;
  applicantName: string;
  email: string;

  // Which job — plus a snapshot of the job's display fields so the
  // applications page can render rows without re-fetching the job.
  jobId: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;

  // What the seeker submitted.
  resumeUrl: string;
  coverLetter: string;

  // Set when the application is created and updated by the recruiter.
  status: ApplicationStatus;
  appliedAt: string;
};

/** Payload sent to POST /applications — everything except the generated _id. */
export type ApplicationPayload = Omit<ApplicationRow, "_id">;
