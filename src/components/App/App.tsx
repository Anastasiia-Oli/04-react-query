import css from "./App.module.css";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

const notify = () => toast("No movies found for your request.");

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clickedMovie, setClickedMovie] = useState<Movie | null>(null);

  const handleSearch = async (data: string) => {
    setIsLoading(true);
    setError(false);
    try {
      const result = await fetchMovies(data);
      if (result.length === 0) {
        notify();
      }
      setMovies(result);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => {
            setClickedMovie(movie);
          }}
        />
      )}

      {clickedMovie && (
        <MovieModal
          movie={clickedMovie}
          onClose={() => setClickedMovie(null)}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;
