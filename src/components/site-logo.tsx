import Link from "next/link";
import Image from "next/image";

import logo from "@/images/logo.png";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Hireloop home"
      className="inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Image
        src={logo}
        alt="Hireloop"
        priority
        className={`h-7 w-auto ${className ?? ""}`}
      />
    </Link>
  );
}
