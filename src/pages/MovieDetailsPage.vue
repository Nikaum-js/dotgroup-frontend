<template>
  <div class="min-h-screen bg-gray-950">
    <div class="relative h-[60vh] overflow-hidden">
      <div class="absolute inset-0">
        <img 
          :src="backdropUrl"
          :alt="movie?.title"
          class="w-full h-full object-cover"
          @error="handleBackdropError"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/20"></div>
      </div>

      <div class="absolute top-6 left-6 z-10">
        <button 
          @click="$router.back()"
          class="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700/50"
        >
          <ArrowLeft class="h-5 w-5" />
          Voltar
        </button>
      </div>
    </div>

    <div class="container mx-auto px-4 -mt-48 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
        <div class="space-y-6">
          <div class="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
            <img 
              :src="posterUrl"
              :alt="movie?.title"
              class="w-full h-full object-cover"
              @error="handlePosterError"
            >
          </div>

          <div class="space-y-3">
            <button 
              @click="handleAddToCart"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              :disabled="loading"
            >
              <ShoppingCart class="h-5 w-5" />
              Adicionar ao Carrinho
            </button>

            <button 
              @click="handleToggleFavorite"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700/50"
              :class="{ 'text-red-500 hover:text-red-400': isFavorite }"
              :disabled="loading"
            >
              <Heart 
                class="h-5 w-5" 
                :fill="isFavorite ? 'currentColor' : 'none'"
              />
              {{ isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
            </button>
          </div>
        </div>

        <div class="space-y-8">
          <div v-if="loading" class="space-y-6">
            <div class="h-8 w-2/3 bg-gray-800/50 rounded-lg animate-pulse"></div>
            <div class="space-y-2">
              <div class="h-4 w-1/4 bg-gray-800/50 rounded-lg animate-pulse"></div>
              <div class="h-4 w-1/3 bg-gray-800/50 rounded-lg animate-pulse"></div>
            </div>
            <div class="space-y-2">
              <div class="h-4 w-full bg-gray-800/50 rounded-lg animate-pulse"></div>
              <div class="h-4 w-full bg-gray-800/50 rounded-lg animate-pulse"></div>
              <div class="h-4 w-2/3 bg-gray-800/50 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div 
            v-else-if="error" 
            class="bg-red-950/50 text-red-400 p-6 rounded-xl border border-red-900/50 text-center"
          >
            <AlertCircle class="h-8 w-8 mx-auto mb-3" />
            <p class="text-lg">{{ error }}</p>
            <button 
              @click="loadMovieDetails"
              class="mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw class="h-4 w-4" />
              Tentar novamente
            </button>
          </div>

          <div v-else-if="movie" class="space-y-8">
            <div>
              <h1 class="text-4xl font-bold text-gray-100 mb-4">{{ movie.title }}</h1>
              <div class="flex items-center gap-4 text-sm">
                <span class="text-gray-400">{{ releaseYear }}</span>
                <div class="flex items-center text-amber-500">
                  <Star class="h-5 w-5 mr-1" fill="currentColor" />
                  <span>{{ movie.vote_average.toFixed(1) }}</span>
                </div>
                <span class="text-red-500 font-medium">{{ formatPrice(moviePrice) }}</span>
              </div>
            </div>

            <div>
              <h2 class="text-xl font-semibold text-gray-100 mb-3">Sinopse</h2>
              <p class="text-gray-400 leading-relaxed">{{ movie.overview }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <h3 class="text-sm font-medium text-gray-400 mb-1">Data de Lançamento</h3>
                <p class="text-gray-100">{{ formattedReleaseDate }}</p>
              </div>

              <div class="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <h3 class="text-sm font-medium text-gray-400 mb-1">Idioma Original</h3>
                <p class="text-gray-100">{{ getLanguageName(movie.original_language) }}</p>
              </div>

              <div class="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <h3 class="text-sm font-medium text-gray-400 mb-1">Popularidade</h3>
                <p class="text-gray-100">{{ Math.round(movie.popularity).toLocaleString() }}</p>
              </div>
            </div>

            <div v-if="cast.length">
              <h2 class="text-xl font-semibold text-gray-100 mb-4">Elenco Principal</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div 
                  v-for="actor in cast" 
                  :key="actor.id"
                  class="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 group"
                >
                  <div class="aspect-[2/3] relative">
                    <img 
                      :src="getProfileUrl(actor.profile_path)"
                      :alt="actor.name"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      @error="handleProfileError"
                    >
                  </div>
                  <div class="p-3">
                    <h3 class="text-gray-100 font-medium text-sm line-clamp-1">{{ actor.name }}</h3>
                    <p class="text-gray-400 text-xs line-clamp-1">{{ actor.character }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ArrowLeft, Heart, Star, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-vue-next';
import api from '../services/api';
import { formatPrice } from '../utils/price';
import { calculateMoviePrice } from '../utils/price';
import type { Movie } from '../types/movie';

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface MovieDetails extends Movie {
  backdrop_path: string | null;
  original_language: string;
  popularity: number;
}

const route = useRoute();
const store = useStore();

const movie = ref<MovieDetails | null>(null);
const cast = ref<Cast[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const movieId = computed(() => Number(route.params.id));
const isFavorite = computed(() => store.getters.isFavorite(movieId.value));

const posterUrl = computed(() => {
  return movie.value?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
    : 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
});

const backdropUrl = computed(() => {
  return movie.value?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.value.backdrop_path}`
    : 'https://placehold.co/1920x1080/1f2937/64748b?text=Não+Possui+Backdrop';
});

const releaseYear = computed(() => {
  return movie.value ? new Date(movie.value.release_date).getFullYear() : '';
});

const formattedReleaseDate = computed(() => {
  if (!movie.value?.release_date) return '';
  return new Date(movie.value.release_date).toLocaleDateString('pt-BR');
});

const moviePrice = computed(() => {
  return movie.value ? calculateMoviePrice(movie.value.vote_average) : 0;
});

const loadMovieDetails = async () => {
  try {
    loading.value = true;
    error.value = null;

    const [movieResponse, creditsResponse] = await Promise.all([
      api.get<MovieDetails>(`/movie/${movieId.value}`),
      api.get<{ cast: Cast[] }>(`/movie/${movieId.value}/credits`)
    ]);

    movie.value = movieResponse.data;
    cast.value = creditsResponse.data.cast.slice(0, 10);
  } catch (e) {
    console.error('Error loading movie details:', e);
    error.value = 'Erro ao carregar detalhes do filme. Por favor, tente novamente.';
  } finally {
    loading.value = false;
  }
};

const handleAddToCart = () => {
  if (movie.value) {
    store.dispatch('addToCart', movie.value);
    store.dispatch('toggleCart');
  }
};

const handleToggleFavorite = () => {
  if (movie.value) {
    store.dispatch('toggleFavorite', movie.value);
  }
};

const handlePosterError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
};

const handleBackdropError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://placehold.co/1920x1080/1f2937/64748b?text=Não+Possui+Backdrop';
};

const handleProfileError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Foto';
};

const getProfileUrl = (profilePath: string | null) => {
  return profilePath
    ? `https://image.tmdb.org/t/p/w500${profilePath}`
    : 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Foto';
};

const getLanguageName = (languageCode: string) => {
  const languages: Record<string, string> = {
    'en': 'Inglês',
    'es': 'Espanhol',
    'pt': 'Português',
    'fr': 'Francês',
    'de': 'Alemão',
    'it': 'Italiano',
    'ja': 'Japonês',
    'ko': 'Coreano',
    'zh': 'Chinês'
  };
  return languages[languageCode] || languageCode.toUpperCase();
};

onMounted(() => {
  loadMovieDetails();
});

defineOptions({
  name: 'MovieDetailsPage'
});
</script> 