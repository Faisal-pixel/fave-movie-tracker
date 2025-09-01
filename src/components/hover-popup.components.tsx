import { show } from "@/types/show.types";
import { Calendar, Star, Tv } from "lucide-react";
import Image from "next/image";
import React, { JSX } from "react";

type Props = {
  mousePosition: { x: number; y: number };
  hoveredShow: show | null;
  getStatusIcon: (status: string) => JSX.Element | null;
  getStatusColor: (status: string) => string;
};

const HoverPopup = ({
  mousePosition,
  hoveredShow,
  getStatusIcon,
  getStatusColor,
}: Props) => {
  return (
    <div
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
      style={{
        left: mousePosition.x,
        top: mousePosition.y - 20,
      }}
    >
      <div className="bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-2xl max-w-sm animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto sm:flex-shrink-0">
            <Image
              src={hoveredShow!.thumbnail as string}
              alt={hoveredShow!.name as string}
              width={80} // roughly Tailwind w-20 (20 * 4 = 80px)
              height={112} // roughly Tailwind h-28 (28 * 4 = 112px)
              className="w-20 h-28 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-white text-lg leading-tight">
              {hoveredShow!.name}
            </h3>

            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>Started: {hoveredShow!.startYear}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  {hoveredShow!.rating}/10
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Tv className="w-4 h-4" />
                <span>{hoveredShow!.network}</span>
              </div>

              <div className="flex items-center gap-2">
                {getStatusIcon(hoveredShow!.status as string)}
                <span
                  className={`font-medium ${getStatusColor(
                    hoveredShow!.status as string
                  )}`}
                >
                  {hoveredShow!.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverPopup;
