import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/dashboard/:page',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound,
  }


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
