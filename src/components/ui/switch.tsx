"use client"

import * as React from "react";

import { cn } from "cn";

function Switch({
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
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex h-5 w-10 shrink-0 items-center rounded-full transition-colors outline-none select-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        checked ? "bg-white" : "bg-white/15",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute left-[2px] size-4 rounded-full shadow-md transition-transform",
          checked ? "translate-x-5 bg-black" : "bg-white"
        )}
      />
    </button>
  );
}

export { Switch };
