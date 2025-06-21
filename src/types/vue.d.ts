declare module "vue" {
  export * from "@vue/runtime-core";
}

declare module "vue-router" {
  export * from "@vue/router";
}

import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: any;
    $route: any;
    $store: any;
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
