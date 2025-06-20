declare module "vue" {
  export * from "@vue/runtime-core";
  export const ref: any;
  export const computed: any;
  export const reactive: any;
  export const watch: any;
  export const onMounted: any;
  export const nextTick: any;
  export const customRef: any;
  export const onUnmounted: any;
  export const createApp: any;
  export const defineProps: any;
  export const defineEmits: any;
  export const defineOptions: any;
}

declare module "vue-router" {
  export * from "@vue/router";
  export function useRouter(): any;
  export function useRoute(): any;
  export function createRouter(options: any): any;
  export function createWebHistory(base?: string): any;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: any;
    $route: any;
  }
}

declare module "@vue/router" {
  export interface RouteLocationNormalized {
    params: Record<string, string | string[]>;
    query: Record<string, string | string[]>;
    hash: string;
    path: string;
    fullPath: string;
    matched: RouteRecord[];
    name: string | null | undefined;
    redirectedFrom: RouteLocationNormalized | undefined;
    meta: Record<string | number | symbol, any>;
  }

  export interface RouteRecord {
    path: string;
    redirect?: string;
    name?: string;
    meta?: Record<string | number | symbol, any>;
    aliasOf?: RouteRecord;
    beforeEnter?: NavigationGuard;
    props?: Record<string, any>;
    children?: RouteRecord[];
  }

  export type NavigationGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: (to?: any) => void
  ) => any;
}
