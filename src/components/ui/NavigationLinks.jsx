"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavigationLinks({
  navLinks,
  isMobile = false,
  onLinkClick,
}) {
  const pathname = usePathname();

  // Jika mobile, tampilkan sebagai kolom. Jika tidak, sebagai baris.
  const navClass = cn("flex items-center gap-6 text-sm font-medium", {
    "flex-col !items-start !gap-4 text-base": isMobile,
  });

  return (
    <nav className={navClass}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick} // Tutup sheet saat link diklik
            className={cn(
              "transition-colors hover:text-blue-600",
              isActive ? "text-blue-600 font-bold" : "text-gray-600"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
