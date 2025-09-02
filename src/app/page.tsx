"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { ChevronUp, ChevronDown, Play, Square, Heart } from "lucide-react";
import { show } from "@/types/show.types";
import MovieCard from "@/components/movie-card.component";
import HoverPopup from "@/components/hover-popup.components";
import { ShowContext } from "@/contexts/shows.context";
import groupedShowsHelper from "@/helpers/grouped-shows.helpers";
import LoadingState from "@/components/loading-state.components";
import sortedShowsHelpers from "@/helpers/sorted-shows.helpers";
import handleSortHelpers from "@/helpers/handle-sort.helpers";

const TVShowTracker = () => {
  // Dummy data for TV show

  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none"); // 'none', 'asc', 'desc'
  const [hoveredShow, setHoveredShow] = useState<null | show>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 100 });
  const [dummyShows, setDummyShows] = useState<show[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const {
    shows,
    loading: showLoading,
    error,
    searchQuery,
  } = useContext(ShowContext);

  useEffect(() => {
    const favoriteShows = localStorage.getItem("favoriteShows");
    if (favoriteShows) {
      try {
        const parsed = JSON.parse(favoriteShows);
        setFavoriteIds(new Set(Array.isArray(parsed) ? parsed : []));
      } catch (e) {
        console.log("Error parsing favorite shows from localStorage:", e);
        setFavoriteIds(new Set());
        localStorage.setItem("favoriteShows", JSON.stringify([]));
      }
    } else {
      localStorage.setItem("favoriteShows", JSON.stringify([]));
      setFavoriteIds(new Set());
    }
  }, []);

  // const { shows, showLoading } = useFetchShows();
  useEffect(() => {
    setDummyShows(shows);
  }, [shows]);

  const [visibleShows, setVisibleShows] = useState<show[]>([]);

  useEffect(() => {
    if (!searchQuery?.trim()) {
      setVisibleShows(shows);
    }
  }, [shows, searchQuery]);

  const filteredFavorites = React.useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) return dummyShows;
    return dummyShows.filter((show) =>
      show.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dummyShows]);

  // Sort shows based on current sort order

  // Group shows alphabetically

  const groupedShows = groupedShowsHelper(
    filteredFavorites ? filteredFavorites : visibleShows
  );

  const sortedShows = sortedShowsHelpers(sortOrder, groupedShows);

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

  const getSortIcon = () => {
    if (sortOrder === "asc")
      return <ChevronUp className="w-4 h-4 cursor-pointer" />;
    if (sortOrder === "desc") return <ChevronDown className="w-4 h-4" />;
    return "";
  };

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
      } else {
        newFavorites.add(showId);
        localStorage.setItem(
          "favoriteShows",
          JSON.stringify(Array.from(newFavorites))
        );
      }
      return newFavorites;
    });
  };

  if (error) {
    return <div>Error loading shows</div>;
  }

  return (
    <div className="min-h-[500%] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      {showLoading || shows.length === 0 ? (
        <LoadingState>Loading shows...</LoadingState>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {/* Controls */}
          <div className="flex justify-between mb-8">
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

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium">
                {favoriteIds.size} Favorites
              </span>
            </div>
          </div>

          {/* Grouped Shows */}
          {searchQuery && visibleShows.length === 0 ? (
            <div className="text-center text-white/80">
              No shows found for “{searchQuery}”.
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(sortedShows).map(([letter, shows]) => (
                <div key={letter} className="space-y-4">
                  <h2 className="text-3xl font-bold text-white/90 border-b border-white/20 pb-2">
                    {letter}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {shows.map((show) => (
                      <MovieCard
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
          )}

          {/* Hover Popup */}
          {hoveredShow && (
            <HoverPopup
              mousePosition={mousePosition}
              hoveredShow={hoveredShow}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TVShowTracker;
