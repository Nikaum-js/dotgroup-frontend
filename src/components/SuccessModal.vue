<template>
  <Transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  </Transition>

  <Transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-10 overflow-y-auto"
      @click="handleClose"
    >
      <div class="flex min-h-full items-end justify-center p-3 sm:p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-gray-900 px-3 sm:px-4 pb-3 sm:pb-4 pt-4 sm:pt-5 text-left shadow-xl transition-all sm:my-8 w-[90%] sm:w-full sm:max-w-sm sm:p-6"
          @click.stop
        >
          <div>
            <div class="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                class="h-5 w-5 sm:h-6 sm:w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <div class="mt-2 sm:mt-3 text-center sm:mt-5">
              <h3 class="text-base sm:text-lg font-medium leading-6 text-gray-100">
                Compra Finalizada com Sucesso!
              </h3>
              <div class="mt-1.5 sm:mt-2">
                <p class="text-xs sm:text-sm text-gray-400">
                  Obrigado pela sua compra! Em breve você receberá um e-mail com os detalhes do pedido.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-4 sm:mt-5 sm:mt-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              @click="handleClose"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const store = useStore();

const handleClose = () => {
  store.dispatch('clearCart');
  emit('close');
};

defineOptions({
  name: 'SuccessModal'
});
</script>

<script lang="ts">
export default {
  name: 'SuccessModal'
};
</script> 