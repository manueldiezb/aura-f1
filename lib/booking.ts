export function buildBookingUrl(city: string, checkIn: string, checkOut: string): string {
  const params = new URLSearchParams({
    ss: city,
    checkin: checkIn,
    checkout: checkOut,
    group_adults: "2",
    no_rooms: "1",
    aid: "304142",
  });
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

export function gpWeekDates(dateStart: string): { checkIn: string; checkOut: string } {
  const d = new Date(dateStart);
  const thursday = new Date(d);
  thursday.setDate(d.getDate() - ((d.getDay() + 3) % 7));
  const sunday = new Date(thursday);
  sunday.setDate(thursday.getDate() + 4);
  return {
    checkIn: thursday.toISOString().split("T")[0],
    checkOut: sunday.toISOString().split("T")[0],
  };
}
