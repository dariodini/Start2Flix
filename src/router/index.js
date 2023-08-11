import { createRouter, createWebHistory } from 'vue-router';

import SignupView from '../views/SignupView.vue';
import LoginView from '../views/LoginView.vue';
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingView },
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignupView },
  ]
})

export default router
