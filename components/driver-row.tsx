import Image from "next/image";
import { cn } from "@/lib/utils";

interface DriverRowProps {
  position: number;
  driverNumber: string;
  fullName: string;
  teamName: string;
  points: string;
  wins: string;
  teamColor: string;
  headshotUrl?: string;
}

const POSITION_MEDALS: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export function DriverRow({
  position,
  driverNumber,
  fullName,
  teamName,
  points,
  wins,
  teamColor,
  headshotUrl,
}: DriverRowProps) {
  const medal = POSITION_MEDALS[position];
  const isLeader = position === 1;

  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isLeader
          ? "bg-red-950/40 border border-red-500/40"
          : "bg-white/5 border border-white/5 hover:bg-white/10"
      )}
    >
      {/* Driver photo or initials fallback */}
      <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center"
        style={!headshotUrl ? { backgroundColor: `${teamColor}33`, border: `2px solid ${teamColor}` } : undefined}
      >
        {headshotUrl ? (
          <Image
            src={headshotUrl}
            alt={fullName}
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 object-cover object-top"
          />
        ) : (
          <span className="text-xs font-bold" style={{ color: teamColor }}>
            {initials}
          </span>
        )}
      </div>

      {/* Position */}
      <div className="w-8 flex-shrink-0 text-center">
        {medal ? (
          <span className="text-lg leading-none">{medal}</span>
        ) : (
          <span className="text-sm font-bold text-zinc-400 tabular-nums">
            {position}
          </span>
        )}
      </div>

      {/* Driver number */}
      <div className="w-8 flex-shrink-0 text-center">
        <span
          className="text-xs font-black tabular-nums"
          style={{ color: teamColor }}
        >
          {driverNumber}
        </span>
      </div>

      {/* Team color dot + name */}
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: teamColor }}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate leading-tight">
            {fullName}
          </p>
          <p className="text-xs text-zinc-400 truncate leading-tight">
            {teamName}
          </p>
        </div>
      </div>

      {/* Wins */}
      <div className="w-10 flex-shrink-0 text-center hidden sm:block">
        <span className="text-xs text-zinc-400 uppercase tracking-wide block leading-none mb-0.5">
          W
        </span>
        <span className="text-sm font-semibold text-white tabular-nums">
          {wins}
        </span>
      </div>

      {/* Points */}
      <div className="w-14 flex-shrink-0 text-right">
        <span className="text-xs text-zinc-400 uppercase tracking-wide block leading-none mb-0.5">
          PTS
        </span>
        <span
          className={cn(
            "text-sm font-black tabular-nums",
            isLeader ? "text-red-400" : "text-white"
          )}
        >
          {points}
        </span>
      </div>
    </div>
  );
}
