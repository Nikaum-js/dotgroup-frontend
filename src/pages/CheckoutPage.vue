<template>
  <div class="min-h-screen bg-gray-950 py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8 flex items-center gap-4">
        <router-link 
          to="/" 
          class="text-gray-400 hover:text-red-500 transition-colors"
        >
          <ArrowLeft class="h-6 w-6" />
        </router-link>
        <h1 class="text-2xl font-semibold text-gray-100">Checkout</h1>
      </div>

      <div v-if="!cartItems.length" class="text-center py-12">
        <ShoppingCart class="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <p class="text-gray-400 text-lg mb-2">Seu carrinho está vazio</p>
        <router-link 
          to="/"
          class="text-red-500 hover:text-red-400 transition-colors inline-flex items-center gap-2 mt-4"
        >
          <ArrowLeft class="h-4 w-4" />
          Voltar para a loja
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CheckoutForm 
            @submit="handleCheckoutSubmit"
            @modal-close="handleModalClose"
          />
        </div>

        <div class="bg-gray-900/50 rounded-xl border border-gray-800/50 p-6 h-fit">
          <h2 class="text-xl font-semibold text-gray-100 mb-6">Resumo do Pedido</h2>
          
          <div class="space-y-4 mb-6">
            <div 
              v-for="item in cartItems" 
              :key="item.id"
              class="flex gap-4 py-4 border-b border-gray-800/50 last:border-0"
            >
              <img 
                :src="getPosterUrl(item.poster_path)"
                :alt="item.title"
                class="h-24 w-16 object-cover rounded-md"
                @error="handleImageError"
              >
              <div class="flex-1">
                <h3 class="text-gray-100 font-medium mb-1">{{ item.title }}</h3>
                <div class="flex justify-between items-center">
                  <p class="text-gray-400 text-sm">
                    Quantidade: {{ item.quantity }}
                  </p>
                  <p class="text-gray-400 text-sm">
                    {{ formatPrice(item.price * item.quantity) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-800/50">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-300">Total de Itens:</span>
              <span class="text-gray-100">{{ cartTotal }}</span>
            </div>
            <div class="flex justify-between items-center text-lg font-semibold">
              <span class="text-gray-300">Valor Total:</span>
              <span class="text-red-500">
                {{ formatPrice(cartTotalPrice) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ArrowLeft, ShoppingCart } from 'lucide-vue-next';
import CheckoutForm from '../components/CheckoutForm.vue';
import { formatPrice } from '../utils/price';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.getters.cartItems);
const cartTotal = computed(() => store.getters.cartTotal);
const cartTotalPrice = computed(() => store.getters.cartTotalPrice);

const getPosterUrl = (posterPath: string | null) => {
  return posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://placehold.co/400x600/1f2937/64748b?text=Não+Possui+Poster';
};

const handleCheckoutSubmit = async (formData: any) => {
  console.log('Formulário de checkout:', { formData, items: cartItems.value });
};

const handleModalClose = () => {
  store.dispatch('clearCart');
  router.push('/');
};

defineOptions({
  name: 'CheckoutPage'
});
</script>