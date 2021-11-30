import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
// import About from '../views/About.vue';
// import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/*webpackChunkName: 'Dashboard'*/ "../views/Dashboard.vue"),
  },
  {
    path: "/dashboard/:page",
    name: "Dashboard",
    component: () =>
      import(/*webpackChunkName: 'Dashboard'*/ "../views/Dashboard.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/*webpackChunkName: 'About'*/ "../views/About.vue"),
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: () =>
      import(/*webpackChunkName: 'NotFound'*/ "../views/NotFound.vue"),
  },
  {
    path: "/add/payment/Food",
    component: Dashboard,
    props: (route) => ({
      addPaymentFoodValue: route.query.value,
      addPaymentFormVisibilityProp: true,
      addPaymentFormCategory: "Food",
    }),
  },
  {
    path: "/add/payment/Transport",
    component: Dashboard,
    props: (route) => ({
      addPaymentTransportValue: route.query.value,
      addPaymentFormVisibilityProp: true,
      addPaymentFormCategory: "Transport",
    }),
  },
  {
    path: "/add/payment/Entertainment",
    component: Dashboard,
    props: (route) => ({
      addPaymentEntertainmentValue: route.query.value,
      addPaymentFormVisibilityProp: true,
      addPaymentFormCategory: "Entertainment",
    }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
