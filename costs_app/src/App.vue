<template>
  <v-app>
    <v-app-bar app flat color="teal">
      <v-btn plain :ripple="false" to="/dashboard" dark>Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/about" dark>About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
