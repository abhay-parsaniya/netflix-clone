import React from "react";
import Image from "next/image";
import { Movie } from "../../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";
import { DocumentData } from "firebase/firestore";

interface Props {
  movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
  const [, setCurrentMovie] = useRecoilState(movieState);
  const [, setShowModal] = useRecoilState(modalState);
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
