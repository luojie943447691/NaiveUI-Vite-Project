import { LayoutInfo } from "./types";

export function useLayoutInfo() {
  const layoutInfoRef = ref<LayoutInfo>();

  return layoutInfoRef;
}
