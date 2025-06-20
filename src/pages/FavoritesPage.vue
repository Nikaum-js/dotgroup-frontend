<template>
  <div class="min-h-screen bg-gray-950">
    <header class="bg-gray-900/30 backdrop-blur-xl border-b border-gray-800/30 py-6 sticky top-0 z-50 transition-all duration-300">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <router-link to="/" class="shrink-0">
          <img src="../assets/images/logo.png" alt="Digital Group" class="h-8 w-auto invert opacity-90 hover:opacity-100 transition-opacity" />
        </router-link>
        <div class="flex items-center gap-6">
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
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <router-link 
          to="/" 
          class="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-900/50"
          title="Voltar para a loja"
        >
          <ArrowLeft class="h-5 w-5" />
          <span>Voltar para a loja</span>
        </router-link>
      </div>
      
      <FavoritesList />
    </main>
  
    <CartSidebar />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ArrowLeft, ShoppingCart } from 'lucide-vue-next';
import FavoritesList from '../components/FavoritesList.vue';
import CartSidebar from '../components/CartSidebar.vue';

const store = useStore();
const cartTotal = computed(() => store.getters.cartTotal);

defineOptions({
  name: 'FavoritesPage'
});
</script> 