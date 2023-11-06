import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tabOverzicht'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tabOverzicht'
      },
      {
        path: 'tabOverzicht',
        component: () => import('@/views/TabOverzicht.vue')
      },
      {
        path: 'tabAbout',
        component: () => import('@/views/TabAbout.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
