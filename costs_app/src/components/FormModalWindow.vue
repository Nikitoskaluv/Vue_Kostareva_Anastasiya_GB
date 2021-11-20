<template>
  <div class="wrapper" v-if="settings !== null">
    <div class="header">{{ settings.title }}</div>
    <div class="content">
      <component :is="settings.content" :data="formData" />
      <!--
        <add-payment-form
        v-if="settings.content === 'payment'"
      />
      <auth-form v-if="settings.content === 'auth'" /> -->
    </div>
    <div class="footer">
      <button @click="onClose">Close</button>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from "./AddPaymentForm.vue";
import AuthForm from "./AuthForm.vue";
export default {
  components: { AddPaymentForm, AuthForm },
  name: "FormModalWindow",
  props: {
    settings: Object,
  },
  methods: {
    onClose() {
      this.$modal.hide();
    },
  },
  computed: {
    formData() {
      if (this.settings.content === "AddPaymentForm") {
        return this.settings.data;
      }
      return undefined;
    },
  },
};
</script>

<style scoped>
.wrapper {
  box-shadow: 0 0 6px 1px black;
  padding: 10px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 50%;
  background: white;
}
.overlay {
  z-index: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(68, 61, 61);
}
.content {
  position: relative;
  z-index: 100;
}
</style>