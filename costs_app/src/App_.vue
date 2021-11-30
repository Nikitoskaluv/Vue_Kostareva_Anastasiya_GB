<template>
  <div id="app" @click="appClick">
    <nav>
      <router-link to="/dashboard">Dashboard</router-link> /
      <router-link to="/about">About</router-link> /
      <router-link to="/not-found">NotFound</router-link> /
    </nav>
    <main>
      <router-view />
      <transition name="fade"
        ><form-modal-window :settings="modalSettings" v-if="modalName"
      /></transition>
      <transition name="fade">
        <context-menu v-if="ctxShown" :item="selectedRow" :pos="ctxPos" />
      </transition>
    </main>
  </div>
</template>

<script>
import ContextMenu from "./components/ContextMenu.vue";
// import FormModalWindow from "./components/FormModalWindow.vue";
export default {
  components: {
    FormModalWindow: () => import("./components/FormModalWindow.vue"),
    ContextMenu,
  },
  name: "App",
  methods: {
    appClick() {
      this.$ctxMenu.hide();
    },
    onShown(settings) {
      this.modalName = settings.name;
      this.modalSettings = settings.settings;
    },
    onHide() {
      this.modalSettings = {};
      this.modalName = "";
    },
    onCtxShow(item, pos) {
      this.ctxPos = pos;
      this.ctxShown = true;
      this.selectedRow = item;
    },
    onCtxHide() {
      this.ctxShown = false;
    },
  },

  //   onOpenModalWindow(e) {
  //     this.settings = {
  //       title: e.title,
  //       content: e.content,
  //     };
  //   },
  //   onModalClose() {
  //     this.settings = null;
  //   },
  // },
  data() {
    return {
      settings: null,
      selectedRow: {},
      modalSettings: {},
      modalName: "",
      ctxShown: false,
      ctxPos: {},
    };
  },
  created() {
    this.$store.dispatch("fetchData", 0);
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
    this.$ctxMenu.EventBus.$on("hide", this.onCtxHide);
    this.$ctxMenu.EventBus.$on("show", this.onCtxShow);
  },
};
</script>
<style lang="scss">
#app {
  height: 100%;
}
main {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
button {
  margin-top: 30px;
  width: 40%;
  height: 35px;
  background-color: #1e90ff;
  color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  border: 1px white solid;
  margin: 30px auto;
}
</style>
