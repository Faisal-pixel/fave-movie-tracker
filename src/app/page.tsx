"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Play,
  Square,
} from "lucide-react";
import { show } from "@/types/show.types";
import useFetchShows from "@/hooks/use-fetch-shows.hooks";
import { showArrayParserHelpers } from "@/helpers/show-array-parser.helpers";
import MovieCard from "@/components/movie-card.component";
import HoverPopup from "@/components/hover-popup.components";

type GroupedShows = Record<string, show[]>;

const TVShowTracker = () => {
  // Dummy data for TV show

  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none"); // 'none', 'asc', 'desc'
  const [hoveredShow, setHoveredShow] = useState<null | show>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 100 });
  const [dummyShows, setDummyShows] = useState<show[]>([]);

  const { shows, showLoading } = useFetchShows();
  useEffect(() => {
    (() => {
      const parsed = showArrayParserHelpers(shows);
      setDummyShows(parsed);
    })();
  }, [shows]);

  // Sort shows based on current sort order

  // Group shows alphabetically
  const groupedShows = useMemo(() => {
    const groups: GroupedShows = {};
    dummyShows.forEach((show) => {
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
  }, [dummyShows]);

  const sortedShows = useMemo(() => {
    if (sortOrder === "none") return groupedShows;
    const sorted: Record<string, show[]> = {};
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
  }, [sortOrder, groupedShows]);

  console.log("These are the grouped shows: ", groupedShows);

  const handleSort = () => {
    if (sortOrder === "none") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("none");
    }
  };

  const handleMouseEnter = (
    show: show,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setHoveredShow(show);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredShow(null);
  };

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

  useEffect(() => {
    console.log("These are the grouped shows", groupedShows);
  }, [groupedShows]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      {showLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground">Loading shows..</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {/* Controls */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              {getSortIcon()}
              <span className="font-medium cursor-pointer">
                {sortOrder === "none" && "Sort Alphabetically"}
                {sortOrder === "asc" && "Sorted A-Z"}
                {sortOrder === "desc" && "Sorted Z-A"}
              </span>
            </button>
          </div>

          {/* Grouped Shows */}
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
