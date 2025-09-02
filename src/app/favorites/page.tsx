"use client";
import HoverPopup from "@/components/hover-popup.components";
import MovieCardComponent from "@/components/movie-card.component";
import { ShowContext } from "@/contexts/shows.context";
import groupedShowsHelper from "@/helpers/grouped-shows.helpers";
import handleSortHelpers from "@/helpers/handle-sort.helpers";
import sortedShowsHelpers from "@/helpers/sorted-shows.helpers";
import { show } from "@/types/show.types";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Play,
  Square,
  Trash2,
} from "lucide-react";
import React, { useCallback, useContext, useEffect, useState } from "react";

const Page = () => {
  // Clear favorites handler
  const handleClearFavorites = () => {
    setFavoriteIds(new Set());
    setFavorites([]);
    localStorage.setItem("favoriteShows", JSON.stringify([]));
  };
  const { shows, searchQuery } = useContext(ShowContext);
  const [favorites, setFavorites] = useState<show[]>([]);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none"); // 'none', 'asc', 'desc'
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  const [hoveredShow, setHoveredShow] = useState<null | show>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 100 });

  useEffect(() => {
    const favoriteShowIds = localStorage.getItem("favoriteShows");
    const parsedFavoriteShowIds = JSON.parse(favoriteShowIds || "[]");
    setFavoriteIds(new Set(parsedFavoriteShowIds));
    const favoriteShows = shows.filter((show) =>
      parsedFavoriteShowIds.includes(show.id)
    );
    setFavorites(favoriteShows);
  }, [shows]);

  // Filter favorites by searchQuery from context
  const filteredFavorites = React.useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) return favorites;
    return favorites.filter((show) =>
      show.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [favorites, searchQuery]);

  const groupedFavorites = groupedShowsHelper(filteredFavorites);
  const sortedFavorites = sortedShowsHelpers(sortOrder, groupedFavorites);

  const getSortIcon = () => {
    if (sortOrder === "asc")
      return <ChevronUp className="w-4 h-4 cursor-pointer" />;
    if (sortOrder === "desc") return <ChevronDown className="w-4 h-4" />;
    return "";
  };

  const handleMouseEnter = useCallback(
    (show: show, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setHoveredShow(show);
      setMousePosition({ x: event.clientX, y: event.clientY });
    },
    []
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = useCallback(() => {
    setHoveredShow(null);
  }, []);

  const getStatusIcon = (status: string) => {
    return status === "Running" ? (
      <Play className="w-4 h-4 text-green-500" />
    ) : (
      <Square className="w-4 h-4 text-red-500" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "Running" ? "text-green-600" : "text-red-600";
  };

  const toggleFavorite = (showId: number) => {
    setFavoriteIds((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(showId)) {
        newFavorites.delete(showId);
        localStorage.setItem(
          "favoriteShows",
          JSON.stringify(Array.from(newFavorites))
        );
        setFavorites((prev) => prev.filter((show) => show.id !== showId));
      } else {
        newFavorites.add(showId);
        localStorage.setItem(
          "favoriteShows",
          JSON.stringify(Array.from(newFavorites))
        );
        setFavorites((prev) => [
          ...prev,
          shows.find((show) => show.id === showId)!,
        ]);
      }
      return newFavorites;
    });
  };
  return (
    <div>
      <h1 className="text-2xl mb-8 sm:text-3xl font-bold text-center sm:text-left">
        Here are a list of your favorite TV shows.
      </h1>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Controls */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between mb-8">
          <button
            onClick={() => {
              handleSortHelpers(sortOrder, setSortOrder);
            }}
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            {getSortIcon()}
            <span className="text-sm sm:text-base sm:font-medium cursor-pointer">
              {sortOrder === "none" && "Sort Alphabetically"}
              {sortOrder === "asc" && "Sorted A-Z"}
              {sortOrder === "desc" && "Sorted Z-A"}
            </span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex flex-nowrap text-nowrap items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium">
                {favoriteIds.size} Favorites
              </span>
            </div>

            <button
              onClick={handleClearFavorites}
              className="flex flex-nowrap text-nowrap items-center cursor-pointer gap-2 px-3 py-2 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-full text-red-200 hover:bg-red-500/30 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Clear Favorites</span>
            </button>
          </div>
        </div>

        {/* Grouped Shows */}
        <div className="space-y-8">
          {Object.entries(sortedFavorites).map(([letter, shows]) => (
            <div key={letter} className="space-y-4">
              <h2 className="text-3xl font-bold text-white/90 border-b border-white/20 pb-2">
                {letter}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {shows.map((show) => (
                  <MovieCardComponent
                    key={show.id}
                    favoriteIds={favoriteIds}
                    toggleFavorite={toggleFavorite}
                    show={show}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseMove={handleMouseMove}
                    handleMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hover Popup */}
        {hoveredShow && favoriteIds.has(hoveredShow.id as number) && (
          <HoverPopup
            mousePosition={mousePosition}
            hoveredShow={hoveredShow}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
