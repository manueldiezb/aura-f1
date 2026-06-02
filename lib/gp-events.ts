export type EventCategory =
  | "oficial"
  | "fan"
  | "fiesta"
  | "cultura"
  | "deporte"
  | "gastronomia";

export interface GpEvent {
  name: string;
  category: EventCategory;
  venue: string;
  dateDescription: string;
  priceFrom?: number;
  isFree: boolean;
  url: string;
  description: string;
}

export const GP_EVENTS: Record<string, GpEvent[]> = {
  "Monte Carlo": [
    {
      name: "Amber Lounge",
      category: "fiesta",
      venue: "Amber Lounge, Monaco",
      dateDescription: "Viernes y sábado noche",
      priceFrom: 500,
      isFree: false,
      url: "https://www.amberlounge.com",
      description:
        "La fiesta exclusiva del paddock de Mónaco. Codearse con pilotos y celebridades en el evento más exclusivo del calendario de F1.",
    },
    {
      name: "F1 Fan Zone Puerto Hércules",
      category: "oficial",
      venue: "Port Hercule, Mónaco",
      dateDescription: "Jueves a domingo",
      isFree: true,
      url: "https://www.formula1.com/en/racing/2025/monaco.html",
      description:
        "Zona oficial de fans en el emblemático puerto de Mónaco con pantallas gigantes, activaciones de marca y ambiente de Gran Premio.",
    },
    {
      name: "Casino de Mónaco",
      category: "cultura",
      venue: "Place du Casino, Monte Carlo",
      dateDescription: "Viernes y sábado noche",
      priceFrom: 10,
      isFree: false,
      url: "https://www.casinomontecarlo.com",
      description:
        "El casino más famoso del mundo, accesible con dress code elegante. Una experiencia imprescindible durante el fin de semana del GP.",
    },
    {
      name: "Yacht Parties en Port Hercule",
      category: "fan",
      venue: "Port Hercule, Mónaco",
      dateDescription: "Toda la semana del GP",
      isFree: false,
      url: "https://www.montecarlosbm.com",
      description:
        "Fiestas privadas y semi-privadas a bordo de yates amarrados en el puerto. El escenario único de Mónaco convierte cada celebración en algo especial.",
    },
  ],

  Melbourne: [
    {
      name: "F1 Melbourne Grand Prix Fan Zone Albert Park",
      category: "oficial",
      venue: "Albert Park Circuit, Melbourne",
      dateDescription: "Jueves a domingo",
      isFree: true,
      url: "https://www.grandprix.com.au",
      description:
        "Zona de fans oficial incluida con la entrada al GP. Activaciones, simuladores y merchandising oficial en el circuito de Albert Park.",
    },
    {
      name: "Federation Square Live Zone",
      category: "fan",
      venue: "Federation Square, Melbourne CBD",
      dateDescription: "Toda la semana del GP",
      isFree: true,
      url: "https://fedsquare.com",
      description:
        "El corazón de Melbourne se transforma durante el GP con retransmisiones en directo, activaciones y el ambiente vibrante de la ciudad.",
    },
    {
      name: "Melbourne F1 Street Festival",
      category: "cultura",
      venue: "St Kilda Road y CBD, Melbourne",
      dateDescription: "Viernes y sábado",
      isFree: true,
      url: "https://www.grandprix.com.au",
      description:
        "Festival callejero con música en directo, food trucks y celebraciones por toda la ciudad coincidiendo con el arranque de la temporada de F1.",
    },
    {
      name: "South Wharf Restaurant District",
      category: "gastronomia",
      venue: "South Wharf, Melbourne",
      dateDescription: "Toda la semana del GP",
      isFree: false,
      url: "https://www.southwharfpromenade.com.au",
      description:
        "El distrito gastronómico junto al Yarra River concentra eventos especiales, menús temáticos y terrazas con ambiente GP durante todo el fin de semana.",
    },
  ],

  "Miami Gardens": [
    {
      name: "F1 Miami Fan Fest",
      category: "oficial",
      venue: "Hard Rock Stadium, Miami Gardens",
      dateDescription: "Viernes a domingo",
      isFree: true,
      url: "https://www.f1miamigp.com",
      description:
        "Zona de entretenimiento oficial incluida con la entrada al GP. Conciertos, activaciones de marca y el ambiente del GP en el estado de Florida.",
    },
    {
      name: "Miami Music Week F1 Edition",
      category: "fiesta",
      venue: "Varios venues en Miami Beach",
      dateDescription: "Jueves a sábado noche",
      isFree: false,
      url: "https://www.residentadvisor.net",
      description:
        "La escena musical de Miami se sincroniza con el GP con noches especiales en los clubs más exclusivos de South Beach y el Design District.",
    },
    {
      name: "Ocean Drive Block Party",
      category: "fan",
      venue: "Ocean Drive, South Beach, Miami",
      dateDescription: "Sábado y domingo",
      isFree: true,
      url: "https://www.miamibeach411.com",
      description:
        "El icónico paseo de Miami Beach se convierte en punto de encuentro para aficionados con retransmisiones al aire libre y ambiente festivo.",
    },
  ],

  Montréal: [
    {
      name: "Crescent Street Grand Prix Festival",
      category: "fan",
      venue: "Crescent Street, Montreal",
      dateDescription: "Jueves a domingo",
      isFree: true,
      url: "https://www.crescentstreet.ca",
      description:
        "El festival callejero más famoso del Gran Premio. La calle Crescent se corta al tráfico y se llena de música en directo, fans y ambiente de GP durante cuatro días.",
    },
    {
      name: "Casino de Montréal Events",
      category: "fiesta",
      venue: "Casino de Montréal, Île Notre-Dame",
      dateDescription: "Toda la semana del GP",
      priceFrom: 15,
      isFree: false,
      url: "https://www.casinosduquebec.com/montreal",
      description:
        "El casino de Montreal, a tiro de piedra del circuito Gilles Villeneuve, organiza noches especiales y eventos exclusivos durante el fin de semana del GP.",
    },
    {
      name: "F1 Montreal Fan Zone",
      category: "oficial",
      venue: "Circuit Gilles Villeneuve, Île Notre-Dame",
      dateDescription: "Viernes a domingo",
      isFree: true,
      url: "https://www.formula1.com/en/racing/2025/canada.html",
      description:
        "Zona oficial de fans incluida con la entrada al GP, con activaciones, pantallas gigantes y la magia del circuito ubicado en la isla artificial.",
    },
    {
      name: "Peel Street Parties",
      category: "fiesta",
      venue: "Peel Street, Montreal",
      dateDescription: "Viernes y sábado noche",
      isFree: false,
      url: "https://www.tourisme-montreal.org",
      description:
        "La otra gran arteria de la fiesta del GP de Montreal, con bares y clubs abiertos hasta el amanecer y ambiente festivo inigualable.",
    },
  ],

  Silverstone: [
    {
      name: "Silverstone Fan Zone y Village",
      category: "oficial",
      venue: "Silverstone Circuit, Northamptonshire",
      dateDescription: "Jueves a domingo",
      isFree: true,
      url: "https://www.silverstone.co.uk",
      description:
        "La zona de fans más grande del calendario de F1, incluida con la entrada. Conciertos nocturnos, activaciones, merchandising y el ambiente único de Silverstone.",
    },
    {
      name: "Woodlands Camping Live Music",
      category: "fan",
      venue: "Woodlands Camp, Silverstone",
      dateDescription: "Jueves a domingo noche",
      isFree: true,
      url: "https://www.silverstone.co.uk/events/formula-1",
      description:
        "La zona de camping de Silverstone se convierte en festival nocturno con música en directo incluida con la entrada al evento.",
    },
    {
      name: "Eventos en Towcester y pubs locales",
      category: "cultura",
      venue: "Towcester, Northamptonshire",
      dateDescription: "Toda la semana del GP",
      isFree: true,
      url: "https://www.visitnorthamptonshire.co.uk",
      description:
        "Los pueblos y pubs del entorno de Silverstone se llenan de aficionados. Una experiencia de la campiña inglesa auténtica durante el British Grand Prix.",
    },
  ],

  "Spa-Francorchamps": [
    {
      name: "Spa Passion Fan Village",
      category: "oficial",
      venue: "Circuit de Spa-Francorchamps",
      dateDescription: "Jueves a domingo",
      isFree: true,
      url: "https://www.formula1.com/en/racing/2025/belgium.html",
      description:
        "Village oficial de fans incluido con la entrada al GP. Activaciones, exhibiciones históricas y el ambiente de uno de los circuitos más legendarios del mundo.",
    },
    {
      name: "Belgian Beer Weekend en Spa",
      category: "cultura",
      venue: "Centro de Spa, Bélgica",
      dateDescription: "Fin de semana del GP",
      priceFrom: 5,
      isFree: false,
      url: "https://www.spa-info.be",
      description:
        "La capital belga de los balnearios organiza catas y eventos de cerveza artesanal belga durante el fin de semana del GP. Una experiencia auténticamente belga.",
    },
    {
      name: "Ardennes Discovery Tours",
      category: "deporte",
      venue: "Ardenas belgas",
      dateDescription: "Jueves y viernes",
      priceFrom: 30,
      isFree: false,
      url: "https://www.belgique-tourisme.be",
      description:
        "Rutas guiadas en bicicleta, senderismo y actividades en los bosques de las Ardenas antes de que la intensidad del GP tome el relevo el fin de semana.",
    },
    {
      name: "Eventos en Liège",
      category: "cultura",
      venue: "Liège, Bélgica",
      dateDescription: "Toda la semana del GP",
      isFree: true,
      url: "https://www.liege.be",
      description:
        "La ciudad de Liège, a 45 minutos del circuito, ofrece mercados, vida cultural y restauración auténtica belga como base durante el fin de semana.",
    },
  ],

  Monza: [
    {
      name: "Fan Village Autodromo di Monza",
      category: "oficial",
      venue: "Autodromo Nazionale Monza",
      dateDescription: "Jueves a domingo",
      isFree: true,
      url: "https://www.formula1.com/en/racing/2025/italy.html",
      description:
        "El fan village oficial incluido con la entrada al GP. El Tempio della Velocità recibe a miles de tifosi con conciertos, activaciones y la atmósfera única del GP de Italia.",
    },
    {
      name: "Parco di Monza Picnic Area",
      category: "fan",
      venue: "Parco di Monza, Monza",
      dateDescription: "Toda la semana del GP",
      isFree: true,
      url: "https://www.parcodimonza.it",
      description:
        "El circuito está dentro del parque real más grande de Europa. Aficionados de todo el mundo hacen picnic y viven el GP de Italia con un ambiente único e informal.",
    },
    {
      name: "La Scala Temporada — Milán",
      category: "cultura",
      venue: "Teatro alla Scala, Milán",
      dateDescription: "Durante el fin de semana del GP",
      priceFrom: 30,
      isFree: false,
      url: "https://www.teatroallascala.org",
      description:
        "Milán está a 20 minutos de Monza. El Teatro alla Scala mantiene su temporada activa durante el GP, combinando la velocidad de la pista con la alta cultura italiana.",
    },
    {
      name: "Monza Village Bar Crawl",
      category: "gastronomia",
      venue: "Centro histórico de Monza",
      dateDescription: "Viernes y sábado noche",
      isFree: true,
      url: "https://www.monzaedintorni.it",
      description:
        "Los bares y restaurantes del centro histórico de Monza se llenan de aficionados. La cocina lombarda y el aperitivo italiano son imprescindibles tras la jornada en el circuito.",
    },
  ],

  "Marina Bay": [
    {
      name: "F1 Village Marina Bay",
      category: "oficial",
      venue: "Marina Bay Street Circuit, Singapur",
      dateDescription: "Viernes a domingo",
      isFree: true,
      url: "https://www.singaporegp.sg",
      description:
        "Zona de fans oficial incluida con la entrada. El skyline nocturno de Singapur convierte el GP en el espectáculo visual más impresionante del calendario.",
    },
    {
      name: "Singapore After-Race Concerts",
      category: "oficial",
      venue: "Padang Stage, Marina Bay",
      dateDescription: "Viernes, sábado y domingo noche",
      isFree: true,
      url: "https://www.singaporegp.sg/en/entertainment",
      description:
        "Conciertos de artistas internacionales incluidos con la entrada al GP. Una de las mejores propuestas de entretenimiento del paddock, con actuaciones tras cada jornada.",
    },
    {
      name: "Boat Quay y Clarke Quay Events",
      category: "fan",
      venue: "Boat Quay / Clarke Quay, Singapur",
      dateDescription: "Toda la semana del GP",
      isFree: true,
      url: "https://www.visitsingapore.com",
      description:
        "Los históricos muelles del río Singapur se llenan de terrazas, bares y pantallas con el GP. Ambiente cosmopolita con las mejores vistas del río.",
    },
    {
      name: "Sentosa Island F1 Beach Parties",
      category: "fiesta",
      venue: "Sentosa Island, Singapur",
      dateDescription: "Sábado y domingo",
      priceFrom: 35,
      isFree: false,
      url: "https://www.sentosa.com.sg",
      description:
        "La isla de resort de Singapur organiza beach parties y eventos nocturnos durante el GP con DJs internacionales y ambiente tropical único.",
    },
  ],

  "Las Vegas": [
    {
      name: "Las Vegas Grand Prix Fan Zone",
      category: "oficial",
      venue: "Las Vegas Strip Circuit",
      dateDescription: "Jueves a sábado noche",
      isFree: true,
      url: "https://www.f1lasvegasgp.com",
      description:
        "Zona oficial de fans en el circuito del Strip. El GP nocturno de Las Vegas combina velocidad con el espectáculo de luces de la ciudad que nunca duerme.",
    },
    {
      name: "Sphere F1 Experience",
      category: "cultura",
      venue: "The Sphere, Las Vegas",
      dateDescription: "Durante la semana del GP",
      priceFrom: 199,
      isFree: false,
      url: "https://www.thesphere.com",
      description:
        "El edificio más espectacular de Las Vegas suele acoger experiencias visuales inmersivas especiales durante el fin de semana del GP. Una experiencia única en el mundo.",
    },
    {
      name: "MGM Grand Garden Concerts",
      category: "fiesta",
      venue: "MGM Grand Garden Arena, Las Vegas",
      dateDescription: "Jueves y viernes del GP",
      isFree: false,
      url: "https://www.mgmgrand.com",
      description:
        "El MGM Grand organiza conciertos de artistas de primera línea durante el fin de semana del GP, aprovechando la afluencia masiva de aficionados internacionales.",
    },
    {
      name: "Strip Viewing Parties en Hoteles",
      category: "fan",
      venue: "The Strip, Las Vegas",
      dateDescription: "Noche de la carrera",
      isFree: true,
      url: "https://www.lasvegas.com",
      description:
        "Los hoteles del Strip habilitan terrazas y zonas de viewing para ver pasar los coches por el circuito nocturno. Algunos son gratuitos, otros con consumición mínima.",
    },
    {
      name: "Hakkasan / Omnia Nightclub F1 Weekends",
      category: "fiesta",
      venue: "MGM Grand / Caesars Palace, Las Vegas",
      dateDescription: "Jueves a sábado noche",
      priceFrom: 50,
      isFree: false,
      url: "https://www.hakkasan.com",
      description:
        "Los clubs nocturnos más exclusivos de Las Vegas organizan noches especiales con residencias de DJs de talla mundial durante el fin de semana del Gran Premio.",
    },
  ],

  "Yas Marina": [
    {
      name: "Yasalam After-Race Concerts",
      category: "oficial",
      venue: "Etihad Park, Yas Island",
      dateDescription: "Viernes, sábado y domingo noche",
      isFree: true,
      url: "https://www.yasalam.ae",
      description:
        "El cierre de temporada de F1 incluye conciertos de artistas internacionales cada noche incluidos con la entrada. El colofón perfecto al campeonato del mundo.",
    },
    {
      name: "Yas Island Theme Parks",
      category: "deporte",
      venue: "Yas Island, Abu Dhabi",
      dateDescription: "Durante la semana del GP",
      priceFrom: 75,
      isFree: false,
      url: "https://www.yasisland.ae",
      description:
        "Ferrari World, Warner Bros. World y Yas Waterworld ofrecen descuentos especiales durante el GP. Diversión para todos los públicos en la isla de entretenimiento.",
    },
    {
      name: "F1 Village Yas Marina",
      category: "oficial",
      venue: "Yas Marina Circuit, Abu Dhabi",
      dateDescription: "Jueves a domingo",
      isFree: true,
      url: "https://www.yasmarinacircuit.com",
      description:
        "Village oficial incluido con la entrada al GP de Abu Dhabi, con vistas al impresionante hotel W Yas Island que cruza literalmente sobre el circuito.",
    },
    {
      name: "Lounge y Club Scene en W Yas Island",
      category: "fiesta",
      venue: "W Abu Dhabi – Yas Island",
      dateDescription: "Viernes y sábado noche",
      isFree: false,
      url: "https://www.marriott.com/hotels/travel/auhwh-w-abu-dhabi-yas-island",
      description:
        "El hotel W Yas Island, construido sobre el propio circuito, organiza las fiestas más exclusivas del cierre de temporada con aficionados y personalidades del paddock.",
    },
  ],
};
