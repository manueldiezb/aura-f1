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

async function fetchJolpica<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error(`Jolpica error: ${res.status}`);
  return res.json();
}

export async function getDriverStandings(year: number | "current" = "current"): Promise<DriverStanding[]> {
  const data = await fetchJolpica<any>(`/${year}/driverstandings.json`);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
}

export async function getConstructorStandings(year: number | "current" = "current"): Promise<ConstructorStanding[]> {
  const data = await fetchJolpica<any>(`/${year}/constructorstandings.json`);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
}

export async function getLastRaceResult(): Promise<any[]> {
  const data = await fetchJolpica<any>(`/current/last/results.json`);
  return data?.MRData?.RaceTable?.Races?.[0]?.Results ?? [];
}
