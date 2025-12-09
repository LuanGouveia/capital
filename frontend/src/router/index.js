import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

import RegisterView from '@/views/RegisterView.vue'
import ManagementView from '@/views/ManagementView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

function isTokenValid() {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch {
    return false
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/management',
      name: 'management',
      component: ManagementView,
      beforeEnter: (to, from, next) => {
        if (isTokenValid()) {
          next()
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          next('/login')
        }
      },
    },
  ],
})

export default router
