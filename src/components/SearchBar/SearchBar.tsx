import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

type SearchBarProps = {
  onSubmit: (value: string) => void;
};

const notify = () => toast("Please enter your search query.");

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();

    if (query) {
      onSubmit(query);
    } else {
      notify();
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
        <Toaster />
      </div>
    </header>
  );
}

export default SearchBar;
