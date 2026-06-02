export interface CityVisual {
  photoUrl: string;
  tagline: string;
  accentColor: string;
}

// Todas las URLs han sido verificadas y devuelven HTTP 200
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=85&fit=crop`;

export const CITY_VISUALS: Record<string, CityVisual> = {
  "Monte Carlo": {
    photoUrl: U("1572883454114-1cf0031ede2a"),
    tagline: "Donde la velocidad se viste de elegancia",
    accentColor: "#a855f7",
  },
  Melbourne: {
    photoUrl: U("1519677100203-a0e668c92439"),
    tagline: "La F1 abraza la ciudad más vivible del mundo",
    accentColor: "#0ea5e9",
  },
  Shanghai: {
    photoUrl: U("1580674684081-7617fbf3d745"),
    tagline: "El futuro rueda a 300 km/h",
    accentColor: "#f59e0b",
  },
  Suzuka: {
    photoUrl: U("1536098561742-ca998e48cbcc"),
    tagline: "La catedral del automovilismo",
    accentColor: "#ec4899",
  },
  Sakhir: {
    photoUrl: U("1548438294-1ad5d5f4f063"),
    tagline: "Adrenalina bajo las estrellas del desierto",
    accentColor: "#f97316",
  },
  Jeddah: {
    photoUrl: U("1535572290543-960a8046f5af"),
    tagline: "Velocidad en la orilla del Mar Rojo",
    accentColor: "#10b981",
  },
  "Miami Gardens": {
    photoUrl: U("1535498730771-e735b998cd64"),
    tagline: "South Beach vibra al ritmo de los motores",
    accentColor: "#06b6d4",
  },
  "Montréal": {
    photoUrl: U("1483728642387-6c3bdd6c93e5"),
    tagline: "La fiesta no termina cuando acaba la carrera",
    accentColor: "#ef4444",
  },
  Spielberg: {
    photoUrl: U("1506905925346-21bda4d32df4"),
    tagline: "Alta velocidad entre montañas eternas",
    accentColor: "#22c55e",
  },
  Barcelona: {
    photoUrl: U("1583422409516-2895a77efded"),
    tagline: "Pasión mediterránea sobre el asfalto",
    accentColor: "#f43f5e",
  },
  Silverstone: {
    photoUrl: U("1513635269975-59663e0ac1ad"),
    tagline: "La casa donde nació la Fórmula 1",
    accentColor: "#3b82f6",
  },
  "Spa-Francorchamps": {
    photoUrl: U("1560969184-10fe8719e047"),
    tagline: "El circuito más mágico del calendario",
    accentColor: "#8b5cf6",
  },
  Budapest: {
    photoUrl: U("1491555103944-7c647fd857e6"),
    tagline: "Historia y velocidad a orillas del Danubio",
    accentColor: "#f59e0b",
  },
  Zandvoort: {
    photoUrl: U("1551009175-8a68da93d5f9"),
    tagline: "La marea naranja invade la costa holandesa",
    accentColor: "#f97316",
  },
  Monza: {
    photoUrl: U("1558618666-fcd25c85cd64"),
    tagline: "Il Tempio della Velocità. Sagrado y eterno",
    accentColor: "#10b981",
  },
  Madrid: {
    photoUrl: U("1539037116277-4db20889f2d4"),
    tagline: "La capital española vive su primer Gran Premio",
    accentColor: "#ef4444",
  },
  Baku: {
    photoUrl: U("1494783367193-149034c05e8f"),
    tagline: "La ciudad de los contrastes y frenadas tardías",
    accentColor: "#0ea5e9",
  },
  "Marina Bay": {
    photoUrl: U("1525625293386-3f8f99389edd"),
    tagline: "El Gran Premio más espectacular del mundo",
    accentColor: "#8b5cf6",
  },
  Austin: {
    photoUrl: U("1504214208698-ea1916a2195a"),
    tagline: "Deep in the Heart of F1",
    accentColor: "#f43f5e",
  },
  "Mexico City": {
    photoUrl: U("1528360983277-13d401cdc186"),
    tagline: "El estadio más ruidoso del mundo sobre el asfalto",
    accentColor: "#22c55e",
  },
  "São Paulo": {
    photoUrl: U("1615729947596-a598e5de0ab3"),
    tagline: "La lluvia, el drama y la pasión brasileña",
    accentColor: "#22c55e",
  },
  "Las Vegas": {
    photoUrl: U("1581351721010-8cf859cb14a4"),
    tagline: "La pista más espectacular del planeta",
    accentColor: "#a855f7",
  },
  Lusail: {
    photoUrl: U("1578662996442-48f60103fc96"),
    tagline: "La noche árabe bajo los focos de la gloria",
    accentColor: "#f59e0b",
  },
  "Yas Marina": {
    photoUrl: U("1512453979798-5ea266f8880c"),
    tagline: "El telón de cierre más lujoso del mundo",
    accentColor: "#3b82f6",
  },
};
