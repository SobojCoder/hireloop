"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Building2, ShieldCheck, User } from "lucide-react";

import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { GitHubLogo } from "@/components/ui/github-logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { FormError } from "@/components/shared/form-error";

// Collected form shape — reuse this when wiring up Better Auth later.
export type SignUpRole = "seeker" | "recruiter" | "admin";

export type SignUpData = {
  name: string;
  email: string;
  role: SignUpRole;
  password: string;
  confirmPassword: string;
};

const roles = [
  {
    value: "seeker",
    label: "Job Seeker",
    description: "Find & apply to jobs",
    icon: User,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Post jobs & hire",
    icon: Building2,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the platform",
    icon: ShieldCheck,
  },
] as const;

export function SignUpForm() {
  const router = useRouter();
  const [role, setRole] = useState<SignUpRole>("seeker");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as SignUpData;

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
    setIsSubmitting(false);

    if (error) {
      setError(error.message || "Something went wrong. Please try again.");
      return;
    }

    // Successfully signed up (Better Auth signs the user in automatically).
    // TODO: redirect based on role (recruiter/admin → dashboard) once those routes exist.
    router.push("/");
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#1a1a1f]/90 p-6 shadow-2xl shadow-black/40 sm:p-8">
      <div className="mb-6 flex flex-col gap-1.5">
        <h1 className="text-xl font-bold text-white">Create your account</h1>
        <p className="text-sm text-zinc-500">
          Join HireLoop and land your next role — faster.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label>Account type</Label>
          <div
            role="radiogroup"
            aria-label="Account type"
            className="grid gap-2 sm:grid-cols-3"
          >
            {roles.map(
              ({ value, label, description, icon: RoleIcon }) =>
                (
                  <label
                    key={value}
                    data-role={value}
                    className={cn(
                      "group/role flex cursor-pointer flex-col items-center gap-1 rounded-lg border px-3 py-2.5 text-center transition-colors outline-none select-none",
                      "has-focus-visible:border-indigo-500/60 has-focus-visible:ring-3 has-focus-visible:ring-indigo-500/25",
                      role === value
                        ? "border-indigo-500/60 bg-indigo-500/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    )}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => setRole(value)}
                      className="sr-only"
                    />
                    <RoleIcon
                      className={
                        role === value ? "size-4 text-indigo-400" : "size-4 text-zinc-500"
                      }
                    />
                    <span className="text-xs font-medium whitespace-nowrap">
                      {label}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {description}
                    </span>
                  </label>
                )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
          />
        </div>

        {error && <FormError>{error}</FormError>}

        <Button
          type="submit"
          disabled={isSubmitting}
          // Shared indigo styling via the `brand` variant.
          variant="brand"
          className="h-10 w-full"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>

        <div className="flex items-center gap-3" role="separator">
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          <span className="text-xs text-zinc-500">or continue with</span>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // TODO: integrate authClient.signIn.social({ provider: "github" }) here.
            console.log("GitHub sign up — to be integrated");
          }}
          className="h-10 w-full rounded-lg border-white/10 bg-transparent text-white hover:bg-white/5"
        >
          <GitHubLogo className="size-4" />
          GitHub
        </Button>
      </form>
    </div>
  );
}
