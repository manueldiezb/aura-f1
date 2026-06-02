"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Children, isValidElement } from "react";
import type { ReactNode, HTMLAttributes } from "react";

interface GpTabsProps {
  activeTab: string;
  children: ReactNode;
}

const TABS = [
  { value: "sessions", label: "Sesiones" },
  { value: "hotels", label: "Hoteles" },
  { value: "events", label: "Eventos" },
  { value: "city", label: "Ciudad" },
] as const;

export function GpTabs({ activeTab, children }: GpTabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleTabChange(value: string) {
    const url = value === "sessions" ? pathname : `${pathname}?tab=${value}`;
    router.push(url, { scroll: false });
  }

  // Map children by their data-tab attribute so we render the right content
  const tabContentMap: Record<string, ReactNode> = {};
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const props = child.props as HTMLAttributes<HTMLElement> & {
        "data-tab"?: string;
      };
      const tabKey = props["data-tab"];
      if (typeof tabKey === "string") {
        tabContentMap[tabKey] = child;
      }
    }
  });

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="mb-4 w-full bg-zinc-900 ring-1 ring-zinc-700/40">
        {TABS.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="flex-1 text-sm data-active:text-zinc-50"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map(({ value }) => (
        <TabsContent key={value} value={value}>
          {tabContentMap[value]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
