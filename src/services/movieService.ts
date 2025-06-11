import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

async function fetchMovies(query: string) {
  const response = await axios.get<MoviesHttpResponse>(BASE_URL, {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  //   console.log(response.data.results);
  return response.data.results;
}

export default fetchMovies;
