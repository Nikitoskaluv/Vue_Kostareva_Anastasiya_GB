<template>
  <v-card class="text-left pa-8">
    <v-text-field label="Value" v-model.number="data.value"></v-text-field>
    <v-menu
      v-model="dp"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="data.date"
          label="Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="data.date" @input="dp = false"></v-date-picker>
    </v-menu>
    <v-select
      :items="getCategoryList"
      label="Category"
      v-model="data.category"
    ></v-select>
    <v-btn @click="onSave">Save</v-btn>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddPaymentForm",
  data() {
    return {
      selected: "",
      dp: false,
    };
  },
  props: {
    data: Object,
  },

  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    ...mapGetters(["getCategoryList"]),
  },

  methods: {
    ...mapActions(["fetchCategoryList"]),
    onChange(event) {
      debugger;
      this.$emit("input", event.target.value);
    },
    onSave() {
      this.$emit("close");
    },
  },
  mounted() {
    if (!this.getCategoryList?.length) {
      this.fetchCategoryList();
    }
  },
};
</script>
<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 20%;
}
input {
  margin-top: 30px;
  height: 35px;
}
</style>
