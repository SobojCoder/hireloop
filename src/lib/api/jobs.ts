import { JobRow } from "@/types/jobs";

const BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

export const getJobs =async(query='')=>{
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json();
}


export const getJobById = async (jobId: string): Promise<JobRow> => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
    return res.json();
}