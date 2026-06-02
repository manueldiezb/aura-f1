"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Trophy, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", icon: Home, href: "/" },
  { label: "Calendario", icon: Calendar, href: "/calendar" },
  { label: "Clasificación", icon: Trophy, href: "/standings" },
  { label: "Más", icon: Menu, href: "#" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t border-white/8 safe-area-pb">
      <div className="flex items-stretch h-16">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : href !== "#" && pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 transition-colors duration-150",
                isActive
                  ? "text-[#e10600]"
                  : "text-white/40 hover:text-white/70"
              )}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                aria-hidden="true"
              />
              <span className={cn("text-[10px] font-medium tracking-wide", isActive ? "text-[#e10600]" : "")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
