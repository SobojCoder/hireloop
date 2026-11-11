// ─── STEP 4: Reusable <FormField /> ───
// Every labeled control in the forms repeated this wrapper:
//
//   <div className="flex flex-col gap-2">
//     <Label htmlFor="...">Label text <span className="text-indigo-400">*</span></Label>
//     ...control...
//   </div>
//
// This component extracts that wrapper. `label` accepts any ReactNode so
// special cases (like the "Job Location" label with a right-side hint) still
// work without changing the shared component.

import type { ReactNode } from "react";

import { cn } from "cn";

import { Label } from "@/components/ui/label";

/** The red asterisk shown after labels of required fields. */
function RequiredMark() {
  return <span className="text-indigo-400">*</span>;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  className,
  children,
}: {
  /** Label text (or any node) rendered above the control. */
  label: ReactNode;
  /** `id` of the control this label points at, when applicable. */
  htmlFor?: string;
  /** Renders the required asterisk after the label. */
  required?: boolean;
  /** Optional right-aligned hint next to the label, e.g. "Required". */
  hint?: string;
  /** Extra classes for the wrapper <div>. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {hint ? (
        <div className="flex items-center justify-between">
          <Label htmlFor={htmlFor}>
            {label}
            {required && <RequiredMark />}
          </Label>
          <span className="text-[10px] text-zinc-600">{hint}</span>
        </div>
      ) : (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <RequiredMark />}
        </Label>
      )}
      {children}
    </div>
  );
}
