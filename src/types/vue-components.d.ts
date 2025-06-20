declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "lucide-vue-next" {
  import type { FunctionalComponent } from "vue";
  export const Search: FunctionalComponent;
  export const ShoppingCart: FunctionalComponent;
  export const ShoppingBasket: FunctionalComponent;
  export const Heart: FunctionalComponent;
  export const ArrowLeft: FunctionalComponent;
  export const ArrowRight: FunctionalComponent;
  export const ChevronLeft: FunctionalComponent;
  export const ChevronRight: FunctionalComponent;
  export const AlertCircle: FunctionalComponent;
  export const AlertTriangle: FunctionalComponent;
  export const RefreshCw: FunctionalComponent;
  export const Star: FunctionalComponent;
  export const Trash2: FunctionalComponent;
  export const X: FunctionalComponent;
  export const Minus: FunctionalComponent;
  export const Plus: FunctionalComponent;
  export const Trash: FunctionalComponent;
  export const Truck: FunctionalComponent;
  export const ShieldCheck: FunctionalComponent;
  export const Gift: FunctionalComponent;
}
