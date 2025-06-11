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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MoviesHttpResponse } from "../../types/movie";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";

const notify = () => toast("No movies found for your request.");

function App() {
  const [clickedMovie, setClickedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<MoviesHttpResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  useEffect(() => {
    if (data?.results.length === 0) {
      notify();
    }
  }, [data]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data && data.results.length > 0 && (
        <MovieGrid
          movies={data.results}
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
