import React from "react";
import requests from "../../utils/requests";
import Row from "../../components/Row";
import { Movie } from "../../typings";
import HeadName from "../../components/HeadName";

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
}

const NewPopular = ({ trendingNow, topRated }: Props) => {
  return (
    <div>
      <HeadName name="Netflix - New & Popular" />
      <section className="md:space-y-24">
        <Row title="Trending Now" movies={trendingNow} />
        <Row title="Top Rated" movies={topRated} />
      </section>
    </div>
  );
};

export default NewPopular;

export const getStaticProps = async () => {
  const [trendingNow, topRated] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
    },
  };
};
