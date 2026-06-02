import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getMeeting, getSessionsForMeeting } from "@/lib/openf1";
import type { Session } from "@/lib/openf1";
import cityGuides from "@/lib/city-guides";
import { SessionCard } from "@/components/session-card";
import type { SessionStatus } from "@/components/session-card";
import { HotelSection } from "@/components/hotel-section";
import { EventsSection } from "@/components/events-section";
import { GpTabs } from "./gp-tabs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COUNTRY_FLAGS: Record<string, string> = {
  AE: "🇦🇪",
  AT: "🇦🇹",
  AU: "🇦🇺",
  AZ: "🇦🇿",
  BE: "🇧🇪",
  BH: "🇧🇭",
  BR: "🇧🇷",
  CA: "🇨🇦",
  CN: "🇨🇳",
  ES: "🇪🇸",
  GB: "🇬🇧",
  HU: "🇭🇺",
  IT: "🇮🇹",
  JP: "🇯🇵",
  LV: "🇺🇸",
  MC: "🇲🇨",
  MX: "🇲🇽",
  NL: "🇳🇱",
  QA: "🇶🇦",
  SA: "🇸🇦",
  SG: "🇸🇬",
  US: "🇺🇸",
};

function getFlag(countryCode: string): string {
  return COUNTRY_FLAGS[countryCode.toUpperCase()] ?? "🏁";
}

function formatDateRange(sessions: Session[]): string {
  if (sessions.length === 0) return "";

  const dates = sessions
    .map((s) => new Date(s.date_start))
    .sort((a, b) => a.getTime() - b.getTime());

  const first = dates[0];
  const last = dates[dates.length - 1];

  const fmt = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
  });

  const fmtYear = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (first.getMonth() === last.getMonth()) {
    return `${first.getDate()}–${fmtYear.format(last)}`;
  }
  return `${fmt.format(first)} – ${fmtYear.format(last)}`;
}

function deriveSessionStatus(session: Session): SessionStatus {
  const rawStatus = session.status?.toLowerCase() ?? "";
  if (rawStatus === "active" || rawStatus === "live") return "Live";
  if (rawStatus === "finished" || rawStatus === "completed") return "Completed";

  const now = Date.now();
  const start = new Date(session.date_start).getTime();
  const end = new Date(session.date_end).getTime();

  if (now >= start && now <= end) return "Live";
  if (now > end) return "Completed";
  return "Upcoming";
}

const SESSION_SORT_ORDER: Record<string, number> = {
  "Practice 1": 0,
  "Practice 2": 1,
  "Practice 3": 2,
  "Sprint Shootout": 3,
  Sprint: 4,
  Qualifying: 5,
  Race: 6,
};

function sortSessions(sessions: Session[]): Session[] {
  return [...sessions].sort((a, b) => {
    const orderA = SESSION_SORT_ORDER[a.session_name] ?? 99;
    const orderB = SESSION_SORT_ORDER[b.session_name] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(a.date_start).getTime() - new Date(b.date_start).getTime();
  });
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meetingKey = parseInt(slug, 10);

  if (isNaN(meetingKey)) {
    return { title: "Gran Premio | Aura F1" };
  }

  const meetings = await getMeeting(meetingKey);
  const meeting = meetings[0];

  if (!meeting) {
    return { title: "Gran Premio no encontrado | Aura F1" };
  }

  const flag = getFlag(meeting.country_code);
  const title = `${flag} ${meeting.meeting_name} ${meeting.year} | Aura F1`;
  const description = `Sesiones, hoteles y guía de ciudad para el ${meeting.meeting_official_name}. Planifica tu viaje al GP de ${meeting.country_name} con Aura F1.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function GpDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { tab = "sessions" } = await searchParams;

  const meetingKey = parseInt(slug, 10);
  if (isNaN(meetingKey)) notFound();

  const [meetings, sessions] = await Promise.all([
    getMeeting(meetingKey),
    getSessionsForMeeting(meetingKey),
  ]);

  const meeting = meetings[0];
  if (!meeting) notFound();

  const sortedSessions = sortSessions(sessions);
  const dateRange = formatDateRange(sessions);
  const flag = getFlag(meeting.country_code);
  const guide = cityGuides[meeting.country_code.toUpperCase()];

  const activeTab = ["sessions", "hotels", "events", "city"].includes(tab)
    ? tab
    : "sessions";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <span aria-hidden="true">←</span>
            Volver
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-16 pt-6">
        {/* GP Hero */}
        <section className="mb-6">
          <div className="flex items-start gap-3">
            <span className="text-4xl leading-none" aria-hidden="true">
              {flag}
            </span>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold leading-tight text-zinc-50">
                {meeting.meeting_official_name}
              </h1>
              <p className="mt-0.5 text-sm text-zinc-400">
                {meeting.location}, {meeting.country_name}
              </p>
              {dateRange && (
                <p className="mt-1 text-sm font-medium text-zinc-300">
                  {dateRange}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <GpTabs activeTab={activeTab}>
          {/* Sessions Tab Content */}
          <div data-tab="sessions">
            {sortedSessions.length === 0 ? (
              <p className="py-8 text-center text-sm text-zinc-500">
                No hay sesiones disponibles para este Gran Premio.
              </p>
            ) : (
              <div className="space-y-3">
                {sortedSessions.map((session) => (
                  <SessionCard
                    key={session.session_key}
                    sessionName={session.session_name}
                    sessionType={session.session_type}
                    dateStart={session.date_start}
                    dateEnd={session.date_end}
                    status={deriveSessionStatus(session)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hotels Tab Content */}
          <div data-tab="hotels">
            <HotelSection
              city={meeting.location}
              dateStart={meeting.date_start}
              countryCode={meeting.country_code}
            />
          </div>

          {/* Events Tab Content */}
          <div data-tab="events">
            <EventsSection city={meeting.location} countryName={meeting.country_name} />
          </div>

          {/* City Tab Content */}
          <div data-tab="city">
            {guide ? (
              <div className="space-y-6">
                <div className="rounded-xl bg-zinc-900/60 p-5 ring-1 ring-zinc-700/40">
                  <h3 className="mb-2 text-base font-semibold text-zinc-100">
                    {flag} {meeting.location}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {guide.description}
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold text-zinc-300">
                    Puntos de interés
                  </h4>
                  <ul className="space-y-2">
                    {guide.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-zinc-400"
                      >
                        <span
                          className="mt-0.5 shrink-0 text-red-500"
                          aria-hidden="true"
                        >
                          ●
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold text-zinc-300">
                    Consejos prácticos
                  </h4>
                  <ul className="space-y-3">
                    {guide.tips.map((tip) => (
                      <li
                        key={tip}
                        className="rounded-lg bg-zinc-900/60 p-3 text-sm text-zinc-400 ring-1 ring-zinc-700/40"
                      >
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-zinc-600">
                  Zona horaria local: {guide.timezone}
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-zinc-900/60 p-5 ring-1 ring-zinc-700/40">
                <p className="text-sm text-zinc-400">
                  Guía de ciudad disponible próximamente para{" "}
                  {meeting.location}.
                </p>
              </div>
            )}
          </div>
        </GpTabs>
      </main>
    </div>
  );
}
