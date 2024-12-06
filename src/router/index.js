import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassifticationView from '@/views/ClassifticationView.vue'
import TimelineView from '@/views/TimelineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/forest_front/',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/classification',
      name: 'classification',
      component: ClassifticationView
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimelineView
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/views/Article.vue')
    }
  ],
})

export default router


