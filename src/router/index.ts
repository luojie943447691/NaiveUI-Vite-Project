import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import menus from "../runtime/defineMenus";
import { PatchRouter } from "./src/PatchRouter";

console.log("routes", routes);

routes.push({
  path: "/",
  redirect: "/test-page",
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

PatchRouter({ menus })(router);

export default router;
