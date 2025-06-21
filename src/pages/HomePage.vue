<template>
  <div class="min-h-screen bg-gray-950">
    <header class="bg-gray-900/30 backdrop-blur-xl border-b border-gray-800/30 py-6 sticky top-0 z-50 transition-all duration-300">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between gap-4 md:gap-8">
          <router-link to="/" class="shrink-0">
            <img src="../assets/images/logo.png" alt="Digital Group" class="h-6 md:h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity" />
          </router-link>
          
          <div class="hidden md:block flex-1 max-w-2xl">
            <div class="relative group">
              <input 
                type="text" 
                placeholder="Buscar filmes..." 
                class="w-full px-5 py-3 rounded-xl bg-gray-800/40 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 pr-12 border border-gray-700/30 group-hover:border-gray-600/30 group-hover:bg-gray-800/50 transition-all"
                v-model="searchQuery"
                @input="handleSearch"
              >
              <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-300 transition-colors">
                <Search class="h-5 w-5" />
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 md:gap-4">
            <button 
              class="md:hidden relative group p-3 hover:bg-gray-800/50 rounded-xl transition-all"
              @click="isSearchOpen = true"
              title="Buscar"
            >
              <Search 
                class="h-6 w-6 text-gray-300 group-hover:text-red-500 transition-colors" 
              />
              <span class="absolute inset-0 rounded-xl ring-2 ring-red-500/0 group-hover:ring-red-500/20 transition-all"></span>
            </button>

            <router-link 
              to="/favorites"
              class="relative group p-3 hover:bg-gray-800/50 rounded-xl transition-all"
              title="Meus Favoritos"
            >
              <Heart 
                class="h-6 w-6 text-gray-300 group-hover:text-red-500 transition-colors" 
                :fill="favoritesCount > 0 ? 'currentColor' : 'none'" 
              />
              <span 
                v-if="favoritesCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ favoritesCount }}
              </span>
              <span class="absolute inset-0 rounded-xl ring-2 ring-red-500/0 group-hover:ring-red-500/20 transition-all"></span>
            </router-link>

            <button 
              class="relative group p-3 hover:bg-gray-800/50 rounded-xl transition-all"
              @click="$store.dispatch('toggleCart')"
              title="Carrinho"
            >
              <ShoppingCart 
                class="h-6 w-6 text-gray-300 group-hover:text-red-500 transition-colors" 
              />
              <span 
                v-if="cartTotal > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartTotal }}
              </span>
              <span class="absolute inset-0 rounded-xl ring-2 ring-red-500/0 group-hover:ring-red-500/20 transition-all"></span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <MovieList
        :movies="movies"
        :loading="loading"
        :error="error"
        :current-page="currentPage"
        :total-pages="totalPages"
        :title="searchQuery ? 'Resultados da Busca' : 'Filmes Populares'"
        @change-page="loadPage"
        @add-to-cart="addToCart"
      />
    </main>

    <CartSidebar />

    <!-- Mobile Search Interface -->
    <div 
      v-if="isSearchOpen" 
      class="fixed inset-0 z-50 bg-gray-950 md:hidden"
    >
      <div class="flex flex-col h-full">
        <div class="border-b border-gray-800/30 p-4">
          <div class="flex items-center gap-4">
            <button 
              @click="closeSearch"
              class="p-2 -m-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <ArrowLeft class="h-6 w-6 text-gray-300" />
            </button>
            
            <div class="flex-1">
              <input 
                type="text" 
                placeholder="Buscar filmes..." 
                class="w-full px-4 py-2.5 rounded-lg bg-gray-800/40 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 border border-gray-700/30 transition-all"
                v-model="searchQuery"
                @input="handleSearch"
                ref="mobileSearchInput"
              >
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-auto">
          <MovieList
            v-if="searchQuery"
            :movies="movies"
            :loading="loading"
            :error="error"
            :current-page="currentPage"
            :total-pages="totalPages"
            title="Resultados da Busca"
            @change-page="loadPage"
            @add-to-cart="addToCart"
            class="py-4"
          />
          <div 
            v-else 
            class="p-4 text-center text-gray-400"
          >
            Digite algo para buscar filmes...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import { useMovies } from '../hooks/useMovies';
import { useDebouncedRef } from '../hooks/useDebounced';
import { Search, ShoppingCart, Heart, ArrowLeft } from 'lucide-vue-next';
import MovieList from '../components/MovieList.vue';
import CartSidebar from '../components/CartSidebar.vue';
import type { Movie } from '../types/movie';

const store = useStore();
const cartTotal = computed(() => store.getters.cartTotal);
const favoritesCount = computed(() => store.getters.favoritesCount);
const isSearchOpen = ref(false);
const mobileSearchInput = ref<HTMLInputElement | null>(null);

const { 
  movies, 
  loading, 
  error, 
  currentPage, 
  totalPages, 
  getPopularMovies,
  searchMovies 
} = useMovies();

const searchQuery = useDebouncedRef('', 500);

const loadPage = async (page: number) => {
  if (searchQuery.value) {
    await searchMovies(searchQuery.value, page);
  } else {
    await getPopularMovies(page);
  }
};

const handleSearch = async () => {
  if (searchQuery.value) {
    await searchMovies(searchQuery.value);
  } else {
    await getPopularMovies(1);
  }
};

const closeSearch = () => {
  isSearchOpen.value = false;
  searchQuery.value = '';
};

const addToCart = (movie: Movie) => {
  store.dispatch('addToCart', movie);
};

onMounted(() => {
  loadPage(1);
});

watch(isSearchOpen, async (newValue: boolean) => {
  if (newValue) {
    await nextTick();
    mobileSearchInput.value?.focus();
  }
});
</script>