export interface DriverPhoto {
  headshot: string;
  carImage: string;
}

const BASE_HEADSHOT =
  "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/2026";
const BASE_CAR =
  "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2026";

function headshot(code: string, firstName: string, lastName: string): string {
  return `${BASE_HEADSHOT}/${code}01_${firstName}_${lastName}/${firstName}_${lastName}-Profile.avif`;
}

function car(teamSlug: string): string {
  return `${BASE_CAR}/${teamSlug}.png`;
}

export const DRIVER_PHOTOS: Record<string, DriverPhoto> = {
  max_verstappen: {
    headshot: headshot("VER", "Max", "Verstappen"),
    carImage: car("red-bull-racing"),
  },
  yuki_tsunoda: {
    headshot: headshot("TSU", "Yuki", "Tsunoda"),
    carImage: car("red-bull-racing"),
  },
  lewis_hamilton: {
    headshot: headshot("HAM", "Lewis", "Hamilton"),
    carImage: car("ferrari"),
  },
  charles_leclerc: {
    headshot: headshot("LEC", "Charles", "Leclerc"),
    carImage: car("ferrari"),
  },
  lando_norris: {
    headshot: headshot("NOR", "Lando", "Norris"),
    carImage: car("mclaren"),
  },
  oscar_piastri: {
    headshot: headshot("PIA", "Oscar", "Piastri"),
    carImage: car("mclaren"),
  },
  george_russell: {
    headshot: headshot("RUS", "George", "Russell"),
    carImage: car("mercedes"),
  },
  andrea_kimi_antonelli: {
    headshot: headshot("ANT", "Andrea_Kimi", "Antonelli"),
    carImage: car("mercedes"),
  },
  fernando_alonso: {
    headshot: headshot("ALO", "Fernando", "Alonso"),
    carImage: car("aston-martin"),
  },
  lance_stroll: {
    headshot: headshot("STR", "Lance", "Stroll"),
    carImage: car("aston-martin"),
  },
  pierre_gasly: {
    headshot: headshot("GAS", "Pierre", "Gasly"),
    carImage: car("alpine"),
  },
  jack_doohan: {
    headshot: headshot("DOO", "Jack", "Doohan"),
    carImage: car("alpine"),
  },
  liam_lawson: {
    headshot: headshot("LAW", "Liam", "Lawson"),
    carImage: car("rb"),
  },
  nico_hulkenberg: {
    headshot: headshot("HUL", "Nico", "Hulkenberg"),
    carImage: car("kick-sauber"),
  },
  gabriel_bortoleto: {
    headshot: headshot("BOR", "Gabriel", "Bortoleto"),
    carImage: car("kick-sauber"),
  },
  oliver_bearman: {
    headshot: headshot("BEA", "Oliver", "Bearman"),
    carImage: car("haas"),
  },
  esteban_ocon: {
    headshot: headshot("OCO", "Esteban", "Ocon"),
    carImage: car("haas"),
  },
  alexander_albon: {
    headshot: headshot("ALB", "Alexander", "Albon"),
    carImage: car("williams"),
  },
  carlos_sainz: {
    headshot: headshot("SAI", "Carlos", "Sainz"),
    carImage: car("williams"),
  },
};
