import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tabHome'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tabHome'
      },
      {
        path: 'tabHome',
        component: () => import('@/views/TabHome.vue')
      },
      {
        path: 'tabOverzicht',
        component: () => import('@/views/TabOverzicht.vue')
      },
      {
        path: 'tabLijsten',
        component: () => import('@/views/TabLijsten.vue')
      },
      {
        path: 'tabAbout',
        component: () => import('@/views/TabAbout.vue')
      },
      {
        path: 'tabSetting',
        component: () => import('@/views/Tabsetting.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
