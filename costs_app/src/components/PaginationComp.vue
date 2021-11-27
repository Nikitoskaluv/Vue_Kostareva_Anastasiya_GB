<template>
  <div class="pagination_container">
    <button type="button" @click="onClick(currentPage - 1)">&#10094;</button>
    <button
      type="button"
      :class="{ active: currentPage === item - 1 }"
      v-for="item in pageCount"
      :key="item"
      @click="onClick(item - 1)"
    >
      {{ item }}
    </button>
    <button type="button" @click="onClick(currentPage + 1)">&#10095;</button>
  </div>
</template>

<script>
export default {
  name: "PaginationComp",
  props: {
    pageCount: Number,
    pageSize: Number,
    currentPage: Number,
  },
  data() {
    return {};
  },
  methods: {
    onClick(p) {
      if (p < 0 || p >= this.pageCount) {
        return;
      }
      this.$emit("paginate", p);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
button {
  width: 2%;
}
.active {
  color: #1e90ff;
  background-color: white;
  border: 2px solid #1e90ff;
}
</style>
