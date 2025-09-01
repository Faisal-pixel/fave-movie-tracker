import getShows from "./generators/get-shows.generators";

export default async function getNextPageOfShows() {
  const gen = getShows();
  const response = await gen.next();
  if (response.done) return;
  const shows = response.value;
  return shows;
}
