import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Copy,
  EllipsisVertical,
  Eye,
  MapPin,
  Megaphone,
  PenTool,
  Pencil,
  Plus,
  PlusCircle,
  Server,
  ShieldCheck,
  User2,
  Users,
  View,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getJobs } from "@/lib/api/jobs";
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";

// Reuses the same shape the "Post a New Job" page collects, plus the
// viewing-only fields a list needs (status, applicants, timestamps).
export type JobRow = {
  _id: string;
  title: string;
  category: string;
  companyName: string;
  location: string; // display string, e.g. "Remote (New York, USA)"
  type: import("@/app/components/postJobForm").JobFormData["jobType"];
  minSalary: string;
  maxSalary: string;
  frequency: string;
  applicants: number;
  status: "Active" | "Expired";
  deadline: string;
  postedAgo: string;
  
  icon: LucideIcon;
  // Tailwind classes for the colored category icon tile + category label.
  accent: { iconBg: string; iconText: string; categoryText: string };
};

// Dummy data matching the fields collected the new jobs page.


const tableHeaders = [
  "Job Title & Dept",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
];

function TypeChip({ type }: { type: JobRow["type"] }) {
  return (
    <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400">
      {type}
    </span>
  );
}

function StatusPill({ status }: { status: JobRow["status"] }) {
  const active = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        active
          ? "border-green-500/40 bg-green-500/10 text-green-400"
          : "border-white/10 bg-white/5 text-zinc-400"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${active ? "bg-green-400" : "bg-zinc-500"}`}
      />
      {status}
    </span>
  );
}

export default async function ManageJobsPage() {
  const jobs: JobRow[] = await getJobs();
  console.log('jobs data', jobs);
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* Breadcrumb */}
      <p className="text-xs text-zinc-500">
        Manage Jobs
        <span aria-hidden="true"> › </span>
        <span className="text-zinc-300">Job Listings &amp; Postings</span>
      </p>

      {/* Header */}
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Link href="/dashboard/recruiter/jobs/new">
        <Button
          className="h-10 rounded-lg bg-indigo-500 px-5 text-white hover:bg-indigo-400"
        >
          <Plus />
          New Job Post
        </Button>
        </Link>
      </div>

      {/* Table card — scrolls horizontally on small screens */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-white/5 bg-[#141417]">
        <table className="w-full min-w-[1024px] text-left text-sm">
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
            {jobs.map((job) => {
              const JobIcon = job.icon;
              return (
                <tr
                  key={job._id}
                  className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.02]"
                >
                  {/* Job title & dept */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-200 rounded-2xl">{job.title[0]}</span>
                      {/* <span
                        aria-hidden="true"
                        className={`grid size-8 shrink-0 place-items-center rounded-lg ${job.accent.iconBg} ${job.accent.iconText}`}
                      >
                        <JobIcon className="size-4" />
                      </span> */}
                      <User2 />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-white">
                          {job.title}
                        </span>
                        <span className={`text-xs `}>
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Company & location */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">
                        {job.companyName}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                        {job.location}
                      </span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4">
                    <TypeChip type={job.type} />
                  </td>

                  {/* Compensation */}
                  <td className="whitespace-nowrap px-4 py-4 text-zinc-200">
                    {job.minSalary} – {job.maxSalary} {job.frequency}
                  </td>

                  {/* Applicants */}
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-indigo-400">
                      <Users className="size-4 shrink-0" aria-hidden="true" />
                      <span>
                        <span className="font-semibold text-white">
                          {job.applicants}
                        </span>{" "}
                        Candidates
                      </span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-4 py-4">
                    <StatusPill status={job.status} />
                  </td>

                  {/* Deadline */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="whitespace-nowrap text-white">
                        {job.deadline}
                      </span>
                      <span className="whitespace-nowrap text-xs text-zinc-500">
                        {job.postedAgo}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button className="h-8 rounded-lg bg-indigo-500 px-3 text-xs text-white hover:bg-indigo-400">
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        aria-label={`Duplicate ${job.title}`}
                        className="h-8 rounded-lg border-white/10 bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                      >
                        <Eye className="size-3.5" />
                      </Button>
                      <DeleteJobDialog job={job}/>
                     
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
