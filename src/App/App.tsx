import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar"
import { fetchMovies } from "../services/movieService"
import type { Movie } from "../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from '../MovieModal/MovieModal'
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (movie: string) => {

    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const data = await fetchMovies(movie);
      if (!data.length) {
        toast.error("No movies found for your request.")
        return
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
    
  }
    return (
      <>
        <Toaster toastOptions={{
        duration: 3000,
        removeDelay: 1000,

}}  />
        <SearchBar onSubmit={handleSearch} />
        {isLoading && <Loader/>}
        {isError && <ErrorMessage/>}
        {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies}/>}
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      </>
    )
}