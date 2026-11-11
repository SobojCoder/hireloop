"use client";

// STEP 12: DeleteJobDialog cleanup — same behavior, tidier wiring:
//   • `JobRow` is now imported (type-only) from "@/types" instead of reaching
//     into the jobs page file.
//   • Typo fixed: "Delete JOb?" → "Delete Job?".
//   • Stray console.log removed; imports grouped consistently.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { deleteJob } from "@/lib/actions/jobs";
import type { JobRow } from "@/types";

export function DeleteJobDialog({ job }: { job: JobRow }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteJob = async () => {
    const res = await deleteJob(job._id);
    if (res.deletedCount) {
      setOpen(false);
      toast.add({
        title: "Job deleted",
        description: "The job has been permanently deleted.",
      });
      router.refresh();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive"><Trash2Icon /></Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job conversation. View{" "}
            <Link href="#">Settings</Link> delete any memories saved during this job.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteJob} variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
