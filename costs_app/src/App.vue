<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="$style.header">My personal costs</div>
        <h3>Total value: {{ getFPV }}</h3>
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
          :pageCount="pageCount"
          :currentPage="pageNumber"
          :pageSize="pageSize"
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
import { mapMutations, mapGetters } from "vuex";

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
      visible: false,
      pageNumber: 0,
      pageSize: 10,
    };
  },

  methods: {
    ...mapMutations({
      addData: "addPaymentListData",
    }),
    addDataToPaymentList(item) {
      this.addData(item);
    },
    showForm() {
      console.log("кнопка работает");
      this.visible = !this.visible;
    },
    changePage(p) {
      this.pageNumber = p;
      this.$store.dispatch("fetchData", p);
    },
  },
  created() {
    this.$store.dispatch("fetchData", 0);
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
      category: "getCategoryList",
      pagesCount: "getPageCount",
    }),
    currentElements() {
      return this.paymentsList;
    },
    getFPV() {
      return this.$store.getters.getFullPaymentValue;
    },
    pageCount() {
      return this.pagesCount;
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
