import React from "react";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { movieState } from "../../atoms/modalAtom";
import { Movie, Element } from "../../typings";
import requests, { BASE_URL } from "../../utils/requests";

interface Props {
  movie: Movie;
}

export const getStaticPaths = async () => {
  const trendingNow = await fetch(requests.fetchTrending).then((res) =>
    res.json()
  );

  const paths = trendingNow.results.map((curMovie: Movie) => {
    return {
      params: {
        movie: curMovie.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  console.log(context);
  return {
    
  };
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
