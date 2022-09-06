import React, {useEffect} from "react";
import { useRecoilValue } from "recoil";
import { movieListState } from "../../atoms/modalAtom";
import HeadName from "../../components/HeadName";
import Row from "../../components/Row";

const MyList = () => {
  const movie_ListState = useRecoilValue(movieListState);
  console.log(movie_ListState)
  useEffect(() => {
    localStorage.setItem("My_Movie_List", JSON.stringify(movie_ListState))
  }, [movie_ListState]);
  
  return (
    <div>
      <HeadName name="Netflix - MyList" />
      <section className="md:space-y-24">
        {movie_ListState.length === 0 ? (
          <h3>Movie List is Empty</h3>
        ) : (
          <Row title="My List" movies={movie_ListState} />
        )}
      </section>
    </div>
  );
};

export default MyList;
