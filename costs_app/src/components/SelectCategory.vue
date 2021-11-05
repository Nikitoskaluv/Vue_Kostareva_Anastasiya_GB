<template>
  <div class="selectCont">
    <select :value="value" @change="onChange($event)">
      <option v-for="option in getCategoryList" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SelectCategory",
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
  },
  methods: {
    ...mapActions(["fetchCategoryList"]),
    onChange(event) {
      this.$emit("input", event.target.value);
    },
  },

  mounted() {
    if (!this.getCategoryList?.length) {
      this.fetchCategoryList();
    }
  },
};
</script>
<style>
</style>