import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// OpenF1 usa códigos ISO 3166-1 alpha-3
const FLAG_EMOJIS: Record<string, string> = {
  AUS: "🇦🇺",
  AUT: "🇦🇹",
  AZE: "🇦🇿",
  BEL: "🇧🇪",
  BRA: "🇧🇷",
  BRN: "🇧🇭",
  CAN: "🇨🇦",
  CHN: "🇨🇳",
  ESP: "🇪🇸",
  GBR: "🇬🇧",
  HUN: "🇭🇺",
  ITA: "🇮🇹",
  JPN: "🇯🇵",
  KSA: "🇸🇦",
  MEX: "🇲🇽",
  MON: "🇲🇨",
  NED: "🇳🇱",
  QAT: "🇶🇦",
  SGP: "🇸🇬",
  UAE: "🇦🇪",
  USA: "🇺🇸",
};

interface GpCardProps {
  meetingKey: number;
  meetingName: string;
  location: string;
  countryName: string;
  countryCode: string;
  dateStart: string;
  isNext?: boolean;
  isPast?: boolean;
}

function formatDateEs(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function GpCard({
  meetingKey,
  meetingName,
  location,
  countryName,
  countryCode,
  dateStart,
  isNext = false,
  isPast = false,
}: GpCardProps) {
  const flag = FLAG_EMOJIS[countryCode] ?? "🏁";
  const formattedDate = formatDateEs(dateStart);

  return (
    <Link href={`/gp/${meetingKey}`} className="block group">
      <div
        className={cn(
          "flex items-center gap-4 px-4 py-4 rounded-xl border transition-colors duration-150",
          "bg-[#141414] border-white/8 group-hover:border-white/15 group-hover:bg-[#1a1a1a]",
          isNext && "border-[#e10600]/30 bg-[#1a0000]/40 group-hover:border-[#e10600]/50",
          isPast && "opacity-50"
        )}
      >
        <span className="text-3xl leading-none select-none" aria-label={countryName}>
          {flag}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-white text-sm leading-snug truncate">
              {meetingName}
            </p>
            {isNext && (
              <Badge
                className="shrink-0 bg-[#e10600] text-white border-0 text-[10px] px-1.5 py-0"
              >
                Próxima
              </Badge>
            )}
          </div>
          <p className="text-xs text-white/50 truncate">{location}, {countryName}</p>
          <p className="text-xs text-white/35 mt-0.5">{formattedDate}</p>
        </div>

        <ChevronRight
          size={16}
          className="text-white/25 group-hover:text-white/50 transition-colors shrink-0"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
