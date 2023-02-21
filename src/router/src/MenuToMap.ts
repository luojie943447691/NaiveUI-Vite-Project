import { DefineMenu } from "../../runtime/defineMenus";
import { Nullable } from "../../types";

export function MenuToMap(
  menus: Nullable<DefineMenu[]>,
  result: Record<string, DefineMenu> = {}
) {
  if (!menus) return result;
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (menu.children) {
      result[menu.path] = menu;
      MenuToMap(menu.children, result);
    } else {
      result[menu.path] = menu;
    }
  }

  return result;
}
