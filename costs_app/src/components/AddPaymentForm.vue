<template>
  <div class="form" v-if="visible">
    <input placeholder="Value" type="number" v-model="value" />
    <input placeholder="Category" v-model="category" />
    <select-category v-model="category" />
    <input placeholder="Date" v-model="date" />
    <button @click="onSave">Save</button>
  </div>
</template>
<script>
import SelectCategory from "./SelectCategory.vue";

export default {
  components: { SelectCategory },
  name: "AddPaymentForm",
  props: ["visible"],
  data() {
    return {
      value: "",
      category: "",
      date: "",
    };
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
        value: parseInt(this.value),
        category: this.category,
        date: this.date || this.getCurrentDate,
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
button {
  margin-top: 30px;
  width: 40%;
  height: 35px;
  background-color: #1e90ff;
  color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  border: 1px white solid;
  margin: 30px auto;
}
</style>
