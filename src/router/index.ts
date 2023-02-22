import { createRouter, createWebHistory } from 'vue-router'
import menus from '../runtime/defineMenus'
import { PatchRouter } from './src/PatchRouter'
import routes from '~pages'

console.log('routes', routes)

routes.push({
  path: '/',
  redirect: '/test-page',
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

PatchRouter({ menus })(router)

export default router
