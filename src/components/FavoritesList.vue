<template>
  <div class="favorites-list">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div class="flex items-center gap-3 sm:gap-4">
        <div class="bg-red-950/50 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-red-900/50">
          <Heart class="h-5 w-5 sm:h-6 sm:w-6 text-red-500" fill="currentColor" />
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-100">Meus Favoritos</h1>
          <p class="text-sm sm:text-base text-gray-400 mt-0.5 sm:mt-1">
            {{ favoriteItems.length }} {{ favoriteItems.length === 1 ? 'filme' : 'filmes' }} salvos
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <button 
          v-if="favoriteItems.length"
          @click="showConfirmModal = true"
          class="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-950/50 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base border border-red-900/50"
          title="Limpar favoritos"
        >
          <Trash2 class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Limpar lista
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      <MovieCardSkeleton v-for="n in 4" :key="n" />
    </div>

    <div 
      v-else-if="!favoriteItems.length" 
      class="bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-800/50 p-6 sm:p-8 text-center"
    >
      <div class="bg-red-950/50 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center border border-red-900/50">
        <Heart class="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
      </div>
      <h2 class="text-lg sm:text-xl font-medium text-gray-100 mb-1.5 sm:mb-2">Nenhum filme favorito</h2>
      <p class="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto">
        Você ainda não adicionou nenhum filme aos favoritos. Explore nosso catálogo e salve os filmes que mais te interessam!
      </p>
      <router-link 
        to="/"
        class="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm sm:text-base"
      >
        <ArrowLeft class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        Explorar filmes
      </router-link>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <MovieCard 
          v-for="movie in favoriteItems" 
          :key="movie.id" 
          :movie="movie"
          @add-to-cart="$store.dispatch('addToCart', $event)"
        />
      </div>
    </div>

    <ConfirmationModal
      :is-open="showConfirmModal"
      title="Limpar Favoritos"
      message="Tem certeza que deseja remover todos os filmes da sua lista de favoritos?"
      @close="showConfirmModal = false"
      @confirm="handleConfirmClear"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Heart, Trash2, ArrowLeft } from 'lucide-vue-next';
import MovieCard from './MovieCard.vue';
import MovieCardSkeleton from './MovieCardSkeleton.vue';
import ConfirmationModal from './ConfirmationModal.vue';

const store = useStore();
const loading = ref(true);
const showConfirmModal = ref(false);

const favoriteItems = computed(() => store.getters.favoriteItems);

const handleConfirmClear = () => {
  store.dispatch('clearFavorites');
  showConfirmModal.value = false;
};

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
});

defineOptions({
  name: 'FavoritesList'
});
</script>

<script lang="ts">
export default {
  name: 'FavoritesList'
};
</script>

<style scoped>
.favorites-list {
  isolation: isolate;
}
</style> 