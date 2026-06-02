export interface CityGuide {
  description: string;
  highlights: string[];
  tips: string[];
  timezone: string;
}

const cityGuides: Record<string, CityGuide> = {
  BH: {
    description:
      "Bahréin es una isla-estado del Golfo Pérsico que alberga el primer Gran Premio nocturno de la historia. El Circuito Internacional de Bahréin, en Sakhir, ofrece una experiencia única con sus carreras bajo los focos en el desierto. La capital Manama combina modernidad y tradición islámica, con un zoco histórico declarado Patrimonio de la Humanidad por la UNESCO. La hospitalidad bahreiní y su animada vida nocturna hacen del fin de semana del GP una experiencia memorable.",
    highlights: [
      "Circuito Internacional de Bahréin en Sakhir",
      "Zoco de Manama (Ciudad Vieja, Patrimonio UNESCO)",
      "Mezquita Al-Fateh, una de las más grandes del mundo",
      "Bahrain World Trade Center con turbinas eólicas integradas",
      "Árbol de la Vida, misterioso árbol en medio del desierto",
    ],
    tips: [
      "Transporte: taxis y Uber son la mejor opción; el aeropuerto está a 30 min del circuito.",
      "Clima: marzo es cálido (~25°C de día, 18°C de noche); lleva una capa ligera para las noches.",
      "Moneda: Dinar de Bahréin (BHD); las tarjetas de crédito se aceptan ampliamente.",
    ],
    timezone: "Asia/Bahrain",
  },
  AU: {
    description:
      "Melbourne es una de las ciudades más vibrantes de Australia y abre la temporada de Fórmula 1 cada año en el hermoso parque Albert Park. La ciudad es famosa por su escena gastronómica, su arte callejero en Hosier Lane y sus barrios con personalidad propia como Fitzroy y St Kilda. El ambiente del GP de Australia es festivo y desenfadado, con un público apasionado que convierte el lago artificial alrededor del circuito en una celebración deportiva única.",
    highlights: [
      "Circuito de Albert Park junto al lago artificial",
      "Hosier Lane, icónico callejón de arte urbano",
      "Queen Victoria Market, mercado histórico del siglo XIX",
      "Federation Square, hub cultural en el corazón de la ciudad",
      "St Kilda Beach y el Luna Park histórico",
    ],
    tips: [
      "Transporte: el tranvía gratuito de Melbourne cubre el CBD; usa Uber o taxi para Albert Park.",
      "Clima: marzo en Melbourne es impredecible ('cuatro estaciones en un día'); lleva capas.",
      "Moneda: Dólar australiano (AUD); tarjetas y pagos sin contacto aceptados en todas partes.",
    ],
    timezone: "Australia/Melbourne",
  },
  CN: {
    description:
      "Shanghái es la metrópoli más cosmopolita de China y sede del Gran Premio de China en el Circuito Internacional de Shanghái. La ciudad combina el skyline futurista de Pudong con el encanto colonial del Bund y la cultura tradicional del barrio antiguo de Yuyuan. Los fans de F1 pueden explorar mercados locales, probar la gastronomía shanghainesa y vivir la intensidad de una de las ciudades más dinámicas del mundo entre sesiones de pista.",
    highlights: [
      "Circuito Internacional de Shanghái en Jiading",
      "El Bund, paseo histórico con vistas al skyline de Pudong",
      "Torre de TV Oriental Pearl y Shanghai Tower",
      "Jardines y Bazar de Yuyuan en el casco antiguo",
      "Barrio de las Concesiones Francesas con cafés y boutiques",
    ],
    tips: [
      "Transporte: el Maglev conecta el aeropuerto con la ciudad en 8 minutos; metro eficiente para el circuito.",
      "Clima: abril es fresco (~15°C); posibles lluvias, lleva impermeable.",
      "Moneda: Yuan Renminbi (CNY); usa WeChat Pay o Alipay pues el efectivo es poco habitual.",
    ],
    timezone: "Asia/Shanghai",
  },
  JP: {
    description:
      "Suzuka es una ciudad de la prefectura de Mie que alberga uno de los circuitos más queridos del calendario de F1, famoso por su trazado en figura de ocho y sus curvas de alta velocidad. El Gran Premio de Japón reúne a los fans más apasionados del mundo, que llenan las gradas con pancartas y ánimo incansable. Osaka y Nagoya están a menos de una hora en tren, permitiendo combinar el GP con la exploración de templos, santuarios y la excelente gastronomía japonesa.",
    highlights: [
      "Circuito de Suzuka, icónico trazado en figura de ocho",
      "Parque Suzuka Circuit y el circuito de karting adyacente",
      "Castillo de Nagoya y el distrito histórico de Sakae",
      "Dotonbori en Osaka, epicentro gastronómico y cultural",
      "Santuario de Ise-Jingu, uno de los más sagrados de Japón",
    ],
    tips: [
      "Transporte: tren Kintetsu desde Nagoya o Osaka hasta Shiroko (15 min andando al circuito).",
      "Clima: septiembre/octubre es cálido y húmedo (~25°C); lleva ropa ligera y chubasquero.",
      "Moneda: Yen japonés (JPY); el efectivo sigue siendo importante en muchos establecimientos.",
    ],
    timezone: "Asia/Tokyo",
  },
  SA: {
    description:
      "Yeda (Jeddah) es la puerta de entrada de Arabia Saudí al Mar Rojo y sede de uno de los circuitos urbanos más rápidos del mundo. La ciudad histórica de Al-Balad, con sus torres de coral y machiyas, convive con centros comerciales de lujo y restaurantes de cocina internacional. El Gran Premio de Arabia Saudí ilumina la corniche de Jeddah con una espectacular carrera nocturna, y la cultura de hospitalidad saudí hace sentir bienvenidos a todos los visitantes.",
    highlights: [
      "Circuito Urbano de Corniche, a orillas del Mar Rojo",
      "Al-Balad, casco histórico Patrimonio UNESCO",
      "Fuente Rey Fahd, una de las más altas del mundo",
      "Complejo Al-Shallal de entretenimiento y ocio",
      "Zoco Al-Alawi para artesanía y especias",
    ],
    tips: [
      "Transporte: taxis y Uber funcionan bien; la corniche está a 20 min del aeropuerto.",
      "Clima: marzo es caluroso (~30°C); las noches de carrera son más frescas (~22°C).",
      "Moneda: Riyal saudí (SAR); tarjetas aceptadas ampliamente; respeta el código de vestimenta.",
    ],
    timezone: "Asia/Riyadh",
  },
  MC: {
    description:
      "Mónaco es el más pequeño y glamuroso GP del calendario, donde los Fórmula 1 rugen por las calles del Principado a centímetros de las barreras. Las curvas de Sainte-Devote, el túnel y el puerto con sus yates de lujo forman el trazado más icónico del deporte. Fuera de la pista, el Casino de Montecarlo, el Palacio del Príncipe y el Jardín Exótico ofrecen una experiencia de lujo sin igual en el corazón de la Riviera francesa.",
    highlights: [
      "Circuito de Mónaco, el más famoso del mundo",
      "Casino de Montecarlo y Place du Casino",
      "Puerto de Hércules repleto de superyates durante el GP",
      "Palacio del Príncipe en la Roca de Mónaco",
      "Jardín Exótico con vistas panorámicas al Mediterráneo",
    ],
    tips: [
      "Transporte: el principado es pequeño y caminable; el tren desde Niza (20 min) es la mejor opción.",
      "Clima: mayo es suave y soleado (~22°C); las tardes pueden refrescar junto al mar.",
      "Moneda: Euro (EUR); es muy caro, reserva con mucha antelación alojamiento en Niza o Cannes.",
    ],
    timezone: "Europe/Monaco",
  },
  ES: {
    description:
      "Barcelona es una de las ciudades más vibrantes de Europa y acoge el Gran Premio de España en el Circuit de Barcelona-Catalunya en Montmeló. La capital catalana combina la arquitectura modernista de Gaudí, las playas urbanas y una escena gastronómica excepcional. El clima mediterráneo, el ambiente festivo y la pasión deportiva de los catalanes hacen del GP de España uno de los más disfrutables para los fans que viajan desde todo el mundo.",
    highlights: [
      "Circuit de Barcelona-Catalunya en Montmeló",
      "La Sagrada Família, obra maestra de Gaudí",
      "Las Ramblas y el Barrio Gótico histórico",
      "Park Güell con vistas panorámicas de la ciudad",
      "Barceloneta, playa urbana junto al Puerto Olímpico",
    ],
    tips: [
      "Transporte: cercanías R2 Nord desde Passeig de Gràcia hasta Montmeló (30 min) durante el GP.",
      "Clima: mayo es cálido y soleado (~22°C); ideal para días en el circuito con ropa ligera.",
      "Moneda: Euro (EUR); las tapas y menús del día son la mejor relación calidad-precio.",
    ],
    timezone: "Europe/Madrid",
  },
  CA: {
    description:
      "Montreal es la metrópoli francófona de Canadá y sede del Gran Premio de Canadá en el Circuito Gilles Villeneuve, construido sobre la Isla Notre-Dame. La ciudad combina la arquitectura europea del barrio histórico de Old Montreal con una escena cultural y gastronómica de primer nivel. El GP de Canadá es famoso por su ambiente festivo, sus fans entusiastas y la posibilidad de explorar una ciudad extraordinaria a pocos metros del circuito.",
    highlights: [
      "Circuito Gilles Villeneuve en la Isla Notre-Dame",
      "Old Montreal (Vieux-Montréal) con arquitectura del siglo XVII",
      "Mont Royal, el parque natural en el corazón de la ciudad",
      "Mercado Jean-Talon, el mayor mercado al aire libre de Norteamérica",
      "Parque Jean-Drapeau y el Pabellón Biosphere",
    ],
    tips: [
      "Transporte: metro línea amarilla hasta Jean-Drapeau; en GP week hay lanzaderas especiales.",
      "Clima: junio es agradable (~24°C); lluvia posible, lleva impermeable.",
      "Moneda: Dólar canadiense (CAD); propina del 15-20% es habitual en restaurantes.",
    ],
    timezone: "America/Toronto",
  },
  AT: {
    description:
      "El Red Bull Ring en Spielberg es uno de los circuitos más espectaculares del calendario, enclavado entre las verdes colinas de Estiria, Austria. El Gran Premio de Austria combina la belleza alpina con la velocidad extrema del trazado, y los fans suelen acampar en el circuito durante todo el fin de semana creando un ambiente único. La región de Estiria ofrece pueblos medievales, gastronomía local y naturaleza de montaña para explorar entre sesiones.",
    highlights: [
      "Red Bull Ring en las colinas de Spielberg",
      "Schloss Leopoldskron y castillos medievales de la región",
      "Bruck an der Mur, ciudad histórica medieval cercana",
      "Senderismo y ciclismo en las colinas de Estiria",
      "Leoben, ciudad universitaria con mercados locales",
    ],
    tips: [
      "Transporte: lanzaderas desde Leoben y Knittelfeld; muchos fans acampan en el recinto.",
      "Clima: julio es cálido (~27°C) pero las tormentas de tarde son frecuentes en zona alpina.",
      "Moneda: Euro (EUR); lleva efectivo para los puestos locales y campings.",
    ],
    timezone: "Europe/Vienna",
  },
  GB: {
    description:
      "Silverstone es el corazón del automovilismo británico y uno de los circuitos con más historia del mundo, sede del primer Gran Premio del Campeonato del Mundo en 1950. El GP de Gran Bretaña es célebre por su público ferviente, el ambiente festivo que se instala en el recinto días antes y las curvas de alta velocidad como Copse o Maggots-Becketts. Los alrededores de Northamptonshire ofrecen pueblos de piedra caliza y pubs históricos para disfrutar entre sesiones.",
    highlights: [
      "Circuito de Silverstone, cuna del automovilismo mundial",
      "Northampton, ciudad histórica con el Museo de Zapatos",
      "Castillo de Rockingham y Corby en los alrededores",
      "Pueblos Cotswolds de piedra caliza dorada, a 1 hora",
      "Warwick Castle, castillo medieval espectacularmente preservado",
    ],
    tips: [
      "Transporte: lanzaderas desde Northampton y Milton Keynes; trenes desde Londres a Northampton.",
      "Clima: julio puede ser soleado o lluvioso (~20°C); imprescindible llevar chubasquero.",
      "Moneda: Libra esterlina (GBP); reserva alojamiento con meses de antelación, se agota rápido.",
    ],
    timezone: "Europe/London",
  },
  HU: {
    description:
      "Budapest es una de las capitales más bellas de Europa Central, donde el Hungaroring acoge el Gran Premio de Hungría en un circuito sinuoso entre colinas. La ciudad del Danubio combina la grandiosidad del Parlamento, los baños termales históricos y los barrios de fiesta del Distrito VII con una gastronomía húngara excepcional. El GP de Hungría tiene fama de carrera táctica y el calor del verano hace que las gradas del Hungaroring vibren con una energía especial.",
    highlights: [
      "Hungaroring en Mogyoród, a 20 km de Budapest",
      "Parlamento de Budapest, icono orillas del Danubio",
      "Baños Széchenyi y Gellért, los más famosos de la ciudad",
      "Barrio del Castillo de Buda con vistas panorámicas",
      "Calle Kazinczy y el Distrito de la Fiesta (Ruin Bars)",
    ],
    tips: [
      "Transporte: autobús 361 desde Budapest-Örs vezér tere hasta el Hungaroring en 30 min.",
      "Clima: julio es muy caluroso (~32°C); lleva protector solar, gorra y mucha agua.",
      "Moneda: Forinto húngaro (HUF); cambia dinero, muchos sitios no aceptan tarjeta.",
    ],
    timezone: "Europe/Budapest",
  },
  BE: {
    description:
      "Spa-Francorchamps es el circuito favorito de pilotos y fans, con su mítica Eau Rouge, el bosque de las Ardenas envolviendo la pista y el clima más impredecible del calendario. El Gran Premio de Bélgica combina la emoción de uno de los trazados más exigentes del mundo con la posibilidad de explorar la región de las Ardenas, famosa por su cerveza artesana, sus quesos y sus castillos medievales. Bruselas, Lieja y Namur están a menos de una hora del circuito.",
    highlights: [
      "Circuito de Spa-Francorchamps, el favorito de los pilotos",
      "Eau Rouge y Raidillon, las curvas más famosas del mundo",
      "La ciudad balneario de Spa y sus aguas termales",
      "Castillo de Bouillon en las profundidades de las Ardenas",
      "Dinant, ciudad fluvial cuna de Adolphe Sax",
    ],
    tips: [
      "Transporte: lanzaderas desde Lieja; muchos fans acampan en el circuito para aprovechar todo el ambiente.",
      "Clima: agosto en Spa es impredecible; puede hacer sol y llover en la misma vuelta. Impermeable obligatorio.",
      "Moneda: Euro (EUR); prueba la cerveza Trappiste local y los gofres de Lieja.",
    ],
    timezone: "Europe/Brussels",
  },
  NL: {
    description:
      "Zandvoort es una ciudad costera holandesa que recuperó su Gran Premio en 2021 con el apoyo de una marea naranja de fans locales que convierte el circuito en un festival de color. El Circuit Zandvoort, entre dunas de arena a orillas del Mar del Norte, es técnico y rápido con banqueos espectaculares en sus nuevas curvas peraltadas. Ámsterdam, a 30 minutos en tren, ofrece canales, museos de clase mundial y una vida nocturna vibrante para completar el fin de semana.",
    highlights: [
      "Circuit Zandvoort entre dunas y el Mar del Norte",
      "Playa de Zandvoort, perfecta para el descanso entre sesiones",
      "Rijksmuseum y Museo Van Gogh en Ámsterdam",
      "Canales históricos de Ámsterdam, Patrimonio UNESCO",
      "Keukenhof, el mayor jardín de flores del mundo (temporada de tulipanes)",
    ],
    tips: [
      "Transporte: tren desde Ámsterdam Centraal hasta Zandvoort aan Zee (30 min), directo al circuito.",
      "Clima: agosto puede ser fresco y ventoso (~20°C) junto al mar; lleva capas.",
      "Moneda: Euro (EUR); alquila una bici en Ámsterdam para moverte por la ciudad.",
    ],
    timezone: "Europe/Amsterdam",
  },
  IT: {
    description:
      "Monza es el Templo de la Velocidad, el circuito más rápido del calendario y sede del Gran Premio de Italia, uno de los más antiguos e históricos de toda la F1. El Autodromo Nazionale di Monza, dentro de un parque real del siglo XVIII, combina rectas larguísimas con la histórica variante de la chicana. Milán, a 15 km, es la capital de la moda mundial, con la Catedral del Duomo, la Última Cena de Leonardo y una vida nocturna extraordinaria.",
    highlights: [
      "Autodromo Nazionale di Monza, el Templo de la Velocidad",
      "Parque Real de Monza, bosque histórico del siglo XVIII",
      "Catedral de Milán (Duomo) y la Galleria Vittorio Emanuele II",
      "La Última Cena de Da Vinci en Santa Maria delle Grazie",
      "Navigli, los canales milaneses con bares y restaurantes",
    ],
    tips: [
      "Transporte: tren regional desde Milán Centrale o Garibaldi hasta Monza (15 min).",
      "Clima: septiembre es cálido y soleado (~25°C); ideal para el fan que viene de fuera.",
      "Moneda: Euro (EUR); la Lombardía es cara; busca osterias locales para comer bien y barato.",
    ],
    timezone: "Europe/Rome",
  },
  AZ: {
    description:
      "Bakú es una ciudad de contrastes fascinantes donde el casco histórico medieval convive con la arquitectura avant-garde del siglo XXI a orillas del Mar Caspio. El Gran Premio de Azerbaiyán discurre por las calles de la capital en uno de los circuitos urbanos más rápidos y espectaculares del mundo, con la recta de Neftchilar y el paso por la Ciudad Amurallada. La generosa hospitalidad azerbaiyana, la gastronomía del Cáucaso y la arquitectura única hacen de Bakú un destino imprescindible.",
    highlights: [
      "Circuito Urbano de Bakú a orillas del Caspio",
      "Ciudad Amurallada (Icheri Sheher), Patrimonio UNESCO",
      "Torre de la Doncella, símbolo medieval de Bakú",
      "Llamas del Fuego (Flame Towers), el skyline moderno de la ciudad",
      "Avenida Neftchilar y el Boulevard del Caspio",
    ],
    tips: [
      "Transporte: el metro de Bakú es barato y eficiente; Uber funciona bien en toda la ciudad.",
      "Clima: abril-mayo es agradable (~20°C); el viento del Caspio puede ser intenso.",
      "Moneda: Manat azerbaiyano (AZN); cambia dinero al llegar, el efectivo es habitual.",
    ],
    timezone: "Asia/Baku",
  },
  SG: {
    description:
      "Singapur es una de las ciudades-estado más modernas y eficientes del mundo, y su Gran Premio nocturno por las calles del distrito Marina Bay es uno de los espectáculos más impresionantes del deporte mundial. El circuito iluminado con el skyline de Singapur, el puente de Anderson y el Marina Bay Sands de fondo crean imágenes icónicas. La diversidad cultural de Singapur se refleja en sus barrios temáticos — Chinatown, Little India, Kampong Glam — y en una oferta gastronómica excepcional.",
    highlights: [
      "Circuito Urbano de Marina Bay bajo los focos nocturnos",
      "Marina Bay Sands con la piscina infinita en el tejado",
      "Gardens by the Bay con los Supertrees iluminados",
      "Chinatown, Little India y Kampong Glam",
      "Hawker Centre de Maxwell, templo del street food local",
    ],
    tips: [
      "Transporte: el MRT es el mejor transporte; Bayfront Station está en el corazón del circuito.",
      "Clima: septiembre es caluroso y húmedo (~30°C) con lluvias ocasionales; lleva ropa ligera.",
      "Moneda: Dólar de Singapur (SGD); ciudad cara pero el hawker food es barato y delicioso.",
    ],
    timezone: "Asia/Singapore",
  },
  US: {
    description:
      "Austin, Texas es la capital de la música en vivo del mundo y sede del Gran Premio de los Estados Unidos en el Circuit of the Americas, el primer circuito diseñado específicamente para F1 en Norteamérica. El COTA tiene un trazado técnico con la impresionante curva 1 en cuesta como elemento definitorio. La ciudad de Austin combina su ambiente festivo del 6th Street, la gastronomía tex-mex y una escena musical legendaria que hace de este GP uno de los más animados del año.",
    highlights: [
      "Circuit of the Americas (COTA), primer circuito de F1 en EE.UU.",
      "6th Street, epicentro de la música en vivo de Austin",
      "South Congress Avenue con boutiques y restaurantes únicos",
      "Barton Springs Pool, piscina natural en el corazón de la ciudad",
      "Texas State Capitol, el edificio del capitolio más grande de EE.UU.",
    ],
    tips: [
      "Transporte: alquiler de coche recomendado; lanzaderas del downtown al COTA durante el GP.",
      "Clima: octubre en Austin es agradable (~26°C); posibles tormentas; lleva capas.",
      "Moneda: Dólar estadounidense (USD); propina del 18-20% obligatoria en restaurantes.",
    ],
    timezone: "America/Chicago",
  },
  MX: {
    description:
      "Ciudad de México es una de las megaciudades más vibrantes del mundo y el Autódromo Hermanos Rodríguez, en el parque Foro Sol, acoge uno de los GPs con más ambiente de todo el calendario. La altitud de 2.240 metros sobre el nivel del mar pone a prueba a los motores y a los pilotos, mientras la pasión del público mexicano llena las gradas con mariachis, colores y fiesta. La riqueza cultural, gastronómica y arqueológica de México DF hace de este viaje una experiencia única.",
    highlights: [
      "Autódromo Hermanos Rodríguez en el Parque Foro Sol",
      "Zócalo y Centro Histórico, Patrimonio UNESCO",
      "Museo Nacional de Antropología con la Piedra del Sol",
      "Xochimilco, canales de la época azteca en trajinera",
      "Coyoacán, barrio bohemio con la Casa Azul de Frida Kahlo",
    ],
    tips: [
      "Transporte: metro Línea 9 hasta Ciudad Deportiva, a pocos minutos del autódromo.",
      "Clima: octubre es fresco y con riesgo de lluvia (~19°C); lleva impermeable.",
      "Moneda: Peso mexicano (MXN); evita el agua del grifo; come en mercados locales para lo auténtico.",
    ],
    timezone: "America/Mexico_City",
  },
  BR: {
    description:
      "São Paulo es la mayor metrópoli de América Latina y el Autódromo José Carlos Pace en Interlagos es uno de los circuitos más queridos del calendario por su ambiente eléctrico y sus carreras emocionantes. El público brasileño es legendario por su pasión desbordante, especialmente desde los tiempos de Senna y Piquet. São Paulo combina museos de arte de primer nivel, una gastronomía diversísima y una vida cultural nocturna intensa que hace de la semana del GP una fiesta continua.",
    highlights: [
      "Autódromo José Carlos Pace en Interlagos",
      "MASP, Museo de Arte de São Paulo sobre la Avenida Paulista",
      "Ibirapuera, el Central Park paulistano",
      "Vila Madalena con murales y la Escadaria do Graffiti",
      "Mercado Municipal da Cantareira y las mortadelas gigantes",
    ],
    tips: [
      "Transporte: usa apps de taxi como 99 o Uber; evita el transporte público por seguridad.",
      "Clima: noviembre es lluvioso y caluroso (~28°C); lleva chubasquero y protector solar.",
      "Moneda: Real brasileño (BRL); monedero separado con poco efectivo para la calle.",
    ],
    timezone: "America/Sao_Paulo",
  },
  LV: {
    description:
      "Las Vegas es el destino de entretenimiento por antonomasia y el Gran Premio de Las Vegas hace desfilar a los Fórmula 1 por el Strip bajo las luces de neón en una carrera nocturna de espectáculo sin precedentes. La pista pasa frente a los casinos más famosos del mundo — Bellagio, Caesar's Palace, MGM Grand — convirtiendo cada vuelta en una imagen de película. Más allá del circuito, Las Vegas ofrece los mejores espectáculos del mundo, restaurantes de chefs con estrella Michelin y una energía 24/7 única en el planeta.",
    highlights: [
      "Circuito Urbano de Las Vegas por el Strip nocturno",
      "Bellagio, con la fuente musical más grande del mundo",
      "High Roller, la noria más grande del mundo en el LINQ",
      "Fremont Street Experience en el Old Las Vegas",
      "Grand Canyon, accesible en viaje de un día desde Las Vegas",
    ],
    tips: [
      "Transporte: el Strip es largo para caminar; usa el monorraíl o taxis entre casinos.",
      "Clima: noviembre en Las Vegas es fresco de noche (~10°C); lleva chaqueta para la carrera.",
      "Moneda: Dólar estadounidense (USD); los casinos tienen cajeros pero con comisiones altas.",
    ],
    timezone: "America/Los_Angeles",
  },
  QA: {
    description:
      "Doha es la capital de Qatar, un emirato que en pocos años ha pasado de ser un pequeño estado del Golfo a ser uno de los países más ricos e influyentes del mundo. El Circuito Internacional de Losail, que también acoge el MotoGP, es un trazado nocturno técnico y rápido. Qatar combina la modernidad del skyline de West Bay con la tradición del Zoco Waqif y el Museo Nacional diseñado por Jean Nouvel. La cocina qatarí mezcla influencias árabes, persas e indias.",
    highlights: [
      "Circuito Internacional de Losail, trazado nocturno",
      "Museo Nacional de Qatar, diseño icónico de Jean Nouvel",
      "Zoco Waqif, mercado tradicional en el corazón de Doha",
      "Corniche de Doha con vistas al skyline de West Bay",
      "Katara, el Distrito Cultural a orillas del Golfo",
    ],
    tips: [
      "Transporte: el Metro de Doha (Línea Roja) llega al circuito; taxis y Careem también disponibles.",
      "Clima: noviembre es caluroso (~30°C de día, 22°C de noche); baja humedad respecto al verano.",
      "Moneda: Riyal qatarí (QAR); respeta el código de vestimenta en lugares públicos y mezquitas.",
    ],
    timezone: "Asia/Qatar",
  },
  AE: {
    description:
      "Abu Dhabi es la capital de los Emiratos Árabes Unidos y sede del Gran Premio que cierra la temporada de F1 en el Circuito de Yas Marina, donde el sol se pone sobre el Golfo Pérsico al inicio de la carrera. El trazado rodea el hotel Yas Viceroy y pasa por un túnel bajo el agua, creando imágenes únicas. La isla de Yas concentra parques temáticos de clase mundial, mientras el centro de Abu Dhabi ofrece la mezquita Sheikh Zayed y los museos del distrito de Saadiyat.",
    highlights: [
      "Circuito de Yas Marina, colofón de la temporada de F1",
      "Mezquita Sheikh Zayed, la más grande y bella de los EAU",
      "Louvre Abu Dhabi en la isla cultural de Saadiyat",
      "Ferrari World Abu Dhabi, el mayor parque temático cubierto",
      "Corniche de Abu Dhabi con playas urbanas y paseos",
    ],
    tips: [
      "Transporte: taxi y Uber son la norma; hay lanzaderas oficiales del GP desde el centro.",
      "Clima: noviembre es cálido y perfecto (~28°C); uno de los mejores momentos del año.",
      "Moneda: Dírham de los EAU (AED); ciudad cara pero segura y con excelente infraestructura.",
    ],
    timezone: "Asia/Dubai",
  },
};

export default cityGuides;
