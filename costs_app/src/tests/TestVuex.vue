<template>
  <div>
    <input v-model="testValue" name="testInput" />
    <button @click="onSave">Save</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "TestVuex",
  data() {
    return {
      testValue: "",
    };
  },
  methods: {
    ...mapActions(["addData"]),
    onSave() {
      const { testValue } = this;
      this.addData(testValue);
    },
  },
};
</script>
<style lang="scss">
</style>