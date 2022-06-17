import React, { useEffect, useState } from "react";
import { fetcher } from "../config";
import useSWR from "swr";
import MovieCart from "../components/movie/MovieCart";
import useDebounce from "../hooks/useDebounce";
const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter);
  function handleChageSeacrh(e) {
    setFilter(e.target.value);
  }
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=e05d4571d77fadcce4caaa76464df83b&query=${filterDebounce}`
      );
    } else {
      setUrl(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=e05d4571d77fadcce4caaa76464df83b"
      );
    }
  }, [filterDebounce]);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=e05d4571d77fadcce4caaa76464df83b"
  );
  const { data, error } = useSWR(url, fetcher);
  const movies = data?.results || [];
  const loading = !data && !error;

  return (
    <div className=" page-container">
      <div className="flex overflow-hidden rounded-lg wrapper-search">
        <div className="flex-1 search-input">
          <input
            type="text "
            className="w-full p-2 text-white outline-none bg-slate-800 caret-primary"
            placeholder="Enter name movie..."
            onChange={handleChageSeacrh}
          />
        </div>
        <button className="px-4 py-2 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 mx-auto mt-10 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-5 mt-5 list-movies">
        {!loading &&
          movies.length > 0 &&
          movies.map((movie) => {
            return <MovieCart key={movie.id} {...movie}></MovieCart>;
          })}
      </div>
      <div className="flex items-center justify-center my-10 gap-x-5">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
        <span className="px-4 py-2 leading-none bg-white rounded text-primary">
          1
        </span>
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
