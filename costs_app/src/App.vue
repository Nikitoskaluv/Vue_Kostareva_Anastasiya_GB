<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="$style.header">My personal costs</div>
      </header>
      <main>
        <show-form-button @clicked="showForm" :visible="visible" />
        <add-payment-form
          @addNewPayment="addDataToPaymentList"
          :visible="visible"
        />
        <payments-display :items="currentElements" />
        <pagination-comp
          @paginate="changePage"
          :length="paymentsList.length"
          :cur="page"
          :n="count"
        />
      </main>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from "./components/AddPaymentForm.vue";
import PaymentsDisplay from "./components/PaymentsDisplay";
import ShowFormButton from "./components/ShowFormButton";
import PaginationComp from "./components/PaginationComp";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    ShowFormButton,
    PaginationComp,
  },

  data() {
    return {
      paymentsList: [],
      visible: false,
      page: 1,
      count: 10,
    };
  },
  methods: {
    fetchData() {
      const items = [];
      for (let i = 1; i < 100; i++) {
        items.push({
          id: i,
          date: "28.03.2020",
          category: "Food",
          value: 169,
        });
      }
      return items;
    },
    addDataToPaymentList(item) {
      item.id = this.paymentsList.length + 1;
      this.paymentsList.push(item);
    },
    showForm() {
      console.log("кнопка работает");
      this.visible = !this.visible;
    },
    changePage(p) {
      this.page = p;
      console.log(p);
    },
  },
  created() {
    this.paymentsList = this.fetchData();
  },
  computed: {
    currentElements() {
      const { count, page } = this;
      return this.paymentsList.slice(
        count * (page - 1),
        count * (page - 1) + count
      );
    },
  },
};
</script>



<style lang="scss" module>
.header {
  color: black;
  margin-top: 50px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  font-size: 30px;
}
</style>
