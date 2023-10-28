import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store.js'

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
      name: 'landing',
      meta: {
        showLoginButton: true
      }
    },
    {
      path: '/login',
      component: LoginView,
      name: 'login',
    },
    {
      path: '/signup',
      component: SignupView,
      name: 'signup',
      meta: {
        showLoginButton: true
      }
    },
    {
      path: '/create-profile',
      component: CreateProfileView,
      name: 'create-profile',
    },
    {
      path: '/select-profile',
      component: SelectProfileView,
      name: 'select-profile',
      meta: {
        hideHeader: true
      }
    },
    {
      path: '/browse',
      component: BrowseCatalogueView,
      name: 'homepage',
      meta: {
        showForm: true,
        showProfiles: true,
        logoSmall: true,
      }
    },
    {
      path: '/browse/my-list',
      component: BrowseMyListView,
      name: 'my-list',
      meta: {
        showProfiles: true,
        logoSmall: true,
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('checkUserStatus');
  next();
});

export default router
