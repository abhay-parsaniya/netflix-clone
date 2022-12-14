import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { Movie } from "../typings";
import requests from "../utils/requests";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieListState, movieState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import HeadName from "../components/HeadName";
import LoadingSpinner from "../components/LoadingSpinner";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: [] | null;
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) => {
  const { user, isLoading } = useAuth();
  const showModal = useRecoilValue(modalState);
  const [movie_ListState, setMoviesList] = useRecoilState(movieListState);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch_Movie_List = localStorage.getItem("My_Movie_List");
    setMoviesList(JSON.parse(fetch_Movie_List!));
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <HeadName name="Netflix" />

      {isLoading && <LoadingSpinner size={40} color="error" />}

      {!isLoading && (
        <>
          <Header />
          <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
            <Banner netflixOriginals={netflixOriginals} />
            <section className="md:space-y-24">
              <Row title="Trending Now" movies={trendingNow} />
              <Row title="Top Rated" movies={topRated} />
              <Row title="Action Thrillers" movies={actionMovies} />
              {/* My List */}
              {user && movie_ListState.length > 0 && (
                <Row title="My List" movies={movie_ListState} />
              )}
              <Row title="Comedies" movies={comedyMovies} />
              <Row title="Scary Movies" movies={horrorMovies} />
              <Row title="Romance Movies" movies={romanceMovies} />
              <Row title="Documentaries" movies={documentaries} />
            </section>
          </main>
          {showModal && <Modal />}
        </>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  let products = await fetch(requests.fetchProducts, {
    headers: {
      "Content-Type": "application/json",
      method: "GET",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  products = Object.entries(products).map((entry) => {
    return { [entry[0]]: entry[1] };
  });

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
