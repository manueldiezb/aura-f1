import type { Metadata } from "next";
import {
  getDriverStandings,
  getConstructorStandings,
  getLastRaceResult,
} from "@/lib/jolpica";
import { StandingsTabs } from "@/components/standings-tabs";

export const metadata: Metadata = {
  title: "Clasificación | Aura F1",
  description:
    "Clasificación de pilotos y constructores de la temporada actual de Formula 1.",
};

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { tab } = await searchParams;
  const activeTab = typeof tab === "string" ? tab : "drivers";

  const [driverStandings, constructorStandings, lastRaceResults] =
    await Promise.all([
      getDriverStandings("current"),
      getConstructorStandings("current"),
      getLastRaceResult(),
    ]);

  // Extract race name from the raw last race data for display
  const lastRaceName =
    lastRaceResults.length > 0
      ? ((lastRaceResults as unknown as { raceName?: string }[])[0]
          ?.raceName ?? undefined)
      : undefined;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-1 h-6 bg-red-500 rounded-full" aria-hidden="true" />
          <h1 className="text-lg font-black uppercase tracking-wider text-white">
            Clasificacion
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <StandingsTabs
          defaultTab={activeTab}
          driverStandings={driverStandings}
          constructorStandings={constructorStandings}
          lastRaceResults={lastRaceResults}
          lastRaceName={lastRaceName}
        />
      </div>
    </main>
  );
}
