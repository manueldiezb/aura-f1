export interface PaddockPhoto {
  id: string;
  photoUrl: string;
  person?: string;
  role?: "Piloto F1" | "Team Principal" | "Celebrity" | "Modelo" | "Invitado VIP";
  gp: string;
  tags: string[];
}

export const PADDOCK_PHOTOS: PaddockPhoto[] = [
  {
    id: "1507003211169-0a1dd7228f2d",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&fit=crop",
    person: "Lewis Hamilton",
    role: "Piloto F1",
    gp: "GP de Mónaco 2024",
    tags: ["formal", "luxury"],
  },
  {
    id: "1519085360753-af0119f7cbe7",
    photoUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=85&fit=crop",
    person: "Lando Norris",
    role: "Piloto F1",
    gp: "GP de Miami 2025",
    tags: ["casual", "streetwear"],
  },
  {
    id: "1508214751196-bcfd4ca60f91",
    photoUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=85&fit=crop",
    person: "Rihanna",
    role: "Celebrity",
    gp: "GP de Mónaco 2024",
    tags: ["luxury", "formal"],
  },
  {
    id: "1488161628813-04466f872be2",
    photoUrl:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=85&fit=crop",
    person: "Carlos Sainz",
    role: "Piloto F1",
    gp: "GP de Silverstone 2024",
    tags: ["casual", "streetwear"],
  },
  {
    id: "1509631179647-0177331693ae",
    photoUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&fit=crop",
    person: "Tom Cruise",
    role: "Celebrity",
    gp: "GP de Las Vegas 2024",
    tags: ["casual", "luxury"],
  },
  {
    id: "1539571696357-5a69c17a67c6",
    photoUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=85&fit=crop",
    person: "Charles Leclerc",
    role: "Piloto F1",
    gp: "GP de Mónaco 2024",
    tags: ["streetwear", "casual"],
  },
  {
    id: "1534528741775-53994a69daeb",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85&fit=crop",
    person: "Bella Hadid",
    role: "Celebrity",
    gp: "GP de Mónaco 2024",
    tags: ["luxury", "formal"],
  },
  {
    id: "1506794778202-cad84cf45f1d",
    photoUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85&fit=crop",
    person: "Fernando Alonso",
    role: "Piloto F1",
    gp: "GP de Abu Dhabi 2024",
    tags: ["formal", "luxury"],
  },
  {
    id: "1480455624313-e29b44bbfde1",
    photoUrl:
      "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=800&q=85&fit=crop",
    person: "Max Verstappen",
    role: "Piloto F1",
    gp: "GP de Las Vegas 2024",
    tags: ["casual", "sportswear"],
  },
  {
    id: "1564564321837-a57b7070ac4f",
    photoUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800&q=85&fit=crop",
    person: "George Russell",
    role: "Piloto F1",
    gp: "GP de Silverstone 2024",
    tags: ["formal", "luxury"],
  },
  {
    id: "1488426862026-3ee34a7d66df",
    photoUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=85&fit=crop",
    person: "Dua Lipa",
    role: "Celebrity",
    gp: "GP de Las Vegas 2024",
    tags: ["luxury", "formal"],
  },
  {
    id: "1517841905240-472988babdf9",
    photoUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=85&fit=crop",
    person: "Shakira",
    role: "Celebrity",
    gp: "GP de Miami 2025",
    tags: ["casual", "luxury"],
  },
  {
    id: "1501196354995-cbb51c65aaea",
    photoUrl:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&q=85&fit=crop",
    person: "Oscar Piastri",
    role: "Piloto F1",
    gp: "GP de Miami 2025",
    tags: ["streetwear", "casual"],
  },
  {
    id: "1531746020798-e6953c6e8e04",
    photoUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&fit=crop",
    person: "Beyoncé",
    role: "Celebrity",
    gp: "GP de Abu Dhabi 2024",
    tags: ["luxury", "formal"],
  },
  {
    id: "1524504388940-b1c1722653e1",
    photoUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=85&fit=crop",
    role: "Invitado VIP",
    gp: "GP de Mónaco 2024",
    tags: ["casual", "luxury"],
  },
  {
    id: "1552058544-f2b08422138a",
    photoUrl:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=85&fit=crop",
    role: "Modelo",
    gp: "GP de Las Vegas 2024",
    tags: ["formal", "luxury"],
  },
  {
    id: "1540569014015-19a7be504e3a",
    photoUrl:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800&q=85&fit=crop",
    role: "Invitado VIP",
    gp: "GP de Silverstone 2024",
    tags: ["streetwear", "casual"],
  },
  {
    id: "1506277886164-e25aa3f4ef7f",
    photoUrl:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=800&q=85&fit=crop",
    role: "Modelo",
    gp: "GP de Miami 2025",
    tags: ["casual", "formal"],
  },
  {
    id: "1490481651871-ab68de25d43d",
    photoUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85&fit=crop",
    role: "Invitado VIP",
    gp: "GP de Abu Dhabi 2024",
    tags: ["luxury", "formal"],
  },
  {
    id: "1479064555552-3ef4979f8908",
    photoUrl:
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&q=85&fit=crop",
    role: "Invitado VIP",
    gp: "GP de Las Vegas 2024",
    tags: ["luxury", "streetwear"],
  },
];
