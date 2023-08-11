import { createRouter, createWebHistory } from 'vue-router';

import SignupView from '../views/SignupView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignupView },
  ]
})

export default router
