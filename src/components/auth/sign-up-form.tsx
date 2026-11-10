"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { GitHubLogo } from "@/components/ui/github-logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Collected form shape — reuse this when wiring up Better Auth later.
export type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as SignUpData;

    // TODO: integrate authClient.signUp.email(data) here.
    console.log("Sign up form data:", data);
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
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-10 w-full rounded-lg bg-indigo-500 text-white hover:bg-indigo-400"
        >
          Create Account
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
