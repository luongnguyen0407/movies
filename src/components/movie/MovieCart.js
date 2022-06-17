import React from "react";
import { useNavigate } from "react-router-dom";
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieCart = ({ title, release_date, vote_average, poster_path, id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 list-none rounded-lg select-none bg-slate-800">
      <img
        className="object-cover w-full h-[250px]"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt=""
      />
      <div className="flex-1 my-8 text-white">
        <h3 className="mb-3 text-xl">{title}</h3>
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
      </div>
      <button
        onClick={() => navigate(`/movie/${id}`)}
        className="w-full py-3 text-sm font-semibold text-white rounded-lg bg-primary"
      >
        Watch Now
      </button>
    </div>
  );
};

export default MovieCart;
