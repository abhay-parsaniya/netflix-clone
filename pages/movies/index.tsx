import React from "react";
import HeadName from "../../components/HeadName";
import Row from "../../components/Row";
import { Movie } from "../../typings";
import requests from "../../utils/requests";

interface Props {
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
}
const Movies = ({
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
}: Props) => {
  return (
    <div>
      <HeadName name="Netflix - Movies" />
      <section className="md:space-y-24">
        <Row title="Action Thrillers" movies={actionMovies} />
        <Row title="Comedies" movies={comedyMovies} />
        <Row title="Scary Movies" movies={horrorMovies} />
        <Row title="Romance Movies" movies={romanceMovies} />
      </section>
    </div>
  );
};

export default Movies;

export const getStaticProps = async () => {
  const [actionMovies, comedyMovies, horrorMovies, romanceMovies] =
    await Promise.all([
      fetch(requests.fetchActionMovies).then((res) => res.json()),
      fetch(requests.fetchComedyMovies).then((res) => res.json()),
      fetch(requests.fetchHorrorMovies).then((res) => res.json()),
      fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    ]);

  return {
    props: {
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
    },
  };
};
