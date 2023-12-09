import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/store.js'

import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import CreateProfileView from '../views/CreateProfileView.vue'
import SelectProfileView from '../views/SelectProfileView.vue'
import BrowseCatalogueView from '../views/BrowseCatalogueView.vue'
import BrowseMyListView from '../views/BrowseMyListView.vue'
import ManageAccountView from '../views/ManageAccountView.vue'
import ManageProfileView from '../views/ManageProfileView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: LandingView,
      name: 'landing',
      meta: {
        showLoginButton: true
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next('/browse');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      component: LoginView,
      name: 'login',
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next('/browse');
        } else {
          next();
        }
      }
    },
    {
      path: '/signup',
      component: SignupView,
      name: 'signup',
      meta: {
        showLoginButton: true
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next('/browse');
        } else {
          next();
        }
      }
    },
    {
      path: '/create-profile',
      component: CreateProfileView,
      name: 'create-profile',
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/select-profile',
      component: SelectProfileView,
      name: 'select-profile',
      meta: {
        hideHeader: true
      },
      beforeEnter: (to, from, next) => {
        store.dispatch('getProfiles').then(() => {
          if (store.getters.user) {
            if (store.getters.profiles && store.getters.profiles.length){
              next()
            } else{
              next('/create-profile');
            }
          } else {
            next('/login');
          }
        })
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
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          if (store.getters.profile){
            next();
          }
          else{
            next('/select-profile')
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/browse/my-list',
      component: BrowseMyListView,
      name: 'my-list',
      meta: {
        showProfiles: true,
        logoSmall: true,
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          if (store.getters.profile){
            next();
          }
          else{
            next('/select-profile')
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/manage-account',
      component: ManageAccountView,
      name: 'manage-account',
      meta: {
        showProfiles: true,
        logoSmall: true,
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          if (store.getters.profile){
            next();
          }
          else{
            next('/select-profile')
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/manage-profiles',
      component: SelectProfileView,
      name: 'manage-profiles',
      meta: {
        hideHeader: true,
        manageProfile: true,
      },
    },
    {
      path: '/manage-profile/:id',
      component: ManageProfileView,
      name: 'manage-profile',
      meta: {
        hideHeader: true,
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('checkUserStatus');
  next();
});

export default router
