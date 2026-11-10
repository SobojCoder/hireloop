import Link from "next/link";
import { MapPin, Search } from "lucide-react";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

// Deterministic pseudo-random star positions (same on server & client).
//buji nai
const STARS = Array.from({ length: 70 }, (_, i) => {
  const hash = (i * 2654435761) % 4294967296;
  return {
    left: ((hash >> 3) % 10000) / 100,
    top: ((hash >> 11) % 10000) / 100,
    size: (i % 3) + 1,
    opacity: 0.2 + (((hash >> 19) % 70) / 100),
  };
});

function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

function NewJobsBadge() {
  return (
    <div className="flex items-center gap-4">
      <span
        className="h-px w-12 bg-gradient-to-r from-transparent to-white/15 sm:w-24"
        aria-hidden="true"
      />
      <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/30">
        <span className="grid size-6 place-items-center rounded-md bg-black/40 text-sm">
          💼
        </span>
        <span className="text-sm font-bold text-white">50,000+</span>
        <span className="font-mono text-xs font-medium tracking-widest text-zinc-500 uppercase">
          New jobs this month
        </span>
      </div>
      <span
        className="h-px w-12 bg-gradient-to-l from-transparent to-white/15 sm:w-24"
        aria-hidden="true"
      />
    </div>
  );
}

function SearchBar() {
  return (
    <form
      action="/jobs"
      method="get"
      className="flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#1a1a1f]/90 p-2 shadow-2xl shadow-black/50 backdrop-blur sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-2.5 px-3 py-2.5 sm:py-2">
        <Search className="size-4 shrink-0 text-zinc-500" />
        <input
          type="text"
          name="query"
          placeholder="Job title, skill or company"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
        />
      </div>
      <span
        className="hidden h-6 w-px bg-white/10 sm:block"
        aria-hidden="true"
      />
      <div className="flex flex-1 items-center gap-2.5 border-t border-white/10 px-3 py-2.5 sm:border-t-0 sm:py-2">
        <MapPin className="size-4 shrink-0 text-zinc-500" />
        <input
          type="text"
          name="location"
          placeholder="Location or Remote"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
        />
      </div>
      <button
        type="submit"
        aria-label="Search jobs"
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500 text-white transition-colors outline-none hover:bg-indigo-400 focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Search className="size-4" />
      </button>
    </form>
  );
}

function TrendingPositions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <span className="text-sm text-zinc-500">Trending Position</span>
      {trendingPositions.map((position) => (
        <Link
          key={position}
          href={`/jobs?q=${encodeURIComponent(position)}`}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {position}
        </Link>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pt-10 pb-40 sm:pt-16">
      {/* Backdrop: stars + purple bottom glow */}
      <Starfield />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-[100%] bg-indigo-600/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,#131316_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <NewJobsBadge />

        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Dream Job Today
          </h1>
          <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        <SearchBar />

        <TrendingPositions />
      </div>
    </section>
  );
}
