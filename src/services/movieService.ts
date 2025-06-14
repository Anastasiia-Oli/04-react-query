import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesHttpResponse> {
  const response = await axios.get<MoviesHttpResponse>(BASE_URL, {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}

export default fetchMovies;
