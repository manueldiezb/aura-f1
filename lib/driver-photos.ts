export interface DriverPhoto {
  headshot: string;
  carImage: string;
}

// URLs verificadas desde la API de OpenF1 (formato correcto con transform/1col/image.png)
const CDN = "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers";
const CAR_CDN = "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2026";

function h(dir: string, code: string, first: string, last: string): string {
  return `${CDN}/${dir}/${code}_${first}_${last}/${code.toLowerCase()}.png.transform/1col/image.png`;
}

export const DRIVER_PHOTOS: Record<string, DriverPhoto> = {
  // Red Bull
  max_verstappen: {
    headshot: h("M", "MAXVER01", "Max", "Verstappen"),
    carImage: `${CAR_CDN}/red-bull-racing.png`,
  },
  yuki_tsunoda: {
    headshot: h("Y", "YUKTSU01", "Yuki", "Tsunoda"),
    carImage: `${CAR_CDN}/red-bull-racing.png`,
  },
  isack_hadjar: {
    headshot: h("I", "ISAHAD01", "Isack", "Hadjar"),
    carImage: `${CAR_CDN}/red-bull-racing.png`,
  },

  // Ferrari
  lewis_hamilton: {
    headshot: h("L", "LEWHAM01", "Lewis", "Hamilton"),
    carImage: `${CAR_CDN}/ferrari.png`,
  },
  charles_leclerc: {
    headshot: h("C", "CHALEC01", "Charles", "Leclerc"),
    carImage: `${CAR_CDN}/ferrari.png`,
  },

  // Mercedes
  george_russell: {
    headshot: h("G", "GEORUS01", "George", "Russell"),
    carImage: `${CAR_CDN}/mercedes.png`,
  },
  andrea_kimi_antonelli: {
    headshot: h("K", "ANDANT01", "Kimi", "Antonelli"),
    carImage: `${CAR_CDN}/mercedes.png`,
  },
  kimi_antonelli: {
    headshot: h("K", "ANDANT01", "Kimi", "Antonelli"),
    carImage: `${CAR_CDN}/mercedes.png`,
  },

  // McLaren
  lando_norris: {
    headshot: h("L", "LANNOR01", "Lando", "Norris"),
    carImage: `${CAR_CDN}/mclaren.png`,
  },
  oscar_piastri: {
    headshot: h("O", "OSCPIA01", "Oscar", "Piastri"),
    carImage: `${CAR_CDN}/mclaren.png`,
  },

  // Aston Martin
  fernando_alonso: {
    headshot: h("F", "FERALO01", "Fernando", "Alonso"),
    carImage: `${CAR_CDN}/aston-martin.png`,
  },
  lance_stroll: {
    headshot: h("L", "LANSTR01", "Lance", "Stroll"),
    carImage: `${CAR_CDN}/aston-martin.png`,
  },

  // Alpine
  pierre_gasly: {
    headshot: h("P", "PIEGAS01", "Pierre", "Gasly"),
    carImage: `${CAR_CDN}/alpine.png`,
  },
  jack_doohan: {
    headshot: h("J", "JACDOO01", "Jack", "Doohan"),
    carImage: `${CAR_CDN}/alpine.png`,
  },
  franco_colapinto: {
    headshot: h("F", "FRACOL01", "Franco", "Colapinto"),
    carImage: `${CAR_CDN}/alpine.png`,
  },

  // Williams
  alexander_albon: {
    headshot: h("A", "ALEALB01", "Alexander", "Albon"),
    carImage: `${CAR_CDN}/williams.png`,
  },
  carlos_sainz: {
    headshot: h("C", "CARSAI01", "Carlos", "Sainz"),
    carImage: `${CAR_CDN}/williams.png`,
  },

  // Racing Bulls
  liam_lawson: {
    headshot: h("L", "LIALAW01", "Liam", "Lawson"),
    carImage: `${CAR_CDN}/rb.png`,
  },
  arvid_lindblad: {
    headshot: h("A", "ARVLIN01", "Arvid", "Lindblad"),
    carImage: `${CAR_CDN}/rb.png`,
  },

  // Kick Sauber / Audi
  nico_hulkenberg: {
    headshot: h("N", "NICHUL01", "Nico", "Hulkenberg"),
    carImage: `${CAR_CDN}/kick-sauber.png`,
  },
  gabriel_bortoleto: {
    headshot: h("G", "GABBOR01", "Gabriel", "Bortoleto"),
    carImage: `${CAR_CDN}/kick-sauber.png`,
  },

  // Haas
  oliver_bearman: {
    headshot: h("O", "OLIBEA01", "Oliver", "Bearman"),
    carImage: `${CAR_CDN}/haas.png`,
  },
  esteban_ocon: {
    headshot: h("E", "ESTOCO01", "Esteban", "Ocon"),
    carImage: `${CAR_CDN}/haas.png`,
  },
};
