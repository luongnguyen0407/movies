import { Swiper, SwiperSlide } from "swiper/react";
import MovieCart from "./MovieCart";
import useSWR from "swr";

import { fetcher, tdmbApi } from "../../config";
const MovieList = ({ type = "now_playing" }) => {
  //   const [movies, setMovies] = useState([]);
  const { data } = useSWR(tdmbApi.getMoviesTypes(type), fetcher);

  //cach 2
  const movies = data?.results || [];

  //   useEffect(() => {
  //     if (data) {
  //       setMovies(data.results);
  //     }
  //   }, [data]);
  return (
    <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
      {movies.length > 0 &&
        movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <MovieCart {...movie}></MovieCart>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default MovieList;
