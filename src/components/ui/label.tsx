import * as React from "react";

import { cn } from "cn";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("text-sm font-medium text-zinc-300 select-none", className)}
      {...props}
    />
  );
}

export { Label };
