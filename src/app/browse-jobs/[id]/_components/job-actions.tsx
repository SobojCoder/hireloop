"use client"

// Apply / save actions for the job details page. Both handlers are
// intentionally EMPTY — implement them later (e.g. POST an application,
// toggle a bookmark) without touching the URL state.

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { JobRow } from "@/types/jobs"
import { useRouter } from "next/navigation"

export function JobActions({job}: {job: JobRow}) {
    const {data: session} = authClient.useSession()

    const router = useRouter()

    function handleApply() {
        if(!session?.user){
            router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
            return
        }
    }

    function handleSave() {
        // TODO: implement the bookmark/save flow here.
    }

    return (
        <div className="flex flex-col gap-3">
            <Button variant="brand" className="h-11 w-full" onClick={handleApply}>
                Apply Now
            </Button>
            <Button
                variant="outline"
                className="h-11 w-full border-white/10 bg-white/5 hover:bg-white/10"
                onClick={handleSave}
            >
                Save Job
            </Button>
        </div>
    )
}
