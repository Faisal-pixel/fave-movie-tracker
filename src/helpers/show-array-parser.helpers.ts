import { show } from "@/types/show.types";

type showsFromAPI = {
  id: number;
  image: { medium: string | null };
  name: string;
  premiered: string;
  rating: { average: number | null };
  network: { name: string | null };
  status: string;
  externals: {tvrage: number, thetvdb: number}
}[];

export function showArrayParserHelpers(shows: showsFromAPI) {
  return shows.map(show => ({
    id: show!.id,
    thumbnail: show!.image?.medium || null,
    name: show!.name,
    startYear: show!.premiered,
    rating: show!.rating.average,
    network: show!.network?.name,
    status: show.status,
    tvrage: show.externals.tvrage
  })) as show[];
}
