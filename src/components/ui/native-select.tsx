import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "cn";

function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative flex items-center">
      <select
        data-slot="native-select"
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-white/10 bg-white/5 pr-8 pl-3 text-sm text-white transition-colors outline-none select-none",
          "focus-visible:border-indigo-500/60 focus-visible:ring-3 focus-visible:ring-indigo-500/25",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive/60 aria-invalid:ring-destructive/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 size-4 text-zinc-500"
        aria-hidden="true"
      />
    </div>
  );
}

export { NativeSelect };
