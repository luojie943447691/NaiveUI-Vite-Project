import { Router } from "vue-router";
import { DefineMenu } from "../../runtime/defineMenus";
import { MenuToMap } from "./MenuToMap";

interface PatchRouterOption {
  menus?: DefineMenu[];
}

export function PatchRouter(options?: PatchRouterOption) {
  const { menus } = options || {};
  console.log("menus", menus);

  if (menus) {
    
  }

  const menuMap = MenuToMap(menus);

  let isFistLogin = true;

  return (router: Router) => {
    router.beforeEach((to, from) => {
      console.log("to", to);
      console.log("from", from);
      if (
        from.path === "/" &&
        menuMap["/"] &&
        menuMap["/"]["redirect"] &&
        isFistLogin
      ) {
        isFistLogin = false;
        return {
          path: menuMap["/"]["redirect"],
          replace: true,
        };
      }
    });

    router.afterEach(() => {});
  };
}
