import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const BrowseJobs = async ({searchParams}:{searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
    const search = await searchParams;

    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();
    console.log('Search params: ', query);

    const jobs = await getJobs(query);


    return (
        <div>
            <h1>Browse Jobs</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h2>{job.title}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrowseJobs;