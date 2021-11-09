<template>
  <div id="app">
    <nav>
      <a href="#dashboard">Dashboard</a> / <a href="#about">About</a> /
      <a href="#notfound">404</a> /
    </nav>
    <dashboard v-if="pageName === 'dashboard'" />
    <not-found v-if="pageName === 'notfound'" />
    <about v-if="pageName === 'about'" />
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
import Dashboard from "./views/Dashboard.vue";
import NotFound from "./views/NotFound.vue";
import About from "./views/About.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    ShowFormButton,
    PaginationComp,
    Dashboard,
    NotFound,
    About,
  },

  data() {
    return {
      visible: false,
      pageNumber: 0,
      pageSize: 10,
      pageName: "",
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
    setPage() {
      this.pageName = location.hash.slice(1);
    },
  },
  created() {
    this.$store.dispatch("fetchData", 0);
  },
  mounted() {
    this.setPage();
    window.addEventListener("hashchange", this.setPage);
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
