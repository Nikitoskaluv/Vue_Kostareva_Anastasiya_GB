<template>
  <div>
    <button @click="openAuthForm">Need Auth</button>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  methods: {
    openAuthForm() {
      this.$modal.show("auth", {
        title: "Authorize",
        content: "AuthForm",
      });
    },
  },
};
</script>
<style lang="sss" scoped></style>
