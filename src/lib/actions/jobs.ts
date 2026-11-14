// STEP 10: types now come from the shared "@/types" barrel instead of a UI
// component, and `creatJob` was renamed to the correctly spelled `createJob`
// (the only call site was updated too, so nothing breaks).
import type { ApplicationPayload, JobFormData } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const createJob = async (data: JobFormData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  });
  return res.json();
};

export const applyToJob = async (data: ApplicationPayload) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
