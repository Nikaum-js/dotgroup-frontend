<template>
  <div 
    class="movie-card bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg hover:shadow-red-500/5 transition-all duration-300 overflow-hidden border border-gray-800/50 cursor-pointer group"
    @click="handleCardClick"
  >
    <div class="relative aspect-[2/3] overflow-hidden bg-gray-800">
      <img 
        :src="posterUrl"
        :alt="movie.title"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      >
      <button 
        class="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 sm:p-2.5 bg-gray-900/80 backdrop-blur-sm rounded-full transition-all duration-300 shadow-lg group hover:bg-gray-800/90 hover:scale-110 favorite-button"
        :class="[
          isFavorite 
            ? 'text-red-500 hover:text-red-400 scale-110' 
            : 'text-gray-400 hover:text-red-500'
        ]"
        @click.stop="handleToggleFavorite"
        :title="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <Heart 
          class="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 transform" 
          :class="{ 
            'favorite-active': isFavorite,
            'scale-110 animate-heartbeat': isFavorite
          }"
          :fill="isFavorite ? 'currentColor' : 'none'"
        />
        <span class="absolute inset-0 rounded-full ring-2 ring-red-500/0 group-hover:ring-red-500/20 transition-all duration-300"></span>
        <span 
          class="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-300"
          :class="{ 'bg-red-500/10': isFavorite }"
        ></span>
      </button>
    </div>

    <div class="p-3 sm:p-4">
      <div class="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <span class="text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-red-950/50 text-red-400 border border-red-900/50">
          {{ releaseYear }}
        </span>
        <div class="flex items-center text-amber-500 bg-amber-950/50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-900/50">
          <Star class="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" fill="currentColor" />
          <span class="text-[10px] sm:text-xs font-medium">{{ movie.vote_average.toFixed(1) }}</span>
        </div>
      </div>
      
      <h2 class="text-sm sm:text-base text-gray-100 font-medium mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-red-400 transition-colors">
        {{ movie.title }}
      </h2>

      <div class="flex items-center justify-between">
        <div class="text-base sm:text-lg font-medium text-red-500">
          {{ formatPrice(moviePrice) }}
        </div>
        
        <button 
          class="relative overflow-hidden bg-gray-800/80 hover:bg-red-500/90 text-gray-300 hover:text-white p-2 sm:p-2.5 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center group backdrop-blur-sm border border-gray-700/50 hover:border-red-400/30 hover:shadow-lg hover:shadow-red-500/10"
          @click.stop="handleAddToCart"
          title="Adicionar ao Carrinho"
        >
          <span class="relative z-10">
            <ShoppingBasket 
              class="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-all duration-500 ease-out group-hover:scale-110" 
              :class="{ 'animate-bounce': isAnimating }"
            />
          </span>
          <span class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 group-hover:translate-x-full duration-1000 transition-transform"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Heart, Star, ShoppingBasket } from 'lucide-vue-next';
import { calculateMoviePrice, formatPrice } from '../utils/price';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

const store = useStore();
const router = useRouter();
const props = defineProps<{
  movie: Movie;
}>();

const emits = defineEmits<{
  (e: 'addToCart', movie: Movie): void;
}>();

const isFavorite = computed(() => store.getters.isFavorite(props.movie.id));

const handleToggleFavorite = () => {
  store.dispatch('toggleFavorite', props.movie);
};

const posterUrl = computed(() => {
  return props.movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
});

const releaseYear = computed(() => {
  return new Date(props.movie.release_date).getFullYear();
});

const moviePrice = computed(() => {
  return calculateMoviePrice(props.movie.vote_average);
});

const isAnimating = ref(false);

const handleAddToCart = () => {
  isAnimating.value = true;
  emits('addToCart', props.movie);
  
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
};

const handleCardClick = () => {
  router.push(`/movie/${props.movie.id}`);
};

defineOptions({
  name: 'MovieCard'
});
</script>

<script lang="ts">
export default {
  name: 'MovieCard'
};
</script>

<style scoped>
.movie-card {
  isolation: isolate;
}

@keyframes addToCart {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2) rotate(-15deg);
  }
  50% {
    transform: scale(0.95) rotate(0deg);
  }
  75% {
    transform: scale(1.1) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: addToCart 1s ease-in-out;
}

.favorite-active {
  filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.5));
}

.animate-heartbeat {
  animation: heartbeat 1s ease-in-out;
}

.favorite-button:hover .favorite-active {
  filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.6));
}
</style> 