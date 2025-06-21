import { customRef, onUnmounted } from "vue";

export function useDebouncedRef<T>(initialValue: T, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>;
  let innerValue = initialValue;

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout);
  });

  return customRef((track: () => void, trigger: () => void) => ({
    get() {
      track();
      return innerValue;
    },
    set(newValue: T) {
      innerValue = newValue;
      trigger();

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        trigger();
      }, delay);
    },
  }));
}
