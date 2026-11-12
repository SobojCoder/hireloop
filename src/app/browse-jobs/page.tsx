import { getJobs } from "@/lib/api/jobs";
import type { JobRow } from "@/types";

import { FiltersPanel } from "./_components/filters-panel";
import { JobCard } from "./_components/job-card";
import { SearchBar } from "./_components/search-bar";
import { SortSelect } from "./_components/sort-select";

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const search = await searchParams;

  // Forward every query param verbatim to the jobs API.
  const query = new URLSearchParams(search as Record<string, string>).toString();
  const jobs: JobRow[] = await getJobs(query);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <SearchBar />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[16rem_1fr]">
        <FiltersPanel jobs={jobs} />

        <section>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-lg font-semibold text-white">
              Found {jobs.length.toLocaleString("en-US")} Professional Jobs
            </h1>
            <SortSelect />
          </div>

          <div className="mt-4 space-y-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}

            {jobs.length === 0 && (
              <p className="rounded-xl border border-white/5 bg-[#141417] p-8 text-center text-sm text-zinc-500">
                No jobs found. Try adjusting your filters.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
