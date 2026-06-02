const BASE_URL = "https://api.openf1.org/v1";

export interface Session {
  session_key: number;
  session_name: string;
  session_type: string;
  status: string;
  date_start: string;
  date_end: string;
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_name: string;
  location: string;
  meeting_key: number;
  year: number;
}

export interface Meeting {
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  date_start: string;
  date_end: string;
  year: number;
  gmt_offset: string;
  is_cancelled: boolean;
  circuit_image?: string;
}

export interface Driver {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  country_code: string;
  session_key: number;
  meeting_key: number;
}

export interface Position {
  session_key: number;
  meeting_key: number;
  driver_number: number;
  date: string;
  position: number;
}

async function fetchOpenF1<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`OpenF1 error: ${res.status}`);
  return res.json();
}

export async function getMeetings(year: number): Promise<Meeting[]> {
  return fetchOpenF1<Meeting[]>(`/meetings?year=${year}`);
}

export async function getMeeting(meetingKey: number): Promise<Meeting[]> {
  return fetchOpenF1<Meeting[]>(`/meetings?meeting_key=${meetingKey}`);
}

export async function getSessionsForMeeting(meetingKey: number): Promise<Session[]> {
  return fetchOpenF1<Session[]>(`/sessions?meeting_key=${meetingKey}`);
}

export async function getLatestSession(): Promise<Session[]> {
  return fetchOpenF1<Session[]>(`/sessions?session_name=Race&year=${new Date().getFullYear()}`);
}

export async function getDriversForSession(sessionKey: number): Promise<Driver[]> {
  return fetchOpenF1<Driver[]>(`/drivers?session_key=${sessionKey}`);
}

export async function getRacePositions(sessionKey: number): Promise<Position[]> {
  const positions = await fetchOpenF1<Position[]>(`/position?session_key=${sessionKey}`);
  const latest = new Map<number, Position>();
  for (const p of positions) {
    const existing = latest.get(p.driver_number);
    if (!existing || new Date(p.date) > new Date(existing.date)) {
      latest.set(p.driver_number, p);
    }
  }
  return Array.from(latest.values()).sort((a, b) => a.position - b.position);
}
