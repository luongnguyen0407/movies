import React from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <>
      <section className="page-container">
        <h4 className="mb-10 text-2xl font-bold text-white">Now Playing</h4>
        <div className="swiper-list">
          <MovieList></MovieList>
        </div>
      </section>
      <section className="page-container">
        <h4 className="my-10 text-2xl font-bold text-white">
          Top rated movies
        </h4>
        <div className="swiper-list">
          <MovieList type="top_rated"></MovieList>
        </div>
      </section>
      <section className="page-container">
        <h4 className="my-10 text-2xl font-bold text-white">Popular</h4>
        <div className="swiper-list">
          <MovieList type="popular"></MovieList>
        </div>
      </section>
    </>
  );
};

export default HomePage;
