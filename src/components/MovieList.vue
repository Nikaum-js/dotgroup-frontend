<template>
  <div>
    <div>
      <h1 class="text-xl sm:text-2xl font-semibold text-gray-100 mb-6 sm:mb-8">{{ title }}</h1>
      
      <div v-if="loading" class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <MovieCardSkeleton v-for="n in 10" :key="n" />
      </div>

      <div v-else-if="error" class="text-red-400 text-center py-6 sm:py-8 bg-red-950/50 rounded-lg sm:rounded-xl border border-red-900/50">
        <AlertCircle class="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3" />
        <p class="text-base sm:text-lg">{{ error }}</p>
        <button 
          @click="$emit('changePage', currentPage)"
          class="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
        >
          <RefreshCw class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Tentar novamente
        </button>
      </div>

      <div v-else class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @add-to-cart="$emit('addToCart', $event)"
        />
      </div>

      <div v-if="!loading && !error && movies.length > 0" class="mt-8 sm:mt-12 flex justify-center gap-1.5 sm:gap-2">
        <button 
          @click="$emit('changePage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900/50 border border-gray-800/50 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
        >
          <ChevronLeft class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Anterior
        </button>
        <span class="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-300 bg-gray-900/50 border border-gray-800/50 rounded-lg flex items-center">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button 
          @click="$emit('changePage', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900/50 border border-gray-800/50 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
        >
          Próxima
          <ChevronRight class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-vue-next';
import MovieCard from './MovieCard.vue';
import MovieCardSkeleton from './MovieCardSkeleton.vue';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

defineProps<{
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  title: string;
}>();

defineEmits<{
  (e: 'changePage', page: number): void;
  (e: 'addToCart', movie: Movie): void;
}>();

defineOptions({
  name: 'MovieList'
});
</script>

<script lang="ts">
export default {
  name: 'MovieList'
};
</script>