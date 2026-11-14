"use client"

// "Sort by" dropdown from the Figma results header (top-right of the
// job list). Changing it does not set any URL state — implement the
// real sort navigation in handleChange later.

import type { ChangeEvent } from "react"

import { NativeSelect } from "@/components/ui/native-select"

const SORT_OPTIONS = [
    "Most Recent",
    "Oldest First",
    "Salary: High to Low",
    "Salary: Low to High",
]

export function JobSortSelect() {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // TODO: implement the sort navigation here (e.g. router.push with
        // ?sort= plus the current filter values).
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-[#6E6E78]">Sort by:</span>
            <NativeSelect
                aria-label="Sort jobs"
                name="sort"
                defaultValue={SORT_OPTIONS[0]}
                onChange={handleChange}
                className="surface-field h-9 w-44 border-white/10 text-sm"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-[#1A1A1F]">
                        {option}
                    </option>
                ))}
            </NativeSelect>
        </div>
    )
}
