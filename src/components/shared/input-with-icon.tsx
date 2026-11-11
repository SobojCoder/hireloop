// ─── STEP 5: Reusable <InputWithIcon /> ───
// The post-job form repeated this exact pattern five times (company, location,
// deadline, min salary, max salary):
//
//   <div className="relative flex items-center">
//     <Icon className="pointer-events-none absolute left-3 size-4 text-zinc-500" />
//     <Input className="pl-9" ... />
//   </div>
//
// Any standard <Input /> prop still works — everything is forwarded.

import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "cn";

import { Input } from "@/components/ui/input";

export function InputWithIcon({
  icon: Icon,
  className,
  ...props
}: ComponentProps<typeof Input> & {
  /** Lucide icon rendered on the left edge inside the input. */
  icon: LucideIcon;
}) {
  return (
    <div className="relative flex items-center">
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute left-3 size-4 text-zinc-500"
      />
      {/* pl-9 reserves space for the icon; caller classes can still override. */}
      <Input className={cn("pl-9", className)} {...props} />
    </div>
  );
}
