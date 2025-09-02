import { GroupedShows } from "@/types/grouped-shows.types";
import { show } from "@/types/show.types";

/**
 * Groups TV shows by their first letter.
 * @param shows - Array of TV shows to group.
 * @returns An object where each key is a letter and the value is an array of shows.
 */

const groupedShowsHelper = (shows: show[]) => {
  const groups: GroupedShows = {};
  shows.forEach((show) => {
    const firstLetter = show.name!.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(show);
  });
  return Object.keys(groups)
    .sort()
    .reduce<GroupedShows>((acc, letter) => {
      acc[letter] = groups[letter];
      return acc;
    }, {});
};

export default groupedShowsHelper;
