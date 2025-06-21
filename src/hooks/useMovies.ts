import { ref } from "vue";
import api from "../services/api";
import type { Movie, MovieResponse } from "../types/movie";

export function useMovies() {
  const movies = ref<Movie[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(1);

  const getPopularMovies = async (page = 1) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.get<MovieResponse>("/movie/popular", {
        params: { page },
      });
      movies.value = response.data.results;
      currentPage.value = page;
      totalPages.value = response.data.total_pages;
      return response.data;
    } catch (e) {
      error.value = "Erro ao carregar os filmes. Por favor, tente novamente.";
      console.error("Error fetching movies:", e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const searchMovies = async (query: string, page = 1) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.get<MovieResponse>("/search/movie", {
        params: { query, page },
      });
      movies.value = response.data.results;
      currentPage.value = page;
      totalPages.value = response.data.total_pages;
      return response.data;
    } catch (e) {
      error.value = "Erro ao pesquisar os filmes. Por favor, tente novamente.";
      console.error("Error searching movies:", e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    getPopularMovies,
    searchMovies,
  };
}
