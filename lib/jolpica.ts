const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    givenName: string;
    familyName: string;
    nationality: string;
  };
  Constructors: Array<{
    constructorId: string;
    name: string;
    nationality: string;
  }>;
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: {
    constructorId: string;
    name: string;
    nationality: string;
  };
}

export interface RaceResultItem {
  position: string;
  driverName: string;
  teamName: string;
  timeOrStatus: string;
  points: string;
  fastestLap: boolean;
  status: string;
}

export interface LastRaceInfo {
  raceName: string;
  date: string;
  circuitName: string;
  locality: string;
  country: string;
  results: RaceResultItem[];
}

async function fetchJolpica<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error(`Jolpica error: ${res.status}`);
  return res.json();
}

export async function getDriverStandings(
  year: number | "current" = "current"
): Promise<DriverStanding[]> {
  const data = await fetchJolpica<any>(`/${year}/driverstandings.json`);
  return (
    data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? []
  );
}

export async function getConstructorStandings(
  year: number | "current" = "current"
): Promise<ConstructorStanding[]> {
  const data = await fetchJolpica<any>(`/${year}/constructorstandings.json`);
  return (
    data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ??
    []
  );
}

// Kept for backward compatibility
export async function getLastRaceResult(): Promise<any[]> {
  const data = await fetchJolpica<any>(`/current/last/results.json`);
  return data?.MRData?.RaceTable?.Races?.[0]?.Results ?? [];
}

export async function getLastRace(): Promise<LastRaceInfo | null> {
  const data = await fetchJolpica<any>(`/current/last/results.json`);
  const race = data?.MRData?.RaceTable?.Races?.[0];
  if (!race) return null;

  const results: RaceResultItem[] = (race.Results ?? []).map((r: any) => ({
    position: r.position,
    driverName: `${r.Driver.givenName} ${r.Driver.familyName}`,
    teamName: r.Constructor.name,
    timeOrStatus: r.Time?.time ?? r.status,
    points: r.points,
    fastestLap: r.FastestLap?.rank === "1",
    status: r.status,
  }));

  return {
    raceName: race.raceName,
    date: race.date,
    circuitName: race.Circuit.circuitName,
    locality: race.Circuit.Location.locality,
    country: race.Circuit.Location.country,
    results,
  };
}
