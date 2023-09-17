import { createRouter, createWebHistory } from 'vue-router'

import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import CreateProfileView from '../views/CreateProfileView.vue'
import SelectProfileView from '../views/SelectProfileView.vue'
import BrowseCatalogueView from '../views/BrowseCatalogueView.vue'
import BrowseMyListView from '../views/BrowseMyListView.vue'

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
    },
    {
      path: '/signup',
      component: SignupView,
      meta: {
        showLoginButton: true
      }
    },
    {
      path: '/create-profile',
      component: CreateProfileView,
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
      component: BrowseCatalogueView,
      name: 'homepage'
    },
    {
      path: '/browse/my-list',
      component: BrowseMyListView
    }
  ]
})

export default router
