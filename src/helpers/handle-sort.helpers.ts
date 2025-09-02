const handleSortHelpers = (sortOrder: "none" | "asc" | "desc", setSortOrder: React.Dispatch<React.SetStateAction<"none" | "asc" | "desc">>) => {
    if (sortOrder === "none") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("none");
    }
  };

  export default handleSortHelpers;
