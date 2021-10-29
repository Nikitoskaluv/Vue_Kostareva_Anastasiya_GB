<template>
  <div class="pagination_container">
    <button type="button" @click="onClick(cur - 1)">&#10094;</button>
    <button
      type="button"
      :class="{ active: cur === item }"
      v-for="item in amount"
      :key="item"
      @click="onClick(item)"
    >
      {{ item }}
    </button>
    <button type="button" @click="onClick(cur + 1)">&#10095;</button>
  </div>
</template>


<script>
export default {
  name: "PaginationComp",
  props: {
    length: Number,
    n: Number,
    cur: Number,
  },
  data() {
    return {};
  },
  methods: {
    onClick(p) {
      if (p < 1 || p > this.amount) {
        return;
      }
      this.$emit("paginate", p);
    },
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.n);
    },
  },
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