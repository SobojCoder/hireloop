"use client";

import { useState } from "react";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "cn";
import { Input } from "@/components/ui/input";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((isVisible) => !isVisible)}
        aria-label={visible ? "Hide password" : "Show password"}
        tabIndex={-1}
        className="absolute right-1.5 grid size-8 place-items-center rounded-md text-zinc-500 outline-none hover:bg-white/5 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {visible ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}

export { PasswordInput };
