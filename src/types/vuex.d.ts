// @ts-ignore
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

declare module "vuex" {
  // @ts-ignore
  export * from "vuex/types/index.d.ts";
  export function useStore<T = any>(): Store<T>;
}
