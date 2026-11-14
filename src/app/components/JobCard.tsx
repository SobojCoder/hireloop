'use client';
// Job card for the Browse Jobs list — from the Figma job card: logo
// placeholder, title, company • location, salary + job-type chips, and a
// bookmark action on the right. Clicking the card opens the job detail;
// the bookmark click is intentionally a no-op (stopPropagation only).

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Banknote, Bookmark, Clock } from 'lucide-react';
import type { JobRow } from '@/types/jobs';

/** Small bordered chip with a leading icon, as in the Figma card row. */
export function JobChip({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#A0A0AB]">
            <Icon aria-hidden className="size-3.5 shrink-0 text-[#6E6E78]" />
            {children}
        </span>
    );
}

const JobCard = ({ job }: { job: JobRow }) => {
    const router = useRouter();
    const handleViewJobDetail = (jobId: string) => {
        router.push(`/browse-jobs/${jobId}`)
    }

    return (
        <li onClick={() => handleViewJobDetail(job._id)} className="surface-card rounded-2xl border cursor-pointer p-6">
            <div className="flex items-start gap-4">
                {/* Company logo placeholder — first letter of the company name */}
                <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-lg border border-white/5 bg-[#1A1A1F] text-lg font-semibold text-[#A0A0AB]"
                >
                    {job.companyName.charAt(0).toUpperCase() || "?"}
                </span>

                <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg font-semibold text-[#EDEDEF]">
                        {job.title}
                    </h3>
                    <p className="mt-1 truncate text-sm text-[#6E6E78]">
                        {job.companyName} • {job.location}
                        {job.isRemote ? " (Remote)" : ""}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <JobChip icon={Banknote}>
                            {job.minSalary} - {job.maxSalary}
                        </JobChip>
                        <JobChip icon={Clock}>{job.jobType}</JobChip>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label={`Save ${job.title}`}
                    onClick={(event) => {
                        event.stopPropagation();
                        // TODO: implement save/bookmark here.
                    }}
                    className="rounded-lg p-1.5 text-[#6E6E78] transition-colors outline-none hover:bg-white/5 hover:text-[#EDEDEF] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60"
                >
                    <Bookmark aria-hidden className="size-4" />
                </button>
            </div>
        </li>
    );
};

export default JobCard;
