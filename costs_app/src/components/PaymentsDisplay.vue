<template>
  <div class="wrapper">
    <section>
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items.length === 0">
            <td>No data</td>
          </tr>
          <tr v-else v-for="(item, idx) in items" :key="idx">
            <td>{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
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