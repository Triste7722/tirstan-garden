import { createRouter, createWebHistory } from 'vue-router'

import { site } from '@/config/site'
import AboutPage from '@/pages/AboutPage.vue'
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import PostDetail from '@/pages/PostDetail.vue'
import PostsPage from '@/pages/PostsPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: `首页 · ${site.name}` },
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsPage,
      meta: { title: `文章 · ${site.name}` },
    },
    {
      path: '/posts/:id(\\d+)',
      name: 'post-detail',
      component: PostDetail,
      meta: { title: `文章 · ${site.name}` },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { title: `关于 · ${site.name}` },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      meta: { title: `页面不存在 · ${site.name}` },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ?? site.title
})

export default router
