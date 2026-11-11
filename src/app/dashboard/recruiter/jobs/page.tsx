import Link from "next/link";
import { Eye, MapPin, Pencil, Plus, User2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getJobs } from "@/lib/api/jobs";
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";
import { PageHeader } from "@/components/shared/page-header";
import type { JobRow } from "@/types";

// STEP 11: the JobRow type (and the UI-only icon/accent fields that leaked
// into it) now live in "@/types". The page only consumes data here.

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
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* Breadcrumb + header — now the shared <PageHeader /> (same markup) */}
      <PageHeader
        crumbs={[
          { label: "Manage Jobs" },
          { label: "Job Listings & Postings", className: "text-zinc-300" },
        ]}
        title="Manage Job Posts"
        description="Review live listings, monitor applicants, and update job details across your organization."
        action={
          <Link href="/dashboard/recruiter/jobs/new">
            <Button variant="brand" className="h-10 px-5">
              <Plus />
              New Job Post
            </Button>
          </Link>
        }
      />

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
                      {/* Same indigo styling via the shared `brand` variant */}
                      <Button variant="brand" className="h-8 px-3 text-xs">
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
