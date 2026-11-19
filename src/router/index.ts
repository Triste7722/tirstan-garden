import { createRouter, createWebHistory } from 'vue-router'

import { HEADER_HEIGHT } from '@/config/layout'
import { site } from '@/config/site'
import AboutPage from '@/pages/AboutPage.vue'
import FriendsPage from '@/pages/FriendsPage.vue'
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import PostDetail from '@/pages/PostDetail.vue'
import PostsPage from '@/pages/PostsPage.vue'
import SkillsPage from '@/pages/SkillsPage.vue'
import TagDetailPage from '@/pages/TagDetailPage.vue'
import TagsPage from '@/pages/TagsPage.vue'

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
      path: '/tags',
      name: 'tags',
      component: TagsPage,
      meta: { title: `标签 · ${site.name}` },
    },
    {
      path: '/tags/:tag',
      name: 'tag-detail',
      component: TagDetailPage,
      meta: { title: `标签 · ${site.name}` },
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsPage,
      meta: { title: `技能 · ${site.name}` },
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsPage,
      meta: { title: `友链 · ${site.name}` },
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
    if (to.hash) return { el: to.hash, top: HEADER_HEIGHT + 16, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ?? site.title
})

export default router
