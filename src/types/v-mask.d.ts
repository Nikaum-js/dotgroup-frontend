declare module "v-mask" {
  import { DirectiveFunction } from "vue";
  export const VueMaskDirective: DirectiveFunction;
  export const VueMaskFilter: {
    filter(text: string, mask: string): string;
  };
}
