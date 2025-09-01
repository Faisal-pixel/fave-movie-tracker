import { getBaseUrl } from "../get-base-url.helpers";

export default async function* getShows() {
  for (let page = 0; ; page++) {
    const res = await fetch(`${getBaseUrl()}/shows?page=${page}`);
    if (res.status === 404) break; // means we have gotten to the end of the lists of shows
    if (!res.ok) throw new Error(`TVMaze error ${res.status}`);
    const shows = await res.json();
    if(shows.length === 0) return;
    yield shows;
  }
}
