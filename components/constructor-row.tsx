import Image from "next/image";
import { cn } from "@/lib/utils";
import { getTeamLogo } from "@/lib/team-logos";

interface ConstructorRowProps {
  position: number;
  name: string;
  points: string;
  wins: string;
  teamColor: string;
}

const POSITION_MEDALS: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export function ConstructorRow({
  position,
  name,
  points,
  wins,
  teamColor,
}: ConstructorRowProps) {
  const medal = POSITION_MEDALS[position];
  const isLeader = position === 1;
  const logo = getTeamLogo(name);

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isLeader
          ? "bg-red-950/40 border border-red-500/40"
          : "bg-white/5 border border-white/5 hover:bg-white/10"
      )}
    >
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

      {/* Logo + team name */}
      <div className="flex-1 min-w-0 flex items-center gap-3">
        {/* Team logo or badge */}
        <div className="w-10 h-6 flex-shrink-0 flex items-center justify-center">
          {logo.type === "image" && logo.url ? (
            <Image
              src={logo.url}
              width={40}
              height={24}
              alt={name}
              unoptimized
              className="object-contain w-10 h-6"
            />
          ) : (
            <span
              className="inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-black tracking-wider text-white leading-none"
              style={{ backgroundColor: logo.color }}
            >
              {logo.text}
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-white truncate">{name}</p>
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
