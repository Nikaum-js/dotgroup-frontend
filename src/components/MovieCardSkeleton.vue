<template>
  <div class="movie-card bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-gray-800/50">
    <div class="relative aspect-[2/3] overflow-hidden bg-gray-800/50">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent skeleton-shine"></div>
    </div>

    <div class="p-3 sm:p-4">
      <div class="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <div class="h-5 sm:h-6 w-14 sm:w-16 bg-gray-800/50 rounded-full skeleton-pulse"></div>
        <div class="h-5 sm:h-6 w-14 sm:w-16 bg-gray-800/50 rounded-full skeleton-pulse"></div>
      </div>
      
      <div class="h-5 sm:h-6 w-3/4 bg-gray-800/50 rounded-lg mb-1.5 sm:mb-2 skeleton-pulse"></div>

      <div class="flex items-center justify-between">
        <div class="h-6 sm:h-7 w-16 sm:w-20 bg-gray-800/50 rounded-lg skeleton-pulse"></div>
        <div class="h-8 w-8 sm:h-10 sm:w-10 bg-gray-800/50 rounded-lg skeleton-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MovieCardSkeleton'
});
</script>

<script lang="ts">
export default {
  name: 'MovieCardSkeleton'
};
</script>

<style scoped>
.skeleton-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-shine {
  animation: shine 1.5s linear infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

@keyframes shine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

.movie-card {
  isolation: isolate;
}
</style> 