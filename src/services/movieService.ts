import axios from "axios"
import type { Movie } from "../types/movie"

interface MovieResponse {
    results: Movie[],
}

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (movie: string): Promise<Movie[]> => {
    const response = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie`, {
  params: {
    query: `${movie}`,  
  },
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}
  );

  return response.data.results;
}
