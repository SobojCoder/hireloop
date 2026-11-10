import { AuthToggle } from "@/components/auth/auth-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* Decorative purple glow behind the card, matching the homepage */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-[100%] bg-indigo-600/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-md flex-col gap-5">
        <AuthToggle />
        {children}
      </div>
    </main>
  );
}
