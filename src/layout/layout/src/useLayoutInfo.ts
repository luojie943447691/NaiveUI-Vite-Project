import { LayoutInfo } from "./types";

export function useLayoutInfo() {
  const layoutInfoRef = ref<LayoutInfo>();

  // 优先url 传递的

  // 配置传递的

  return layoutInfoRef;
}
