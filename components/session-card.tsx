"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SessionStatus = "Upcoming" | "Completed" | "Live";

interface SessionCardProps {
  sessionName: string;
  sessionType: string;
  dateStart: string;
  dateEnd: string;
  status: SessionStatus;
}

const SESSION_TYPE_ORDER: Record<string, number> = {
  Practice: 0,
  Qualifying: 1,
  Sprint: 2,
  Race: 3,
};

function formatSessionDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatSessionTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

const SESSION_ICONS: Record<string, string> = {
  Practice: "🔧",
  Qualifying: "⏱️",
  Sprint: "⚡",
  Race: "🏁",
};

export function SessionCard({
  sessionName,
  sessionType,
  dateStart,
  dateEnd: _dateEnd,
  status,
}: SessionCardProps) {
  const icon =
    SESSION_ICONS[sessionType] ??
    (sessionName.toLowerCase().includes("sprint") ? "⚡" : "🏎️");

  return (
    <Card
      className={cn(
        "border-0 ring-1 transition-colors",
        status === "Live"
          ? "bg-emerald-950/40 ring-emerald-500/40"
          : status === "Completed"
            ? "bg-zinc-900/60 ring-zinc-700/40"
            : "bg-zinc-900/80 ring-zinc-700/40"
      )}
    >
      <CardHeader className="pb-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <span aria-hidden="true">{icon}</span>
            {sessionName}
          </CardTitle>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-1 space-y-0.5 text-xs text-zinc-400">
          <p>{formatSessionDate(dateStart)}</p>
          <p className="font-medium text-zinc-300">{formatSessionTime(dateStart)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: SessionStatus }) {
  if (status === "Live") {
    return (
      <Badge className="shrink-0 animate-pulse bg-emerald-500 text-white">
        En vivo
      </Badge>
    );
  }
  if (status === "Completed") {
    return (
      <Badge variant="secondary" className="shrink-0 text-zinc-400">
        Completada
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="shrink-0 text-zinc-300">
      Próxima
    </Badge>
  );
}

export { SESSION_TYPE_ORDER };
