import { getMeetings } from "@/lib/openf1";
import { GP_HOTELS } from "@/lib/hotels";
import { gpWeekDates } from "@/lib/booking";
import { GpCard } from "@/components/gp-card";
import { NextRaceHero } from "@/components/next-race-hero";

export default async function HomePage() {
  const year = new Date().getFullYear();
  const allMeetings = await getMeetings(year);

  const meetings = allMeetings
    .filter((m) => m.meeting_name.includes("Grand Prix") && !m.is_cancelled)
    .sort(
      (a, b) =>
        new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextIndex = meetings.findIndex((m) => new Date(m.date_start) >= today);
  const nextMeeting = nextIndex !== -1 ? meetings[nextIndex] : meetings[meetings.length - 1];

  const { checkIn, checkOut } = gpWeekDates(nextMeeting.date_start);
  const topHotels = GP_HOTELS[nextMeeting.location]?.slice(0, 2) ?? [];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* App header */}
      <header className="px-4 pt-10 pb-4">
        <h1 className="text-2xl font-black tracking-tight">
          <span className="text-[#e10600]">AURA</span>
          <span className="text-white"> F1</span>
        </h1>
        <p className="text-xs text-white/40 font-medium mt-0.5">
          Temporada {year} · {meetings.length} Grandes Premios
        </p>
      </header>

      {/* Hero — próxima carrera */}
      {nextMeeting && (
        <NextRaceHero
          meeting={nextMeeting}
          topHotels={topHotels}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      )}

      {/* Section header */}
      <div className="px-4 pt-6 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Calendario {year}
          </h2>
          <span className="text-xs text-white/25">{meetings.length} carreras</span>
        </div>
      </div>

      {/* GP list */}
      <section className="px-4 pb-10">
        {meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl" aria-hidden="true">🏁</span>
            <p className="text-white/40 text-sm text-center">
              Calendario no disponible
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {meetings.map((meeting, index) => (
              <li key={meeting.meeting_key}>
                <GpCard
                  meetingKey={meeting.meeting_key}
                  meetingName={meeting.meeting_name}
                  location={meeting.location}
                  countryName={meeting.country_name}
                  countryCode={meeting.country_code}
                  dateStart={meeting.date_start}
                  isNext={index === nextIndex}
                  isPast={new Date(meeting.date_start) < today}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
