import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { PatchRouter } from "./PatchRouter";
import menus from "../runtime/defineMenus";

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
