"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available — do nothing.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy transaction ID"
      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-400" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
