import { createRouter, createWebHashHistory } from 'vue-router'
import defineInitialState from '@/runtime/defineInitialState'
import { defineAccessState } from '../runtime/defineAccessState'
import defineMenus from '../runtime/defineMenus'
import { PatchRouter } from './src/PatchRouter'
import routes from '~pages'

console.log('routes', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

PatchRouter({ defineMenus, defineAccessState, defineInitialState })(router)

export default router
