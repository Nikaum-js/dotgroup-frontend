<template>
  <div 
    class="fixed inset-0 bg-gray-950/50 backdrop-blur-sm transition-opacity duration-300 z-[60]"
    :class="{ 'opacity-0 pointer-events-none': !isOpen, 'opacity-100': isOpen }"
    @click="$store.dispatch('toggleCart')"
  >
    <div 
      class="fixed inset-y-0 right-0 w-[85vw] sm:w-[400px] lg:w-[450px] bg-gray-900/95 backdrop-blur-xl border-l border-gray-800/50 shadow-xl transform transition-transform duration-500 ease-out z-[70]"
      :class="{ 'translate-x-full': !isOpen }"
      @click.stop
    >
      <div class="h-full flex flex-col">
        <div class="p-3 sm:p-4 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="bg-gray-800/80 p-1.5 sm:p-2 rounded-lg">
                <ShoppingCart class="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              </div>
              <div>
                <h2 class="text-lg sm:text-xl font-semibold text-gray-100">Carrinho</h2>
                <p class="text-xs sm:text-sm text-gray-400">
                  {{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'itens' }}
                </p>
              </div>
            </div>
            <button 
              @click="$store.dispatch('toggleCart')"
              class="text-gray-400 hover:text-red-500 transition-colors p-1.5 sm:p-2 hover:bg-gray-800/80 rounded-lg group relative"
              title="Fechar carrinho"
            >
              <X class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:rotate-90" />
              <span class="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </div>
        </div>

        <div v-if="!cartItems.length" class="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
          <ShoppingCart class="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mb-3 sm:mb-4" />
          <p class="text-base sm:text-lg text-gray-400 mb-1.5 sm:mb-2">Seu carrinho está vazio</p>
          <p class="text-xs sm:text-sm text-gray-500">Adicione alguns filmes para começar</p>
        </div>

        <div v-else class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 cart-items-scroll">
          <div 
            v-for="item in cartItems" 
            :key="item.id" 
            class="group bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div class="flex gap-3 sm:gap-4">
              <img 
                :src="getPosterUrl(item.poster_path)"
                :alt="item.title"
                class="h-20 w-14 sm:h-24 sm:w-16 object-cover rounded-md"
                @error="handleImageError"
              >
              
              <div class="flex-1">
                <h3 class="text-sm sm:text-base text-gray-100 font-medium mb-0.5 sm:mb-1 line-clamp-1">{{ item.title }}</h3>
                <p class="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                  {{ new Date(item.release_date).getFullYear() }}
                </p>
                
                <div class="flex items-center justify-between mb-2 sm:mb-3">
                  <span class="text-xs sm:text-sm text-gray-400">
                    {{ formatPrice(item.price) }}
                  </span>
                  <span class="text-xs sm:text-sm text-gray-400">
                    Subtotal: {{ formatPrice(item.price * item.quantity) }}
                  </span>
                </div>
                
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <button 
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                    class="text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:hover:text-gray-400 transition-colors p-1 sm:p-1.5 hover:bg-gray-700/50 rounded-md"
                    :title="item.quantity <= 1 ? 'Quantidade mínima' : 'Diminuir quantidade'"
                  >
                    <Minus class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <span class="text-gray-300 w-6 sm:w-8 text-center text-sm sm:text-base">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="text-gray-400 hover:text-red-500 transition-colors p-1 sm:p-1.5 hover:bg-gray-700/50 rounded-md"
                    title="Aumentar quantidade"
                  >
                    <Plus class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  
                  <button 
                    @click="confirmRemoveFromCart(item.id)"
                    class="ml-auto text-gray-400 hover:text-red-500 transition-colors p-1 sm:p-1.5 hover:bg-gray-700/50 rounded-md group-hover:opacity-100 opacity-0 transition-opacity"
                    title="Remover do carrinho"
                  >
                    <Trash class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="cartItems.length" class="p-3 sm:p-4 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
          <div class="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div class="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <div class="bg-green-950/50 p-1.5 sm:p-2 rounded-lg">
                <Truck class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              </div>
              <div>
                <p class="text-green-500 font-medium">Frete Grátis</p>
                <p class="text-gray-400">Entrega estimada em 2-3 dias úteis</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <div class="bg-blue-950/50 p-1.5 sm:p-2 rounded-lg">
                <ShieldCheck class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              </div>
              <div>
                <p class="text-blue-500 font-medium">Pagamento Seguro</p>
                <p class="text-gray-400">Suas informações estão protegidas</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800/50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
            <div class="flex justify-between items-center mb-1.5 sm:mb-2 text-xs sm:text-sm">
              <span class="text-gray-400">Subtotal</span>
              <span class="text-gray-300">{{ formatPrice(cartTotalPrice) }}</span>
            </div>
            <div class="flex justify-between items-center mb-1.5 sm:mb-2 text-xs sm:text-sm">
              <span class="text-gray-400">Frete</span>
              <span class="text-green-500 font-medium">Grátis</span>
            </div>
            <div class="h-px bg-gray-700/50 my-2 sm:my-3"></div>
            <div class="flex justify-between items-center">
              <span class="text-sm sm:text-base text-gray-100 font-medium">Total</span>
              <div class="text-right">
                <span class="text-xl sm:text-2xl font-semibold text-red-500">{{ formatPrice(cartTotalPrice) }}</span>
                <p class="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">em até 12x sem juros</p>
              </div>
            </div>
          </div>

          <router-link 
            to="/checkout"
            class="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-red-500/10"
            @click="$store.dispatch('toggleCart')"
          >
            Finalizar Compra
            <ArrowRight class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
  
  <ConfirmationModal
    :is-open="showConfirmModal"
    title="Remover Item"
    message="Tem certeza que deseja remover este item do carrinho?"
    @close="handleCancelRemove"
    @confirm="handleConfirmRemove"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { X, ShoppingCart, Minus, Plus, Trash, ArrowRight, Truck, ShieldCheck } from 'lucide-vue-next';
import { formatPrice } from '../utils/price';
import ConfirmationModal from './ConfirmationModal.vue';

const store = useStore();

const isOpen = computed(() => store.getters.cartIsOpen);
const cartItems = computed(() => store.getters.cartItems);
const cartTotalPrice = computed(() => store.getters.cartTotalPrice);

const showConfirmModal = ref(false);
const itemToRemove = ref<number | null>(null);

const getPosterUrl = (posterPath: string | null) => {
  return posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
};

const updateQuantity = (movieId: number, quantity: number) => {
  if (quantity > 0) {
    store.dispatch('updateQuantity', { movieId, quantity });
  }
};

const confirmRemoveFromCart = (movieId: number) => {
  itemToRemove.value = movieId;
  showConfirmModal.value = true;
};

const handleConfirmRemove = () => {
  if (itemToRemove.value) {
    store.dispatch('removeFromCart', itemToRemove.value);
  }
  showConfirmModal.value = false;
  itemToRemove.value = null;
};

const handleCancelRemove = () => {
  showConfirmModal.value = false;
  itemToRemove.value = null;
};

defineOptions({
  name: 'CartSidebar'
});
</script>

<script lang="ts">
export default {
  name: 'CartSidebar'
};
</script>