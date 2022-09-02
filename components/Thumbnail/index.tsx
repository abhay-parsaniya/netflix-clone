import React from "react";
import Image from "next/image";
import { Movie } from "../../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  return (
    <div
      className="Thumbnail"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="Thumbnail__Image"
        layout="fill"
      />
    </div>
  );
};

export default Thumbnail;
