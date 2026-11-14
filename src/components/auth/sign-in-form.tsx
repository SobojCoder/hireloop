"use client";

import type { FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GitHubLogo } from "@/components/ui/github-logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

// Collected form shape — reuse this when wiring up Better Auth later.
export type SignInData = {
  email: string;
  password: string;
};

export function SignInForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

  console.log('redirectTo', redirectTo);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as SignInData;
  
    const { data: signInResponse, error } = await authClient.signIn.email({
    email: data.email, 
    password: data.password, 
    callbackURL: redirectTo, 
});
console.log('sign in response', signInResponse, error);
    // TODO: integrate authClient.signIn.email(data) here.
    console.log("Sign in form data:", data);
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#1a1a1f]/90 p-6 shadow-2xl shadow-black/40 sm:p-8">
      <div className="mb-6 flex flex-col gap-1.5">
        <h1 className="text-xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-zinc-500">
          Sign in to continue your job hunt.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-500 transition-colors outline-none hover:text-indigo-400 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        <Button
          type="submit"
          // Shared indigo styling via the `brand` variant (was a long
          // repeated className string).
          variant="brand"
          className="h-10 w-full"
        >
          Sign In
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
            console.log("GitHub sign in — to be integrated");
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
