import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarClock,
  ExternalLink,
  FileText,
  Hourglass,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import type { ApplicationRow, ApplicationStatus } from "@/types";
import { getApplications } from "@/lib/api/applications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// ─── Dummy data ───
// TEMP: swap for `await getApplications(`userId=${session.user.id}`)` from
// "@/lib/api/applications" once the data is loaded. The fields mirror the
// ApplicationRow type ("@/types") — exactly what applyToJob saves to the DB.
const DUMMY_APPLICATIONS: ApplicationRow[] = [
  {
    _id: "app_001",
    userId: "user_seeker_1",
    applicantName: "Amina Yusuf",
    email: "amina@example.com",
    jobId: "job_101",
    jobTitle: "Senior Frontend Engineer",
    companyName: "TechNova",
    location: "Remote",
    jobType: "Full-time",
    resumeUrl: "/resumes/amina-yusuf.pdf",
    coverLetter: "",
    status: "Pending",
    appliedAt: "2026-11-12T09:30:00.000Z",
  },
  {
    _id: "app_002",
    userId: "user_seeker_1",
    applicantName: "Amina Yusuf",
    email: "amina@example.com",
    jobId: "job_102",
    jobTitle: "Product Designer",
    companyName: "PixelWorks",
    location: "Lagos, Nigeria",
    jobType: "Contract",
    resumeUrl: "/resumes/amina-yusuf.pdf",
    coverLetter: "I have shipped design systems for three fintechs…",
    status: "Shortlisted",
    appliedAt: "2026-11-09T14:05:00.000Z",
  },
  {
    _id: "app_003",
    userId: "user_seeker_1",
    applicantName: "Amina Yusuf",
    email: "amina@example.com",
    jobId: "job_103",
    jobTitle: "Backend Developer (Node.js)",
    companyName: "CloudHarbor",
    location: "Berlin, Germany",
    jobType: "Full-time",
    resumeUrl: "",
    coverLetter: "",
    status: "Reviewed",
    appliedAt: "2026-11-05T08:12:00.000Z",
  },
  {
    _id: "app_004",
    userId: "user_seeker_1",
    applicantName: "Amina Yusuf",
    email: "amina@example.com",
    jobId: "job_104",
    jobTitle: "Marketing Intern",
    companyName: "BrightPath Media",
    location: "Remote",
    jobType: "Internship",
    resumeUrl: "/resumes/amina-yusuf.pdf",
    coverLetter: "",
    status: "Accepted",
    appliedAt: "2026-10-28T16:45:00.000Z",
  },
  {
    _id: "app_005",
    userId: "user_seeker_1",
    applicantName: "Amina Yusuf",
    email: "amina@example.com",
    jobId: "job_105",
    jobTitle: "Data Analyst",
    companyName: "InsightGrid",
    location: "London, UK",
    jobType: "Part-time",
    resumeUrl: "/resumes/amina-yusuf.pdf",
    coverLetter: "",
    status: "Rejected",
    appliedAt: "2026-10-20T11:20:00.000Z",
  },
  {
    _id: "app_006",
    userId: "user_seeker_1",
    applicantName: "Amina Yusuf",
    email: "amina@example.com",
    jobId: "job_106",
    jobTitle: "QA Engineer",
    companyName: "TechNova",
    location: "Remote",
    jobType: "Full-time",
    resumeUrl: "/resumes/amina-yusuf.pdf",
    coverLetter: "",
    status: "Pending",
    appliedAt: "2026-11-13T10:00:00.000Z",
  },
];

// Status → pill styling (border / background / text + dot color), matching
// the StatusPill pattern on the recruiter jobs page.
const statusStyles: Record<ApplicationStatus, { pill: string; dot: string }> = {
  Pending: {
    pill: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
  },
  Reviewed: {
    pill: "border-sky-500/40 bg-sky-500/10 text-sky-400",
    dot: "bg-sky-400",
  },
  Shortlisted: {
    pill: "border-indigo-500/40 bg-indigo-500/10 text-indigo-400",
    dot: "bg-indigo-400",
  },
  Accepted: {
    pill: "border-green-500/40 bg-green-500/10 text-green-400",
    dot: "bg-green-400",
  },
  Rejected: {
    pill: "border-red-500/40 bg-red-500/10 text-red-400",
    dot: "bg-red-400",
  },
};

function StatusPill({ status }: { status: string }) {
  const styles = statusStyles[status as keyof typeof statusStyles] ?? {
    pill: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    dot: "bg-gray-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles.pill}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${styles.dot}`}
      />
      {status}
    </span>
  );
}

function TypeChip({ type }: { type: string }) {
  return (
    <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400">
      {type}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="surface-card flex items-center gap-4 px-5 py-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-indigo-500/10 text-indigo-400">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-xs text-zinc-500">{label}</span>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const tableHeaders = [
  "Job",
  "Company & Location",
  "Type",
  "Applied On",
  "Resume",
  "Status",
  "Actions",
];

export default async function ApplicationsPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

  const applications = await getApplications(`userId=${session?.user?.id}`);



  const pending = applications.filter(
    (a) => a.status === "Pending" || a.status === "Reviewed",
  ).length;
  const shortlisted = applications.filter(
    (a) => a.status === "Shortlisted" || a.status === "Accepted",
  ).length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <PageHeader
        crumbs={[
          { label: "Applications" },
          { label: "My Applications", className: "text-zinc-300" },
        ]}
        title="My Applications"
        description="Track every job you've applied to and where each application stands."
      />

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Applications"
          value={applications.length}
          icon={BriefcaseBusiness}
        />
        <StatCard label="In Review" value={pending} icon={Hourglass} />
        <StatCard label="Shortlisted" value={shortlisted} icon={ThumbsUp} />
        <StatCard label="Rejected" value={rejected} icon={ThumbsDown} />
      </div>

      {/* Applications table card — scrolls horizontally on small screens */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-white/5 bg-[#141417]">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-4 text-[11px] font-medium uppercase tracking-wider text-zinc-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.02]"
              >
                {/* Job */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-500/10 text-indigo-400"
                    >
                      <FileText className="size-4" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-white">
                        {application.jobTitle}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {application.companyName}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Company & location */}
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-white">
                      {application.companyName}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                      <CalendarClock
                        className="size-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {application.location}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-4">
                  <TypeChip type={application.jobType} />
                </td>

                {/* Applied on */}
                <td className="whitespace-nowrap px-4 py-4 text-zinc-200">
                  {formatDate(application.appliedAt)}
                </td>

                {/* Resume */}
                <td className="px-4 py-4">
                  {application.resumeUrl ? (
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-400 transition-colors hover:text-indigo-300"
                    >
                      <FileText className="size-3.5 shrink-0" aria-hidden="true" />
                      View
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-500">—</span>
                  )}
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-4 py-4">
                  <StatusPill status={application.status} />
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <Link
                    href={`/browse-jobs/${application.jobId}`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    View Job
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
