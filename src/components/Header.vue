<template>
  <header class="bg-gray-900 border-b border-gray-800">
    <nav class="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8" aria-label="Top">
      <div class="flex h-14 sm:h-16 items-center justify-between">
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-1.5 sm:space-x-2">
            <span class="text-xl sm:text-2xl font-bold text-red-600">DOT</span>
            <span class="text-lg sm:text-xl font-medium text-gray-200">Group</span>
          </a>
        </div>
  
        <div class="flex items-center space-x-4 sm:space-x-6">
          <a href="/" class="text-sm sm:text-base font-medium text-gray-300 hover:text-white transition-colors">
            Home
          </a>
          <a href="/filmes" class="text-sm sm:text-base font-medium text-gray-300 hover:text-white transition-colors">
            Filmes
          </a>
          <a href="/carrinho" class="relative text-sm sm:text-base font-medium text-gray-300 hover:text-white transition-colors">
            <span class="sr-only">Carrinho</span>
            <svg 
              class="h-5 w-5 sm:h-6 sm:w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span 
              v-if="cartItemCount > 0"
              class="absolute -top-2 -right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-600 flex items-center justify-center text-xs font-medium text-white"
            >
              {{ cartItemCount }}
            </span>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  cartItemCount?: number;
}>();

defineOptions({
  name: 'Header'
});
</script> 