import Vue from "vue";
import App from "./App_.vue";
import router from "./router";
import store from "./store";
import modal from "./plugins/ModalWindow";
import ctxMenu from "./plugins/ContextMenu";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(modal);
Vue.use(ctxMenu);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
