<template>
  <v-container>
    <div class="wrapper">
      <v-row>
        <v-col :cols="1">#</v-col>
        <v-col :cols="3">Date</v-col>
        <v-col :cols="4">Category</v-col>
        <v-col :cols="3">Value</v-col>
        <v-col :cols="1">...</v-col>
      </v-row>
      <v-row v-for="(item, idx) in items" :key="idx">
        <v-col :cols="1">{{ item.id }}</v-col>
        <v-col :cols="3">{{ item.date }}</v-col>
        <v-col :cols="4">{{ item.category }}</v-col>
        <v-col :cols="3">{{ item.value }}</v-col>
        <v-col :cols="1">...</v-col>
      </v-row>

      <tr v-if="items.length === 0">
        <td>No data</td>
      </tr>

      <td @click="contextMenu(item, $event)" style="cursor: pointer">...</td>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    contextMenu(item, e) {
      this.$ctxMenu.show(item, {
        x: e.pageX,
        y: e.pageY - 70,
      });
      e.preventDefault();
      e.stopPropagation();
    },
  },
  data() {
    return {
      headers: ["№", "Date", "Category", "Value"],
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 40%;
}
table {
  width: 100%;
}
thead th:nth-child(1) {
  width: 10%;
}
thead th:nth-child(2) {
  width: 30%;
}
thead th:nth-child(3) {
  width: 30%;
}
thead th:nth-child(4) {
  width: 30%;
}
tbody td {
  text-align: center;
}
tr {
  height: 35px;
}
tr:hover {
  background-color: #f5f5f5;
}
th,
td {
  border-bottom: 1px solid gray;
}
</style>
