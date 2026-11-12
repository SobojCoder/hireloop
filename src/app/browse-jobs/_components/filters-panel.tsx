"use client";

// ─── Browse-jobs filter sidebar ───
// Everything here is UI-only local state on purpose: the select handlers do
// NOT touch the URL or the search query yet — wire that up inside them when
// ready. Counts are tallied from the jobs the page already fetched.
// Job Type and Category are single-select: choosing an option clears the
// previous one, and clicking it again clears the selection entirely.

import { useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { jobCategories, jobTypes } from "@/lib/constants/jobs";
import type { JobRow } from "@/types";

/** Tally jobs by one of their fields, e.g. { "Full-time": 3, ... }. */
function countByField(jobs: JobRow[], field: "type" | "category") {
  return jobs.reduce<Record<string, number>>((acc, job) => {
    const value = job[field];
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

/** "1248" -> "1.2k" style label shown next to each filter option. */
function formatCount(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}

type FilterGroupProps = {
  title: string;
  options: readonly string[];
  /** The one selected option, or null when nothing is selected. */
  selected: string | null;
  counts: Record<string, number>;
  onSelect: (option: string) => void;
};

function FilterGroup({ title, options, selected, counts, onSelect }: FilterGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">
        {title}
        <span className="ml-2 text-xs font-normal text-zinc-500">
          {options.length} available
        </span>
      </h3>
      <ul className="mt-3 space-y-2.5">
        {options.map((option) => (
          <li key={option}>
            <label className="flex cursor-pointer items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Checkbox
                  checked={selected === option}
                  onCheckedChange={() => onSelect(option)}
                />
                <span className="text-sm text-zinc-400">{option}</span>
              </span>
              <span className="text-xs text-zinc-500">
                {formatCount(counts[option] ?? 0)}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FiltersPanel({ jobs }: { jobs: JobRow[] }) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);

  const typeCounts = useMemo(() => countByField(jobs, "type"), [jobs]);
  const categoryCounts = useMemo(() => countByField(jobs, "category"), [jobs]);

  // Single-select: picking an option replaces the previous one; picking it
  // again clears it. TODO: sync the selection to the URL search params
  // (type, category and `remote`) so the server refetches.
  function handleSelectType(option: string) {
    setSelectedType((prev) => (prev === option ? null : option));
  }

  function handleSelectCategory(option: string) {
    setSelectedCategory((prev) => (prev === option ? null : option));
  }

  function handleRemoteChange(checked: boolean) {
    setRemoteOnly(checked);
  }

  return (
    <aside className="rounded-xl border border-white/5 bg-[#141417] p-5">
      <h2 className="font-semibold text-white">Filters</h2>

      <div className="mt-5 space-y-6">
        <FilterGroup
          title="Job Type"
          options={jobTypes}
          selected={selectedType}
          counts={typeCounts}
          onSelect={handleSelectType}
        />

        <FilterGroup
          title="Category"
          options={jobCategories}
          selected={selectedCategory}
          counts={categoryCounts}
          onSelect={handleSelectCategory}
        />

        <div>
          <h3 className="text-sm font-semibold text-white">Work Mode</h3>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-sm text-zinc-400">Remote only</span>
            <Switch checked={remoteOnly} onCheckedChange={handleRemoteChange} />
          </div>
        </div>
      </div>
    </aside>
  );
}
