import { createRouter, createWebHistory } from 'vue-router'
import { allRoutes } from '~/router/routes.ts'
import { META_DATA } from '~/config/constants.ts'
import { useAuthStore } from '~/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes,
})

const publicRoutePrefixes = ['/auth', '/error']

router.beforeEach(async (to, from, next) => {
  const title = to.meta.title ? to.meta.title + ' | ' + META_DATA.title : META_DATA.title
  if (title) {
    document.title = title.toString()
  }

  const authStore = useAuthStore()
  await authStore.init()

  const isPublicRoute = publicRoutePrefixes.some((prefix) => to.path.startsWith(prefix))

  if (!authStore.isAuthenticated && !isPublicRoute) {
    next({ path: '/auth/sign-in', query: { redirect: to.fullPath } })
    return
  }

  if (authStore.isAuthenticated && to.path.startsWith('/auth/sign-in')) {
    next('/')
    return
  }

  next()
})

export default router
