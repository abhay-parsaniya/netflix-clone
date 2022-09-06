import React from "react";
import Image from "next/image";
import { Movie } from "../../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";
import Link from "next/link";
import { DocumentData } from "firebase/firestore";

interface Props {
  movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
  const [, setCurrentMovie] = useRecoilState(movieState);
  const [, setShowModal] = useRecoilState(modalState);
  return (
    // <Link
    //   href={`/movie`}
    // >
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
    // </Link>
  );
};

export default Thumbnail;
