"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Star,
  Calendar,
  Tv,
  Play,
  Square,
} from "lucide-react";

const TVShowTracker = () => {
  // Dummy data for TV shows
  const dummyShows = useMemo(() => [
    {
      id: 1,
      name: "Breaking Bad",
      thumbnail:
        "https://images.unsplash.com/photo-1489599884388-e99c3bbdd681?w=300&h=400&fit=crop",
      startYear: 2008,
      rating: 9.5,
      network: "AMC",
      status: "Ended",
    },
    {
      id: 2,
      name: "The Office",
      thumbnail:
        "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=400&fit=crop",
      startYear: 2005,
      rating: 9.0,
      network: "NBC",
      status: "Ended",
    },
    {
      id: 3,
      name: "Stranger Things",
      thumbnail:
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=400&fit=crop",
      startYear: 2016,
      rating: 8.7,
      network: "Netflix",
      status: "Running",
    },
    {
      id: 4,
      name: "Game of Thrones",
      thumbnail:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
      startYear: 2011,
      rating: 9.2,
      network: "HBO",
      status: "Ended",
    },
    {
      id: 5,
      name: "Friends",
      thumbnail:
        "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=400&fit=crop",
      startYear: 1994,
      rating: 8.9,
      network: "NBC",
      status: "Ended",
    },
    {
      id: 6,
      name: "The Crown",
      thumbnail:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      startYear: 2016,
      rating: 8.6,
      network: "Netflix",
      status: "Ended",
    },
    {
      id: 7,
      name: "Better Call Saul",
      thumbnail:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop",
      startYear: 2015,
      rating: 8.8,
      network: "AMC",
      status: "Ended",
    },
    {
      id: 8,
      name: "Westworld",
      thumbnail:
        "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=300&h=400&fit=crop",
      startYear: 2016,
      rating: 8.6,
      network: "HBO",
      status: "Ended",
    },
    {
      id: 9,
      name: "Ozark",
      thumbnail:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=400&fit=crop",
      startYear: 2017,
      rating: 8.4,
      network: "Netflix",
      status: "Ended",
    },
    {
      id: 10,
      name: "House of Cards",
      thumbnail:
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=400&fit=crop",
      startYear: 2013,
      rating: 8.7,
      network: "Netflix",
      status: "Ended",
    },
    {
      id: 11,
      name: "The Mandalorian",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
      startYear: 2019,
      rating: 8.7,
      network: "Disney+",
      status: "Running",
    },
    {
      id: 12,
      name: "Succession",
      thumbnail:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop",
      startYear: 2018,
      rating: 8.8,
      network: "HBO",
      status: "Ended",
    },
  ], []);

  const [sortOrder, setSortOrder] = useState("none"); // 'none', 'asc', 'desc'
  const [hoveredShow, setHoveredShow] = useState<null | (typeof dummyShows)[0]>(
    null
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sort shows based on current sort order
  const sortedShows = useMemo(() => {
    if (sortOrder === "none") return dummyShows;

    const sorted = [...dummyShows].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    return sorted;
  }, [sortOrder, dummyShows]);

  // Group shows alphabetically
  const groupedShows = useMemo(() => {
    const groups: { [key: string]: typeof sortedShows } = {};
    sortedShows.forEach((show) => {
      const firstLetter = show.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(show);
    });
    return Object.keys(groups)
      .sort()
      .reduce((acc, letter) => {
        acc[letter] = groups[letter];
        return acc;
      }, {});
  }, [sortedShows]);

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
    show: (typeof dummyShows)[0],
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
    if (sortOrder === "asc") return <ChevronUp className="w-4 h-4" />;
    if (sortOrder === "desc") return <ChevronDown className="w-4 h-4" />;
    return (
      <div className="w-4 h-4 border border-gray-400 rounded opacity-50"></div>
    );
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
            📺 TV Show Tracker
          </h1>
          <p className="text-gray-300 text-lg">
            Discover and track your favorite TV series
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleSort}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            {getSortIcon()}
            <span className="font-medium">
              {sortOrder === "none" && "Sort Alphabetically"}
              {sortOrder === "asc" && "Sorted A-Z"}
              {sortOrder === "desc" && "Sorted Z-A"}
            </span>
          </button>
        </div>

        {/* Grouped Shows */}
        <div className="space-y-8">
          {Object.entries(groupedShows).map(([letter, shows]) => (
            <div key={letter} className="space-y-4">
              <h2 className="text-3xl font-bold text-white/90 border-b border-white/20 pb-2">
                {letter}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {shows.map((show) => (
                  <div
                    key={show.id}
                    className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onMouseEnter={(e) => handleMouseEnter(show, e)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300">
                      <div className="aspect-[3/4] relative">
                        <img
                          src={show.thumbnail}
                          alt={show.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-4 bg-white/5">
                        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors">
                          {show.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{show.startYear}</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-yellow-400">
                              {show.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hover Popup */}
        {hoveredShow && (
          <div
            className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: mousePosition.x,
              top: mousePosition.y - 20,
            }}
          >
            <div className="bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-2xl max-w-sm animate-in fade-in duration-200">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={hoveredShow.thumbnail}
                    alt={hoveredShow.name}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {hoveredShow.name}
                  </h3>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>Started: {hoveredShow.startYear}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">
                        {hoveredShow.rating}/10
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Tv className="w-4 h-4" />
                      <span>{hoveredShow.network}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusIcon(hoveredShow.status)}
                      <span
                        className={`font-medium ${getStatusColor(
                          hoveredShow.status
                        )}`}
                      >
                        {hoveredShow.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowTracker;
