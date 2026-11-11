// ─── STEP 7: Reusable <FormError /> ───
// Both the post-job form and the sign-up form rendered the same error line:
//   <p role="alert" className="text-sm text-destructive">{error}</p>
// Extracted so the accessibility (role="alert") and styling stay consistent
// in one place.

import type { ReactNode } from "react";

export function FormError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-sm text-destructive">
      {children}
    </p>
  );
}
