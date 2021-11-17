<template>
  <div id="app">
    <nav>
      <router-link to="/dashboard">Dashboard</router-link> /
      <router-link to="/about">About</router-link> /
      <router-link to="/not-found">NotFound</router-link> /
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",

  created() {
    this.$store.dispatch("fetchData", 0);
  },
  mounted() {},
};
</script>
<style lang="sss" scoped>
</style>



