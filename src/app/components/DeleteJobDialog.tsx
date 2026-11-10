'use client'
import { Trash2Icon } from "lucide-react"

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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JobRow } from "../dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
    import { useRouter } from "next/navigation"

export function DeleteJobDialog({job}:{job:JobRow}) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleDeleteJob = async()=>{
        const res = await deleteJob(job._id)
        console.log('after delete', job._id, res);
        if(res.deletedCount){
            setOpen(false)
            toast.add({
  title: "Job deleted",
  description: "The job has been permanently deleted.",
})
router.refresh();
        }
    }
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
          <AlertDialogTitle>Delete JOb?</AlertDialogTitle>
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
  )
}
