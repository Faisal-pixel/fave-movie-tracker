import { show } from "@/types/show.types";

const handleMouseEnter = (
  show: show,
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  setHoveredShow: React.Dispatch<React.SetStateAction<show | null>>,
  setMousePosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >
) => {
  setHoveredShow(show);
  setMousePosition({ x: event.clientX, y: event.clientY });
};

const handleMouseMove = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  setMousePosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >
) => {
  setMousePosition({ x: event.clientX, y: event.clientY });
};

const handleMouseLeave = (
  setHoveredShow: React.Dispatch<React.SetStateAction<show | null>>
) => {
  setHoveredShow(null);
};

export { handleMouseEnter, handleMouseMove, handleMouseLeave };
