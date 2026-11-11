"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CircleDollarSign,
  Globe,
  MapPin,
} from "lucide-react";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { creatJob } from "@/lib/actions/jobs";

import {
  Code,
  Palette,
  Megaphone,
  Briefcase,
  Database,
  PenTool,
} from "lucide-react";

import { LucideIcon } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


// Collected form shape — easy to map when saving to MongoDB later.
export type JobFormData = {
  title: string;
  companyName: string;
  category: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  remote: boolean;
  status: "Active" | "Expired";
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
  applicants: number
};

const jobTypes: JobFormData["jobType"][] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const jobCategories = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Data & AI",
  "Marketing & Sales",
  "Other",
];

const frequencies = ["per hour", "per day", "per week", "per month", "per year"];



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
  applicants: 0
  
};

function RequiredMark() {
  return <span className="text-indigo-400">*</span>;
}

export function PostJobForm() {
  const router = useRouter();
  const [form, setForm] = useState<JobFormData>(initialJobForm);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof JobFormData>(key: K, value: JobFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const jobData: JobFormData = {...form}
    if (!form.title || !form.companyName || !form.category) {
      setError("Please fill in all required fields.");
      return;
    }
    
    const result = await creatJob(jobData);

    console.log("create job result", result);

    if(result.insertedId){
      toast.add({
        title: "JOb created",
        description: "The job has been successfully created"
      })
      router.push('/dashboard/recruiter/jobs')
    }

  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      {/* Breadcrumb */}
      <p className="text-xs text-zinc-500">
        <Link
          href="/dashboard/recruiter/jobs"
          className="transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Manage Jobs
        </Link>
        <span aria-hidden="true"> › </span>
        <span className="text-indigo-400">Create New Listing</span>
      </p>

      {/* Header */}
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
          
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        {/* 1. Basic Information */}
        <section className="flex flex-col gap-5 rounded-xl border border-white/5 bg-[#141417] p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-indigo-500" />
            1. Basic Information
          </h2>

          <div className="flex flex-col gap-2">
            <Label htmlFor="job-title">
              Job Title <RequiredMark />
            </Label>
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company-name">
                Company Name <RequiredMark />
              </Label>
              <div className="relative flex items-center">
                <BriefcaseBusiness
                  className="pointer-events-none absolute left-3 size-4 text-zinc-500"
                  aria-hidden="true"
                />
                <Input
                  id="company-name"
                  name="companyName"
                  className="pl-9"
                  placeholder="HirePulse Network"
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="job-category">
                Job Category <RequiredMark />
              </Label>
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
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Job Type <RequiredMark />
            </Label>
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
          </div>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section className="flex flex-col gap-5 rounded-xl border border-white/5 bg-[#141417] p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-indigo-500" />
            2. Location, Compensation &amp; Timeline
          </h2>

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
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="job-location">Job Location (Location)</Label>
                <span className="text-[10px] text-zinc-600">Required</span>
              </div>
              <div className="relative flex items-center">
                <MapPin
                  className="pointer-events-none absolute left-3 size-4 text-zinc-500"
                  aria-hidden="true"
                />
                <Input
                  id="job-location"
                  name="location"
                  className="pl-9"
                  placeholder="New York, USA"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="deadline">Application Deadline (deadline)</Label>
              <div className="relative flex items-center">
                <Calendar
                  className="pointer-events-none absolute left-3 size-4 text-zinc-500"
                  aria-hidden="true"
                />
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className="pl-9 [color-scheme:dark]"
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="min-salary">Min Salary / Rate</Label>
              <div className="relative flex items-center">
                <CircleDollarSign
                  className="pointer-events-none absolute left-3 size-4 text-zinc-500"
                  aria-hidden="true"
                />
                <Input
                  id="min-salary"
                  name="minSalary"
                  type="number"
                  min="0"
                  className="pl-9"
                  placeholder="€25"
                  value={form.minSalary}
                  onChange={(e) => update("minSalary", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="max-salary">Max Salary / Rate</Label>
              <div className="relative flex items-center">
                <CircleDollarSign
                  className="pointer-events-none absolute left-3 size-4 text-zinc-500"
                  aria-hidden="true"
                />
                <Input
                  id="max-salary"
                  name="maxSalary"
                  type="number"
                  min="0"
                  className="pl-9"
                  placeholder="€40"
                  value={form.maxSalary}
                  onChange={(e) => update("maxSalary", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="frequency">Frequency</Label>
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
            </div>
          </div>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section className="flex flex-col gap-5 rounded-xl border border-white/5 bg-[#141417] p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-indigo-500" />
            3. Responsibilities &amp; Requirements
          </h2>

          <div className="flex flex-col gap-2">
            <Label htmlFor="responsibilities">
              Key Responsibilities <RequiredMark />
            </Label>
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
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="qualifications">
              Qualifications &amp; Requirements <RequiredMark />
            </Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              rows={4}
              placeholder={"• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"}
              value={form.qualifications}
              onChange={(e) => update("qualifications", e.target.value)}
              required
            />
          </div>
        </section>
        <section className="flex justify-end mr-6">
          <Button
            type="submit"
            className="h-10 rounded-lg bg-indigo-500 px-5 text-white hover:bg-indigo-400"
          >
            Publish Job
            <ArrowRight />
          </Button>
        </section>
      </form>
    </div>
  );
}
