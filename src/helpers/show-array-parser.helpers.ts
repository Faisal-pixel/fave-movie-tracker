import { show } from "@/types/show.types";

export function showArrayParserHelpers(shows: any[]) {
  return shows.map(show => ({
    id: show!.id,
    thumbnail: show!.image?.medium || null,
    name: show!.name,
    startYear: show!.premiered,
    rating: show!.rating.average,
    network: show!.network?.name,
    status: show.status
  })) as show[];
}
