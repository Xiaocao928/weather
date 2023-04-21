import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/XzdWeather/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/XzdWeather/TheMain.vue'),
      },
      {
        path: 'weather/result',
        component: () => import('@/views/XzdWeather/TheResult.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
