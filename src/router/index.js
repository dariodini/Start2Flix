import { createRouter, createWebHistory } from 'vue-router'

import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import SelectProfileView from '../views/SelectProfileView.vue'
import BrowseCatalogueView from '../views/BrowseCatalogueView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LandingView,
      meta: {
        showLoginButton: true
      }
    },
    {
      path: '/login',
      component: LoginView,
      meta: {
        showLoginButton: true
      }
    },
    {
      path: '/signup',
      component: SignupView,
      meta: {
        showLoginButton: true
      }
    },
    {
      path: '/select-profile',
      component: SelectProfileView,
      meta: {
        hideHeader: true
      }
    },
    {
      path: '/browse',
      component: BrowseCatalogueView
    },
  ]
})

export default router
