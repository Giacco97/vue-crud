import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/Users/View.vue'
import UsersCreate from '../views/Users/Create.vue'
import UsersEdit from '../views/Users/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/create',
      name: 'usersCreate',
      component: UsersCreate
    },
    {
      path: '/users/edit/:id',
      name: 'usersEdit',
      component: UsersEdit
    },

  ]
})

export default router
