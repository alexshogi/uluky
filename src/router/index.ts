import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WelcomeView from '../views/WelcomeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/welcome', component: WelcomeView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;