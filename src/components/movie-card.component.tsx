import { show } from "@/types/show.types";
import { Calendar, Star } from "lucide-react";
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
};

const MovieCard = (props: Props) => {
  const { show, handleMouseLeave, handleMouseMove, handleMouseEnter } = props;
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

export default MovieCard;
