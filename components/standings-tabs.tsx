"use client";

import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { DriverRow } from "@/components/driver-row";
import { ConstructorRow } from "@/components/constructor-row";
import { getTeamColor } from "@/lib/team-colors";
import { DRIVER_PHOTOS } from "@/lib/driver-photos";
import type {
  DriverStanding,
  ConstructorStanding,
  LastRaceInfo,
  RaceResultItem,
} from "@/lib/jolpica";

interface RaceResult {
  position: string;
  Driver: {
    givenName: string;
    familyName: string;
  };
  Constructor: {
    name: string;
  };
  Time?: { time: string };
  status: string;
  points: string;
}

interface StandingsTabsProps {
  defaultTab: string;
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
  lastRaceResults: RaceResult[];
  lastRaceName?: string;
  lastRaceInfo?: LastRaceInfo;
}

const TAB_VALUES = ["drivers", "constructors", "lastrace"] as const;
type TabValue = (typeof TAB_VALUES)[number];

function isValidTab(value: string): value is TabValue {
  return (TAB_VALUES as readonly string[]).includes(value);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const FINISHED_STATUSES = ["Finished", "+1 Lap", "+2 Laps", "+3 Laps"];

function generateRaceSummary(info: LastRaceInfo): string[] {
  const winner = info.results[0];
  const p2 = info.results[1];
  const p3 = info.results[2];
  const fastestLapDriver = info.results.find((r) => r.fastestLap);
  const dnfs = info.results.filter(
    (r) => !FINISHED_STATUSES.some((s) => r.status.includes(s))
  );

  return [
    `🏆 ${winner.driverName} (${winner.teamName}) se impuso en el ${info.raceName} con un tiempo de ${winner.timeOrStatus}.`,
    `🥈 ${p2.driverName} completó el podio en segunda posición a ${p2.timeOrStatus} del ganador, seguido de ${p3.driverName} en tercero (${p3.timeOrStatus.startsWith("+") ? p3.timeOrStatus : "+" + p3.timeOrStatus}).`,
    fastestLapDriver
      ? `⚡ La vuelta rápida fue para ${fastestLapDriver.driverName}, que marcó el ritmo más veloz de la carrera.`
      : `🔥 Fue una carrera intensa con múltiples batallas a lo largo del pelotón.`,
    dnfs.length > 3
      ? `💥 La carrera estuvo marcada por numerosos abandonos: ${dnfs
          .slice(0, 3)
          .map((r) => r.driverName.split(" ").slice(-1)[0])
          .join(", ")} y ${dnfs.length - 3} más no pudieron terminar.`
      : `🏎️ La mayoría de los pilotos completaron la distancia en una carrera relativamente tranquila.`,
    `📊 Con este resultado, ${winner.driverName} suma ${winner.points} puntos vitales en el campeonato del mundo.`,
  ];
}

export function StandingsTabs({
  defaultTab,
  driverStandings,
  constructorStandings,
  lastRaceResults,
  lastRaceName,
  lastRaceInfo,
}: StandingsTabsProps) {
  const router = useRouter();
  const activeTab: TabValue = isValidTab(defaultTab) ? defaultTab : "drivers";

  function handleTabChange(value: TabValue) {
    router.replace(`?tab=${value}`, { scroll: false });
  }

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(v) => handleTabChange(v as TabValue)}
    >
      <TabsList className="bg-white/10 w-full sm:w-auto">
        <TabsTrigger value="drivers">Pilotos</TabsTrigger>
        <TabsTrigger value="constructors">Constructores</TabsTrigger>
        <TabsTrigger value="lastrace">Última carrera</TabsTrigger>
      </TabsList>

      {/* Drivers tab */}
      <TabsContent value="drivers">
        <div className="flex flex-col gap-2 mt-4">
          {driverStandings.length === 0 ? (
            <p className="text-zinc-400 text-sm text-center py-8">
              No hay datos disponibles.
            </p>
          ) : (
            driverStandings.map((standing) => {
              const teamName = standing.Constructors[0]?.name ?? "";
              const driverPhoto = DRIVER_PHOTOS[standing.Driver.driverId];
              return (
                <DriverRow
                  key={standing.Driver.driverId}
                  position={parseInt(standing.position, 10)}
                  driverNumber={standing.Driver.permanentNumber}
                  fullName={`${standing.Driver.givenName} ${standing.Driver.familyName}`}
                  teamName={teamName}
                  points={standing.points}
                  wins={standing.wins}
                  teamColor={getTeamColor(teamName)}
                  headshotUrl={driverPhoto?.headshot}
                />
              );
            })
          )}
        </div>
      </TabsContent>

      {/* Constructors tab */}
      <TabsContent value="constructors">
        <div className="flex flex-col gap-2 mt-4">
          {constructorStandings.length === 0 ? (
            <p className="text-zinc-400 text-sm text-center py-8">
              No hay datos disponibles.
            </p>
          ) : (
            constructorStandings.map((standing) => (
              <ConstructorRow
                key={standing.Constructor.constructorId}
                position={parseInt(standing.position, 10)}
                name={standing.Constructor.name}
                points={standing.points}
                wins={standing.wins}
                teamColor={getTeamColor(standing.Constructor.name)}
              />
            ))
          )}
        </div>
      </TabsContent>

      {/* Last race tab */}
      <TabsContent value="lastrace">
        <div className="flex flex-col gap-2 mt-4">
          {lastRaceInfo ? (
            <>
              {/* Race header */}
              <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-zinc-400 uppercase tracking-wide">
                  Última carrera
                </p>
                <h2 className="text-lg font-black text-white mt-1">
                  {lastRaceInfo.raceName}
                </h2>
                <p className="text-sm text-zinc-400">
                  {lastRaceInfo.circuitName} · {lastRaceInfo.locality},{" "}
                  {lastRaceInfo.country}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {formatDate(lastRaceInfo.date)}
                </p>
              </div>

              {/* Narrative summary */}
              {lastRaceInfo.results.length > 0 && (
                <div className="space-y-2 mb-6">
                  {generateRaceSummary(lastRaceInfo).map((line, i) => (
                    <p key={i} className="text-sm text-zinc-300 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* Results table — top 10 */}
              {lastRaceInfo.results.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  {lastRaceInfo.results.slice(0, 10).map((result) => {
                    const teamColor = getTeamColor(result.teamName);
                    return (
                      <div
                        key={result.position}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        {/* Position */}
                        <div className="w-7 flex-shrink-0 text-center">
                          <span className="text-sm font-black text-white tabular-nums">
                            {result.position}
                          </span>
                        </div>

                        {/* Color dot + driver + team */}
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: teamColor }}
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate leading-tight">
                              {result.driverName}
                            </p>
                            <p className="text-xs text-zinc-400 truncate leading-tight">
                              {result.teamName}
                            </p>
                          </div>
                        </div>

                        {/* Time / gap */}
                        <div className="flex-shrink-0 text-right hidden sm:block">
                          <span className="text-xs text-zinc-300 tabular-nums font-mono">
                            {result.timeOrStatus}
                          </span>
                        </div>

                        {/* Points */}
                        <div className="w-12 flex-shrink-0 text-right">
                          <span className="text-xs text-zinc-400 block leading-none mb-0.5 uppercase tracking-wide">
                            PTS
                          </span>
                          <span className="text-sm font-black text-white tabular-nums">
                            {result.points}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Fallback to old raw results when lastRaceInfo is not available */}
              {lastRaceName && (
                <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2 px-1">
                  {lastRaceName}
                </p>
              )}
              {lastRaceResults.length === 0 ? (
                <p className="text-zinc-400 text-sm text-center py-8">
                  No hay resultados disponibles.
                </p>
              ) : (
                lastRaceResults.slice(0, 10).map((result) => {
                  const teamName = result.Constructor.name;
                  const teamColor = getTeamColor(teamName);
                  const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
                  const timeOrStatus = result.Time?.time ?? result.status;

                  return (
                    <div
                      key={result.position}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-7 flex-shrink-0 text-center">
                        <span className="text-sm font-black text-white tabular-nums">
                          {result.position}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: teamColor }}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate leading-tight">
                            {driverName}
                          </p>
                          <p className="text-xs text-zinc-400 truncate leading-tight">
                            {teamName}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right hidden sm:block">
                        <span className="text-xs text-zinc-300 tabular-nums font-mono">
                          {timeOrStatus}
                        </span>
                      </div>
                      <div className="w-12 flex-shrink-0 text-right">
                        <span className="text-xs text-zinc-400 block leading-none mb-0.5 uppercase tracking-wide">
                          PTS
                        </span>
                        <span className="text-sm font-black text-white tabular-nums">
                          {result.points}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
