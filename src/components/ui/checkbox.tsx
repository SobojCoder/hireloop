"use client"

// ─── Reusable <Checkbox /> ───
// Same hand-rolled pattern as <Switch /> (no base-ui wrapper needed): a button
// with role="checkbox" that reports state changes through `onCheckedChange`.

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "cn";

function Checkbox({
  checked,
  onCheckedChange,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-slot="checkbox"
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "grid size-4 shrink-0 place-items-center rounded border transition-colors outline-none select-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        checked ? "border-indigo-500 bg-indigo-500 text-white" : "border-white/15 bg-white/5",
        className
      )}
      {...props}
    >
      <Check
        aria-hidden="true"
        strokeWidth={3}
        className={cn("size-3", !checked && "invisible")}
      />
    </button>
  );
}

export { Checkbox };
