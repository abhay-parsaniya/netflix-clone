import Image from "next/image";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../constants/movie";
import { Movie } from "../../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";
import Button from "../Button";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [, setCurrentMovie] = useRecoilState(movieState);
  const [, setShowModal] = useRecoilState(modalState);

  const randomSelectedMovie =
    netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];

  useEffect(() => {
    setMovie(randomSelectedMovie);
  }, [netflixOriginals]);

  const bannerImagePath = `${baseUrl}${
    movie?.backdrop_path || movie?.poster_path
  }`;
  return (
    <div className="Banner__Container">
      <div className="Banner__Container__Image">
        <Image src={bannerImagePath} layout="fill" objectFit="cover" />
      </div>

      <h1 className="Banner__Container__Title">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="Banner__Container__Overview">{movie?.overview}</p>

      <div className="flex space-x-3">
        <Button className="Banner__Container__Button bg-white text-black">
          <FaPlay className="Banner__Container__Button__PlayIcon" /> Play
        </Button>
        <Button
          className="Banner__Container__Button bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          More Info{" "}
          <InformationCircleIcon className="Banner__Container__Button__MoreInfoIcon" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
