"use client";
import { ShowContext } from "@/contexts/shows.context";
import { Heart, Home, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const NavComponents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setSearchQuery: contextSetSearchQuery } = useContext(ShowContext);
  useEffect(() => {
    contextSetSearchQuery(searchQuery);
  }, [searchQuery, contextSetSearchQuery]);

  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-center sm:text-left">
          📺 TV Tracker
        </h1>
        <div className="flex flex-row justify-center sm:justify-start gap-2 w-full sm:w-auto">
          <button
            onClick={() => router.push("/")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
              pathname === "/"
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="font-medium text-sm sm:text-base">Home</span>
          </button>
          <button
            onClick={() => router.push("/favorites")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
              pathname === "/favorites"
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="font-medium text-sm sm:text-base">Favorites</span>
          </button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="relative mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex items-center w-full">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search shows..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-10 pr-10 py-2 w-full sm:w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 p-1 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavComponents;
