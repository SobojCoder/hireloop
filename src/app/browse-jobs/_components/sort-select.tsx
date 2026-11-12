"use client";

// ─── Browse-jobs sort select ───
// The chosen sort lives in local state only — changing it does NOT update the
// URL or refetch yet, per the same convention as the filters.

import { useState, type ChangeEvent } from "react";

import { NativeSelect } from "@/components/ui/native-select";

const sortOptions = [
  "Most Recent",
  "Oldest First",
  "Salary: High to Low",
  "Salary: Low to High",
];

export function SortSelect() {
  const [sort, setSort] = useState(sortOptions[0]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setSort(event.target.value);
    // TODO: apply the sort to the URL search params so the server refetches.
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-500">Sort by:</span>
      <NativeSelect
        aria-label="Sort jobs"
        className="h-8 w-44"
        value={sort}
        onChange={handleChange}
      >
        {sortOptions.map((option) => (
          <option key={option} value={option} className="bg-[#1a1a1f]">
            {option}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
}
