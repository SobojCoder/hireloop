import type { ApplicationRow } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// query example: `userId=${session.user.id}` — the applications page of the
// seeker dashboard lists only the signed-in seeker's applications.
export const getApplications = async (query = "") => {
  const res = await fetch(`${BASE_URL}/applications?${query}`);
  return res.json() as Promise<ApplicationRow[]>;
};
