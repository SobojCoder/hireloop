import * as React from "react";

import { cn } from "cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors outline-none select-none",
        "placeholder:text-zinc-500",
        "focus-visible:border-indigo-500/60 focus-visible:ring-3 focus-visible:ring-indigo-500/25",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive/60 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
