import React from "react";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { movieState } from "../../atoms/modalAtom";
import { Movie, Element } from "../../typings";
import { BASE_URL } from "../../utils/requests";

interface Props {
  movie: Movie;
}

export const getStaticPaths = async ({ movie }: Props) => {

  const data = await fetch(
    `${BASE_URL}/${movie?.media_type === "tv" ? "tv" : "movie"}/${
      movie?.id
    }?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=en-US&append_to_response=videos`
  )
    .then((response) => response.json())
    .catch((err) => console.log(err.message));

  if (data?.videos) {
    const index = data.videos.results.findIndex(
      (element: Element) => element.type === "Trailer"
    );
    const paths = data.videos?.results[index]?.key;
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {

  return {};
};

const Movie = () => {
  const [movie, setMovie] = useRecoilState(movieState);

  return (
    <div>
      Hello
      <ReactPlayer
        // url={`https://www.youtube.com/watch?v=${trailer}`}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: "0", left: "0" }}
        playing
      />
    </div>
  );
};

export default Movie;
