"use client";

// ─── STEP 9: PostJobForm refactored onto the shared building blocks ───
// What changed (visuals and behavior are identical):
//   • Types now come from "@/types" instead of being defined here, so server
//     code (lib/actions) no longer imports from a client component.
//   • Option lists (jobTypes, jobCategories, frequencies) come from
//     "@/lib/constants/jobs".
//   • The three repeated section cards, eight field wrappers, five
//     icon-inputs, the page header, and the error line now use
//     <FormSection />, <FormField />, <InputWithIcon />, <PageHeader /> and
//     <FormError /> from "@/components/shared".
//   • The indigo submit button uses Button's new `brand` variant.

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CircleDollarSign,
  Globe,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/lib/actions/jobs";
import { jobCategories, frequencies, jobTypes } from "@/lib/constants/jobs";
import type { JobFormData } from "@/types";
import { FormSection } from "@/components/shared/form-section";
import { FormField } from "@/components/shared/form-field";
import { InputWithIcon } from "@/components/shared/input-with-icon";
import { PageHeader } from "@/components/shared/page-header";
import { FormError } from "@/components/shared/form-error";
import { toast } from "@/components/ui/toast";

const initialJobForm: JobFormData = {
  title: "",
  companyName: "",
  category: "",
  jobType: "Full-time",
  remote: true,
  location: "",
  status: "Active",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
  applicants: 0,
};

export function PostJobForm() {
  const router = useRouter();
  const [form, setForm] = useState<JobFormData>(initialJobForm);
  const [error, setError] = useState<string | null>(null);

  // Generic setter so each field can update one key without spreading logic.
  function update<K extends keyof JobFormData>(key: K, value: JobFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    // Same minimal validation as before — HTML `required` handles the rest.
    if (!form.title || !form.companyName || !form.category) {
      setError("Please fill in all required fields.");
      return;
    }

    const result = await createJob(form);

    if (result.insertedId) {
      // (typo fixed: was "JOb created")
      toast.add({
        title: "Job created",
        description: "The job has been successfully created",
      });
      router.push("/dashboard/recruiter/jobs");
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      {/* Breadcrumb + page header (was inline markup, now shared component) */}
      <PageHeader
        crumbs={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: "Create New Listing", className: "text-indigo-400" },
        ]}
        title="Post a New Job"
        description="Fill in the position specifications to attract qualified talent across our network."
      />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        {error && <FormError>{error}</FormError>}

        {/* 1. Basic Information */}
        <FormSection title="1. Basic Information">
          <FormField label="Job Title" htmlFor="job-title" required>
            <Input
              id="job-title"
              name="title"
              placeholder="Frontend Developer"
              value={form.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                update("title", e.target.value)
              }
              required
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Company Name" htmlFor="company-name" required>
              <InputWithIcon
                icon={BriefcaseBusiness}
                id="company-name"
                name="companyName"
                placeholder="HirePulse Network"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                required
              />
            </FormField>

            <FormField label="Job Category" htmlFor="job-category" required>
              <NativeSelect
                id="job-category"
                name="category"
                value={form.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  update("category", e.target.value)
                }
                required
              >
                <option value="" disabled className="bg-[#1a1a1f]">
                  Select a category
                </option>
                {jobCategories.map((category) => (
                  <option key={category} value={category} className="bg-[#1a1a1f]">
                    {category}
                  </option>
                ))}
              </NativeSelect>
            </FormField>
          </div>

          <FormField label="Job Type" required>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("jobType", type)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    form.jobType === type
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </FormField>
        </FormSection>

        {/* 2. Location, Compensation & Timeline */}
        <FormSection title="2. Location, Compensation & Timeline">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <Globe className="size-4 shrink-0 text-zinc-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-white">
                  Remote Work Allowed (isRemote)
                </p>
                <p className="text-xs text-zinc-500">
                  Enable for remote or distributed associate applications
                </p>
              </div>
            </div>
            <Switch
              checked={form.remote}
              onCheckedChange={(checked) => update("remote", checked)}
              aria-label="Remote work allowed"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Job Location (Location)"
              htmlFor="job-location"
              hint="Required"
            >
              <InputWithIcon
                icon={MapPin}
                id="job-location"
                name="location"
                placeholder="New York, USA"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </FormField>

            <FormField label="Application Deadline (deadline)" htmlFor="deadline">
              <InputWithIcon
                icon={Calendar}
                id="deadline"
                name="deadline"
                type="date"
                className="[color-scheme:dark]"
                value={form.deadline}
                onChange={(e) => update("deadline", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Min Salary / Rate" htmlFor="min-salary">
              <InputWithIcon
                icon={CircleDollarSign}
                id="min-salary"
                name="minSalary"
                type="number"
                min="0"
                placeholder="€25"
                value={form.minSalary}
                onChange={(e) => update("minSalary", e.target.value)}
              />
            </FormField>

            <FormField label="Max Salary / Rate" htmlFor="max-salary">
              <InputWithIcon
                icon={CircleDollarSign}
                id="max-salary"
                name="maxSalary"
                type="number"
                min="0"
                placeholder="€40"
                value={form.maxSalary}
                onChange={(e) => update("maxSalary", e.target.value)}
              />
            </FormField>

            <FormField label="Frequency" htmlFor="frequency">
              <NativeSelect
                id="frequency"
                name="frequency"
                value={form.frequency}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  update("frequency", e.target.value)
                }
              >
                {frequencies.map((frequency) => (
                  <option key={frequency} value={frequency} className="bg-[#1a1a1f]">
                    {frequency}
                  </option>
                ))}
              </NativeSelect>
            </FormField>
          </div>
        </FormSection>

        {/* 3. Responsibilities & Requirements */}
        <FormSection title="3. Responsibilities & Requirements">
          <FormField
            label="Key Responsibilities"
            htmlFor="responsibilities"
            required
          >
            <Textarea
              id="responsibilities"
              name="responsibilities"
              rows={4}
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              value={form.responsibilities}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                update("responsibilities", e.target.value)
              }
              required
            />
          </FormField>

          <FormField
            label="Qualifications & Requirements"
            htmlFor="qualifications"
            required
          >
            <Textarea
              id="qualifications"
              name="qualifications"
              rows={4}
              placeholder={"• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"}
              value={form.qualifications}
              onChange={(e) => update("qualifications", e.target.value)}
              required
            />
          </FormField>
        </FormSection>

        <section className="flex justify-end mr-6">
          {/* Indigo CTA now uses the shared `brand` variant */}
          <Button type="submit" variant="brand" className="h-10 px-5">
            Publish Job
            <ArrowRight />
          </Button>
        </section>
      </form>
    </div>
  );
}
