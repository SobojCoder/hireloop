"use client";

// ─── Browse-jobs search bar ───
// The typed value lives in local state only. Submitting does NOT update the
// URL or search query yet — `handleSubmit` is intentionally empty so the
// results only change once that wiring is added.

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

import { InputWithIcon } from "@/components/shared/input-with-icon";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [search, setSearch] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: update the URL search params (e.g. router.push) with `search`.
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-white/5 bg-[#141417] p-3 sm:flex-row"
    >
      <InputWithIcon
        icon={Search}
        type="search"
        placeholder="Search by job title, keywords..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="flex-1"
      />
      <Button
        type="submit"
        className="h-10 bg-white px-5 text-zinc-900 hover:bg-zinc-200"
      >
        Search Jobs
      </Button>
    </form>
  );
}
