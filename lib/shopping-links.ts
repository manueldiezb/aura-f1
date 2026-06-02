export interface ShoppingLink {
  store: string;
  url: string;
  emoji: string;
}

const LUXURY_BRANDS = [
  "Gucci",
  "Prada",
  "Louis Vuitton",
  "Dior",
  "Balenciaga",
  "Burberry",
  "Moncler",
  "Stone Island",
  "Off-White",
  "Bottega Veneta",
  "Richard Mille",
  "Patek Philippe",
  "Rolex",
  "Audemars Piguet",
  "Ray-Ban",
  "Tom Ford",
  "Versace",
  "Valentino",
  "Givenchy",
  "Hermès",
];

export function getShoppingLinks(
  type: string,
  brand?: string | null
): ShoppingLink[] {
  const links: ShoppingLink[] = [
    {
      store: "Amazon",
      url: `https://www.amazon.es/s?k=${encodeURIComponent((brand ?? "") + " " + type)}`,
      emoji: "🛒",
    },
    {
      store: "ASOS",
      url: `https://www.asos.com/search/?q=${encodeURIComponent((brand ?? "") + " " + type)}`,
      emoji: "👗",
    },
    {
      store: "Zara",
      url: `https://www.zara.com/es/es/search?searchTerm=${encodeURIComponent(type)}`,
      emoji: "🏪",
    },
  ];

  if (brand) {
    links.push({
      store: "Farfetch",
      url: `https://www.farfetch.com/es/search/?q=${encodeURIComponent(brand ?? type)}`,
      emoji: "✨",
    });
  }

  if (brand && LUXURY_BRANDS.includes(brand)) {
    links.push({
      store: "Net-a-Porter",
      url: `https://www.net-a-porter.com/en-es/search?q=${encodeURIComponent(brand)}`,
      emoji: "💎",
    });
  }

  return links;
}
