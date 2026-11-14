// Job details — public single-job view reached from the Browse Jobs cards.
//
// Server component: the job is fetched by id (`getJob`); a missing job
// renders the 404 via `notFound()`. Layout mirrors the Browse Jobs design
// system (#141418 cards, #EDEDEF headings, #5C53FE accents): a header card,
// description/requirement cards, and a "Job Overview" sidebar.

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Banknote, Clock } from "lucide-react"

import {  getJobById } from "@/lib/api/jobs"
import { SiteNavbar } from "@/components/site-navbar"
import type { JobRow } from "@/types/jobs"

import { JobChip } from "../../components/JobCard"
import { JobActions } from "./_components/job-actions"

/** Split a multiline form field (responsibilities/requirements) into items. */
function toLines(text: string): string[] {
    return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
}

/** Small status pill — green when the job is active, muted when expired. */
function StatusPill({ status }: { status: JobRow["status"] }) {
    const active = status === "active"
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs capitalize ${
                active
                    ? "border-green-500/40 bg-green-500/10 text-green-400"
                    : "border-white/10 bg-white/5 text-[#A0A0AB]"
            }`}
        >
            <span
                aria-hidden
                className={`size-1.5 rounded-full ${active ? "bg-green-400" : "bg-zinc-500"}`}
            />
            {status}
        </span>
    )
}

/** One content card with a heading and a bulleted list of lines. */
function DetailSection({ title, items }: { title: string; items: string[] }) {
    if (items.length === 0) return null

    return (
        <section className="surface-card p-8">
            <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] text-[#EDEDEF]">
                {title}
            </h2>
            <ul className="mt-4 flex list-none flex-col gap-3">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[#A0A0AB]"
                    >
                        <span
                            aria-hidden
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#5C53FE]"
                        />
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    )
}

/** One label/value row in the Job Overview sidebar. */
function OverviewRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-white/5 py-3 last:border-b-0">
            <span className="shrink-0 text-sm text-[#6E6E78]">{label}</span>
            <span className="truncate text-right text-sm font-medium text-[#EDEDEF]">
                {children}
            </span>
        </div>
    )
}

export default async function JobDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const job: JobRow = await getJobById(id)

    if (!job) notFound()


    return (
        <>
            <SiteNavbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
                <Link
                    href="/browse-jobs"
                    className="inline-flex items-center gap-1.5 text-sm text-[#A0A0AB] transition-colors outline-none hover:text-[#EDEDEF] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60"
                >
                    <ArrowLeft aria-hidden className="size-4" />
                    Back to all jobs
                </Link>

                <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
                    {/* Main column: header, responsibilities, requirements */}
                    <div className="flex flex-col gap-6">
                        <section className="surface-card p-8">
                            <div className="flex items-start gap-5">
                                {/* Company logo placeholder — first letter */}
                                <span
                                    aria-hidden
                                    className="grid size-16 shrink-0 place-items-center rounded-xl border border-white/5 bg-[#1A1A1F] text-2xl font-semibold text-[#A0A0AB]"
                                >
                                    {job.companyName.charAt(0).toUpperCase() || "?"}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-[#EDEDEF] sm:text-3xl">
                                        {job.title}
                                    </h1>
                                    <p className="mt-2 text-sm text-[#6E6E78]">
                                        {job.companyName} • {job.location}
                                        {job.isRemote ? " (Remote)" : ""} • {job.posted}
                                    </p>

                                    {/* <div className="mt-5 flex flex-wrap items-center gap-2">
                                        <JobChip icon={Banknote}>
                                            {job.minSalary} - {job.maxSalary} {job.salaryFrequency}
                                        </JobChip>
                                        <JobChip icon={Clock}>
                                            <span className="capitalize">{job.jobType}</span>
                                        </JobChip>
                                        <StatusPill status={job.status} />
                                    </div> */}
                                </div>
                            </div>
                        </section>
{/* 
                        <DetailSection title="Responsibilities" items={responsibilities} />
                        <DetailSection title="Requirements" items={requirements} /> */}
                    </div>

                    {/* Sidebar: key facts + apply/save actions */}
                    <aside className="surface-card p-6">
                        <h2 className="font-heading text-lg font-semibold text-[#EDEDEF]">
                            Job Overview
                        </h2>

                        <div className="mt-4">
                            <OverviewRow label="Salary">
                                {job.minSalary} - {job.maxSalary} {job.salaryFrequency}
                            </OverviewRow>
                            <OverviewRow label="Job Type">
                                <span className="capitalize">{job.jobType}</span>
                            </OverviewRow>
                            <OverviewRow label="Category">{job.category}</OverviewRow>
                            <OverviewRow label="Work Arrangement">
                                {job.isRemote ? "Remote" : "On-site"}
                            </OverviewRow>
                            <OverviewRow label="Applicants">{job.applicants}</OverviewRow>
                            <OverviewRow label="Deadline">{job.deadline}</OverviewRow>
                        </div>

                        <div className="mt-6">
                            <JobActions job={job} />
                        </div>
                    </aside>
                </div>
            </main>
        </>
    )
}
