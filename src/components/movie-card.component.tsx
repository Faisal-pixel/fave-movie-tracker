import { show } from "@/types/show.types";
import { Calendar, Heart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  show: show;
  handleMouseLeave: () => void;
  handleMouseMove: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleMouseEnter: (
    show: Props["show"],
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  favoriteIds: Set<number>;
  toggleFavorite: (showId: number) => void;
};

const MovieCard = (props: Props) => {
  const {
    show,
    handleMouseLeave,
    handleMouseMove,
    handleMouseEnter,
    favoriteIds,
    toggleFavorite
  } = props;
  return (
    <div
      className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={(e) => handleMouseEnter(show, e)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300">
        <div className="aspect-[3/4] relative">
          <Image
            src={show.thumbnail as string}
            alt={show.name as string}
            layout="fill"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(show.id as number);
            }}
            className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all duration-200 hover:scale-110"
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${
                favoriteIds.has(show.id as number)
                  ? "text-pink-400 fill-pink-400 scale-110"
                  : "text-white hover:text-pink-300"
              }`}
            />
          </button>
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
              <span className="text-yellow-400">{show.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieCard);
