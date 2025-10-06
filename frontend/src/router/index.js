import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '@/views/RegisterView.vue'
import ManagementView from '@/views/ManagementView.vue'
import LoginView from '@/views/LoginView.vue'

const HomeView =  {
  template: "<div><template>Welcome to Capital.</template></div>"
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {path: '/register', name: 'register', component: RegisterView},
    {
      path: '/management', 
      name: 'management', 
      component: ManagementView,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (!token) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {path: '/login', name: 'login', component: LoginView}
  ],
})

export default router