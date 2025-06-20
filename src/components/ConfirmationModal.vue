<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 bg-gray-950/50 backdrop-blur-sm transition-opacity duration-300 z-[80]"
    @click="$emit('close')"
  >
    <div 
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full max-w-[320px] sm:max-w-md bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 shadow-xl rounded-lg sm:rounded-xl p-4 sm:p-6 transform transition-all duration-300 z-[90]"
      :class="{ 'scale-95 opacity-0': !isOpen, 'scale-100 opacity-100': isOpen }"
      @click.stop
    >
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-950/50 mb-3 sm:mb-4">
          <AlertTriangle class="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
        </div>
        <h3 class="text-base sm:text-lg font-medium text-gray-100 mb-1.5 sm:mb-2">{{ title }}</h3>
        <p class="text-xs sm:text-sm text-gray-400">{{ message }}</p>
      </div>
      
      <div class="mt-4 sm:mt-6 flex gap-2 sm:gap-3 justify-center">
        <button
          @click="$emit('close')"
          class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/80 text-gray-300 rounded-lg hover:bg-gray-700/80 transition-colors text-xs sm:text-sm"
        >
          Cancelar
        </button>
        <button
          @click="$emit('confirm')"
          class="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';

defineProps<{
  isOpen: boolean;
  title: string;
  message: string;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

defineOptions({
  name: 'ConfirmationModal'
});
</script>

<script lang="ts">
export default {
  name: 'ConfirmationModal'
};
</script> 