import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import { Movie } from "../../typings";
import Thumbnail from "../Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="Row">
      <h2 className="Row__Title">{title}</h2>
      <div className="Row__Group group">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`Row__Group__LeftIcon ${!isMoved && "hidden"}`}
        />

        <div ref={rowRef} className="Row__Group__Data__Display">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className="Row__Group__RightIcon"
        />
      </div>
    </div>
  );
};

export default Row;
