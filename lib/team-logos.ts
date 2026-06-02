const CDN =
  "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos";

export interface TeamLogo {
  type: "image" | "badge";
  url?: string;
  text?: string;
  color: string;
}

export const TEAM_LOGOS: Record<string, TeamLogo> = {
  Ferrari: { type: "image", url: `${CDN}/Ferrari.png`, color: "#E8002D" },
  McLaren: { type: "image", url: `${CDN}/McLaren.png`, color: "#FF8000" },
  Mercedes: { type: "image", url: `${CDN}/Mercedes.png`, color: "#27F4D2" },
  Alpine: { type: "image", url: `${CDN}/Alpine.png`, color: "#FF87BC" },
  Williams: { type: "image", url: `${CDN}/Williams.png`, color: "#64C4FF" },
  "Haas F1 Team": {
    type: "image",
    url: `${CDN}/Haas.png`,
    color: "#B6BABD",
  },
  "Racing Bulls": {
    type: "image",
    url: `${CDN}/RB.png`,
    color: "#6692FF",
  },
  "Red Bull": { type: "badge", text: "RBR", color: "#3671C6" },
  "Aston Martin": { type: "badge", text: "AMF", color: "#229971" },
  "Kick Sauber": { type: "badge", text: "KSA", color: "#52E252" },
};

export function getTeamLogo(teamName: string): TeamLogo {
  if (TEAM_LOGOS[teamName]) return TEAM_LOGOS[teamName];
  for (const [key, val] of Object.entries(TEAM_LOGOS)) {
    if (teamName.includes(key) || key.includes(teamName)) return val;
  }
  return {
    type: "badge",
    text: teamName.slice(0, 3).toUpperCase(),
    color: "#666",
  };
}
