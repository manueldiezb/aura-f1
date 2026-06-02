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
import type { DriverStanding, ConstructorStanding } from "@/lib/jolpica";

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
}

const TAB_VALUES = ["drivers", "constructors", "lastrace"] as const;
type TabValue = (typeof TAB_VALUES)[number];

function isValidTab(value: string): value is TabValue {
  return (TAB_VALUES as readonly string[]).includes(value);
}

export function StandingsTabs({
  defaultTab,
  driverStandings,
  constructorStandings,
  lastRaceResults,
  lastRaceName,
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
                        {driverName}
                      </p>
                      <p className="text-xs text-zinc-400 truncate leading-tight">
                        {teamName}
                      </p>
                    </div>
                  </div>

                  {/* Time / gap */}
                  <div className="flex-shrink-0 text-right hidden sm:block">
                    <span className="text-xs text-zinc-300 tabular-nums font-mono">
                      {timeOrStatus}
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
            })
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
