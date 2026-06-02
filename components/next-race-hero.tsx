import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ExternalLink, Hotel } from "lucide-react";
import type { Meeting } from "@/lib/openf1";
import type { Hotel as HotelType } from "@/lib/hotels";
import { CITY_VISUALS } from "@/lib/city-photos";

// ISO 3166-1 alpha-3 → flag emoji
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

function formatDateRange(dateStart: string, dateEnd: string): string {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const startDay = start.toLocaleDateString("es-ES", { day: "numeric" });
  const endDay = end.toLocaleDateString("es-ES", { day: "numeric" });
  const month = end.toLocaleDateString("es-ES", { month: "long" });
  const year = end.getFullYear();
  return `${startDay}–${endDay} ${month} ${year}`;
}

function extractRound(officialName: string): string | null {
  const match = officialName.match(/Round\s+(\d+)/i);
  return match ? match[1] : null;
}

interface NextRaceHeroProps {
  meeting: Meeting;
  topHotels: HotelType[];
  checkIn: string;
  checkOut: string;
}

export function NextRaceHero({
  meeting,
  topHotels,
  checkIn,
  checkOut,
}: NextRaceHeroProps) {
  const visual = CITY_VISUALS[meeting.location];
  const flag = FLAG_EMOJIS[meeting.country_code] ?? "🏁";
  const round = extractRound(meeting.meeting_official_name);
  const dateRange = formatDateRange(meeting.date_start, meeting.date_end);
  const accentColor = visual?.accentColor ?? "#e10600";

  // Race date (sunday of the weekend — use date_end)
  const raceDate = new Date(meeting.date_end);
  const qualiDate = new Date(meeting.date_end);
  qualiDate.setDate(raceDate.getDate() - 1);

  const formatSession = (date: Date, label: string) => ({
    label,
    day: date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" }),
  });

  const sessions = [
    formatSession(qualiDate, "Clasificación"),
    formatSession(raceDate, "Carrera"),
  ];

  return (
    <section className="w-full">
      {/* City photo hero */}
      <div className="relative w-full h-60 overflow-hidden">
        {visual?.photoUrl ? (
          <Image
            src={visual.photoUrl}
            alt={`${meeting.location} skyline`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a]" />
        )}

        {/* Dark gradient overlay from bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, #0a0a0a 0%, ${accentColor}22 50%, transparent 100%)`,
          }}
        />

        {/* Text overlay at bottom of photo */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xl leading-none" aria-label={meeting.country_name}>
              {flag}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              {meeting.meeting_name}
              {round && (
                <span className="ml-1.5 text-white/40">· Ronda {round}</span>
              )}
            </span>
          </div>

          {visual?.tagline && (
            <p className="text-white font-bold text-lg leading-snug drop-shadow-md max-w-xs">
              &ldquo;{visual.tagline}&rdquo;
            </p>
          )}

          <div className="flex items-center gap-1.5 mt-2">
            <CalendarDays size={12} className="text-white/50" />
            <span className="text-xs text-white/60">{dateRange}</span>
          </div>
        </div>
      </div>

      {/* Circuit map + sessions row */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        {/* Circuit map */}
        <div className="bg-[#141414] rounded-xl border border-white/8 overflow-hidden flex flex-col">
          <div className="px-3 pt-3 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Circuito
            </p>
            <p className="text-xs font-bold text-white/80 mt-0.5">
              {meeting.circuit_short_name}
            </p>
          </div>
          <div className="relative flex-1 min-h-[120px] mx-3 mb-3">
            {meeting.circuit_image ? (
              <Image
                src={meeting.circuit_image}
                alt={`Mapa del circuito ${meeting.circuit_short_name}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 text-xs text-center px-2">
                  {meeting.circuit_short_name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Session times */}
        <div className="bg-[#141414] rounded-xl border border-white/8 px-3 py-3 flex flex-col gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Próximas sesiones
          </p>
          {sessions.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                {s.label}
              </span>
              <span className="text-xs font-semibold text-white/80 capitalize">
                {s.day}
              </span>
            </div>
          ))}
          <div
            className="mt-auto h-px"
            style={{ backgroundColor: `${accentColor}33` }}
          />
          <div className="flex items-center gap-1">
            <MapPin size={10} className="text-white/30" />
            <span className="text-[10px] text-white/30">
              {meeting.location}, {meeting.country_name}
            </span>
          </div>
        </div>
      </div>

      {/* Hotel cards */}
      {topHotels.length > 0 ? (
        <div className="px-4 mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-2">
            Dónde alojarse
          </p>
          <div className="flex flex-col gap-2">
            {topHotels.map((hotel) => {
              const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
                hotel.name + " " + meeting.location
              )}&checkin=${checkIn}&checkout=${checkOut}&aid=304142`;
              return (
                <div
                  key={hotel.name}
                  className="bg-[#141414] border border-white/8 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Hotel size={12} className="text-white/40 shrink-0" />
                      <p className="text-sm font-semibold text-white/90 truncate">
                        {hotel.name}
                      </p>
                    </div>
                    <p className="text-[11px] text-white/45 truncate">
                      {hotel.neighborhood}
                    </p>
                    <p className="text-[11px] text-white/35 mt-0.5">
                      {hotel.distanceKm < 1
                        ? `${hotel.distanceKm * 1000}m del circuito`
                        : `${hotel.distanceKm} km del circuito`}{" "}
                      · Desde{" "}
                      <span className="text-white/60 font-semibold">
                        {hotel.priceFrom.toLocaleString("es-ES")} €
                      </span>
                      /noche
                    </p>
                  </div>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: accentColor }}
                  >
                    Reservar
                    <ExternalLink size={10} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="px-4 mt-4">
          <a
            href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
              meeting.location
            )}&checkin=${checkIn}&checkout=${checkOut}&aid=304142`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-sm font-semibold text-white/70 hover:text-white hover:border-white/20 transition-colors"
          >
            <Hotel size={14} />
            Buscar hoteles en {meeting.location}
            <ExternalLink size={12} />
          </a>
        </div>
      )}

      {/* CTA link to GP detail */}
      <div className="px-4 mt-4 pb-6">
        <Link
          href={`/gp/${meeting.meeting_key}`}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-white/8 bg-[#141414] hover:border-white/15 hover:bg-[#1a1a1a] transition-colors group"
        >
          <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
            Ver todos los detalles del GP
          </span>
          <span
            className="text-sm font-bold transition-colors"
            style={{ color: accentColor }}
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
