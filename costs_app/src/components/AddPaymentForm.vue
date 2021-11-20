<template>
  <div class="form">
    <input placeholder="Value" type="number" v-model="data.value" />
    <input placeholder="Category" v-model="data.category" />
    <select-category v-model="data.category" />
    <input placeholder="Date" v-model="data.date" />
    <button @click="onSave">Save</button>
  </div>
</template>
<script>
import SelectCategory from "./SelectCategory.vue";

export default {
  components: { SelectCategory },
  name: "AddPaymentForm",
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
  },

  methods: {
    onSave() {
      const data = {
        value: parseInt(this.data.value),
        category: this.data.category,
        date: this.data.date || this.getCurrentDate,
      };
      this.$emit("addNewPayment", data);
    },
  },
};
</script>
<style lang="scss" >
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
