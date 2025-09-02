import { GroupedShows } from "@/types/grouped-shows.types";

const sortedShowsHelpers = (
  sortOrder: "none" | "asc" | "desc",
  groupedShows: GroupedShows
) => {
  if (sortOrder === "none") return groupedShows;
  const sorted: GroupedShows = {};
  if (sortOrder === "asc") {
    Object.keys(groupedShows)
      .sort()
      .forEach((key) => {
        sorted[key] = groupedShows[key];
      });
  } else {
    Object.keys(groupedShows)
      .reverse()
      .forEach((key) => {
        sorted[key] = groupedShows[key];
      });
  }

  return sorted;
};

export default sortedShowsHelpers;
