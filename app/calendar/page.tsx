import type { Metadata } from "next";
import { getMeetings } from "@/lib/openf1";
import { GpCard } from "@/components/gp-card";

export const metadata: Metadata = {
  title: "Calendario | Aura F1",
};

const MONTH_NAMES_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default async function CalendarPage() {
  const year = new Date().getFullYear();
  const allMeetings = await getMeetings(year);

  const meetings = allMeetings
    .filter((m) => m.meeting_name.includes("Grand Prix") && m.is_cancelled === false)
    .sort(
      (a, b) =>
        new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextIndex = meetings.findIndex((m) => new Date(m.date_start) >= today);

  // Group by month: key = "YYYY-MM", value = meeting[]
  const byMonth = new Map<string, typeof meetings>();
  for (const meeting of meetings) {
    const d = new Date(meeting.date_start);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(meeting);
  }

  // Sorted month keys
  const monthKeys = Array.from(byMonth.keys()).sort();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="px-4 pt-12 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-[#e10600]">Calendario</span>
            <span className="text-white"> {year}</span>
          </h1>
          <p className="text-sm text-white/50 font-medium">
            {meetings.length} Grandes Premios
          </p>
        </div>
      </header>

      <section className="px-4 pb-8">
        {meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">🏁</span>
            <p className="text-white/40 text-sm text-center">
              Calendario no disponible
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {monthKeys.map((key) => {
              const monthMeetings = byMonth.get(key)!;
              // key format: "YYYY-MM"
              const monthIndex = parseInt(key.split("-")[1], 10);
              const monthYear = key.split("-")[0];
              const monthLabel = `${MONTH_NAMES_ES[monthIndex]} ${monthYear}`;

              return (
                <div key={key}>
                  {/* Month separator */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#e10600]/70">
                      {monthLabel}
                    </span>
                    <div className="flex-1 h-px bg-white/8" />
                  </div>

                  {/* GPs for this month */}
                  <ul className="flex flex-col gap-3">
                    {monthMeetings.map((meeting) => {
                      const globalIndex = meetings.indexOf(meeting);
                      return (
                        <li key={meeting.meeting_key}>
                          <GpCard
                            meetingKey={meeting.meeting_key}
                            meetingName={meeting.meeting_name}
                            location={meeting.location}
                            countryName={meeting.country_name}
                            countryCode={meeting.country_code}
                            dateStart={meeting.date_start}
                            isNext={globalIndex === nextIndex}
                            isPast={new Date(meeting.date_start) < today}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
