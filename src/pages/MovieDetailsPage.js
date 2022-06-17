import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { fetcher } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCart from "../components/movie/MovieCart";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=e05d4571d77fadcce4caaa76464df83b`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-[500px] object-cover relative">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <img
            className="object-cover w-full h-full"
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt=""
          />
        </div>
        <img
          className="w-full max-w-[500px] mx-auto h-[350px] object-cover -mt-[190px] z-10 relative rounded mb-10"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt=""
        />
        <p className="mb-10 text-2xl font-semibold text-center ">{title}</p>
        {genres.length > 0 && (
          <div className="flex items-center justify-center mb-10 gap-x-5">
            {genres.map((item) => {
              return (
                <span
                  className="px-4 py-2 border rounded border-primary text-primary"
                  key={item.id}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        )}
        <p className="text-center max-w-[700px] mx-auto  leading-relaxed mb-10">
          {overview}
        </p>
        <MovieCredits></MovieCredits>
        <TrailerVideos></TrailerVideos>
        <SimilarMovies></SimilarMovies>
      </div>
    </>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e05d4571d77fadcce4caaa76464df83b`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h3 className="mb-10 text-2xl font-semibold text-center text-primary">
        Cast
      </h3>
      <Swiper
        className="swiperdetails"
        grabCursor={"true"}
        spaceBetween={40}
        slidesPerView={"auto"}
      >
        {cast.slice(0, 10).map((item) => {
          return (
            <SwiperSlide key={item.id} className="select-none">
              <img
                className="w-full object-cover h-[350px] mb-3 rounded"
                src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                alt="avatar"
              />
              <p className="text-lg font-medium ">{item.name}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
function TrailerVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e05d4571d77fadcce4caaa76464df83b`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <>
      <div className="flex flex-col gap-10 mt-10 mb-12">
        <h3 className="text-2xl font-semibold text-center text-primary">
          Trailer
        </h3>
        {results.slice(0, 2).map((video) => {
          return (
            <div key={video.id} className="">
              <p className="inline-block p-4 mb-5 text-xl bg-primary">
                {video.name}
              </p>
              <iframe
                width="560"
                height="550"
                src={`https://www.youtube.com/embed/${video.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-cover w-full aspect-video"
              ></iframe>
            </div>
          );
        })}
      </div>
    </>
  );
}
function SimilarMovies() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=e05d4571d77fadcce4caaa76464df83b`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <>
      <h3 className="mb-5 text-2xl font-semibold text-primary">
        Similar Movies
      </h3>
      <Swiper
        className="swiperSimilar"
        grabCursor={"true"}
        spaceBetween={40}
        slidesPerView={"auto"}
      >
        {results.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <MovieCart {...movie}></MovieCart>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
export default MovieDetailsPage;
