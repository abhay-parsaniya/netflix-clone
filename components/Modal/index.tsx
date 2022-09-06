import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieListState, movieState } from "../../atoms/modalAtom";
import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import ReactPlayer from "react-player/lazy";
import { Element, Genre, Movie } from "../../typings";
import { FaPlay } from "react-icons/fa";
import Button from "../Button";
import { BASE_URL } from "../../utils/requests";
import { DocumentData } from "firebase/firestore";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const [movies_list, setMoviesList] = useRecoilState<DocumentData[] | Movie[]>(
    movieListState
  );

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
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
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  useEffect(() => {
    setAddedToList(
      movies_list.findIndex((result) => result.id === movie?.id) !== -1
    );
    localStorage.setItem("My_Movie_List", JSON.stringify(movies_list));
  }, [movies_list]);

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
  };

  const handleList = (movie: Movie | DocumentData | null) => {
    if (addedToList) {
      const filtered_movies_list = movies_list.filter(
        (movie_item) => movie_item.id !== movie?.id
      );
      setMoviesList(filtered_movies_list);
      
    } else {
      setMoviesList(() => [movie!, ...movies_list]);
      
    }
  };

  return (
    <MuiModal open={showModal} onClose={handleClose} className="Modal">
      <>
        <Button
          onClick={handleClose}
          className="Modal__Button Modal__Button__Close"
        >
          <XIcon className="h-6 w-6" />
        </Button>

        <div className="Modal__Player">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="Modal__Player__Menu">
            <div className="Modal__Player__Menu__Options">
              <Button className="Modal__Player__Button__Play">
                <FaPlay className="h-7 w-7 text-black" /> Play
              </Button>
              <Button
                className="Modal__Button"
                onClick={() => handleList(movie)}
              >
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </Button>
              <Button className="Modal__Button">
                <ThumbUpIcon className="h-7 w-7" />
              </Button>
            </div>
            <Button className="Modal__Button" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <div className="Modal__Movie">
          <div className="space-y-6 text-lg">
            <div className="Modal__Movie__Info">
              <p className="Modal__Movie__Info__Vote_Average">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="Modal__Movie__Info__Type">HD</div>
            </div>
            <div className="Modal__Movie__About">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="Modal__Movie__About__Type">
                <div>
                  <span className="Modal__Movie__About__Type__Color">
                    Genres:
                  </span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="Modal__Movie__About__Type__Color">
                    Original language:
                  </span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="Modal__Movie__About__Type__Color">
                    Total votes:
                  </span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
