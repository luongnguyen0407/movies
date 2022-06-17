export const fetcher = (...args) => fetch(...args).then((res) => res.json());
const apiKey = "e05d4571d77fadcce4caaa76464df83b";
const apiStart = "https://api.themoviedb.org/3/movie";
export const tdmbApi = {
  getMoviesTypes: (type) => `${apiStart}/${type}?api_key=${apiKey}`,
  getMoviesId: (movieId) => `${apiStart}/${movieId}?api_key=${apiKey}`,
  getMoviesIdType: (movieId, type) =>
    `${apiStart}/${movieId}/${type}?api_key=${apiKey}`,
  imgOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
};
