<template>
  <div>
    <div :class="[$style.wrapper]">
      <header>
        <div :class="$style.header">My personal costs</div>
        <h3>Total value: {{ getFPV }}</h3>
      </header>
      <main>
        <!-- <show-form-button
          @clicked="showForm"
          :visible="addPaymentFormVisibility"
        /> -->

        <payments-display :items="currentElements" />
        <pagination-comp
          @paginate="changePage"
          :pageCount="pageCount"
          :currentPage="pageNumber"
          :pageSize="pageSize"
        />
        <button @click="openModalAddPaymentForm">Add</button>
      </main>
    </div>
  </div>
</template>
<script>
// import AddPaymentForm from "../components/AddPaymentForm.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
// import ShowFormButton from "../components/ShowFormButton.vue";
import PaginationComp from "../components/PaginationComp.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    PaginationComp,
  },
  props: {
    addPaymentFoodValue: String,
    addPaymentTransportValue: String,
    addPaymentEntertainmentValue: String,
    addPaymentFormVisibilityProp: Boolean,
    addPaymentFormCategory: String,
  },
  data() {
    return {
      addPaymentDialogVisibility: false,
      addPaymentFormVisibility: false,
      addPaymentFormDate: "",
      addPaymentCategoty: "",
      addPaymentValue: "",
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
    changePage(p) {
      this.pageNumber = p;
      this.$store.dispatch("fetchData", p);
    },
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    checkFormAndSave() {
      let item = {
        value: parseInt(this.addPaymentValue),
        category: this.addPaymentCategoty,
      };
      this.addDataToPaymentList(item);
      this.addPaymentFormVisibility = false;
      this.addPaymentCategoty = "";
      this.addPaymentValue = "";
    },
    openModalAddPaymentForm() {
      this.$modal.show("payment", {
        title: "Добавление платежа",
        content: "AddPaymentForm",
        data: {},
      });
      // this.$emit("openModalWindow", {
      //   title: "Add payment cost",
      //   content: "payment",
      // });
    },
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
  mounted() {
    console.log("f", this.addPaymentFoodValue);
    console.log("t", this.addPaymentTransportValue);
    console.log("e", this.addPaymentEntertainmentValue);
    if (this.addPaymentFormVisibilityProp) {
      this.addPaymentFormVisibility = true;
      this.addPaymentFormDate = this.getCurrentDate();
      this.addPaymentCategoty = this.addPaymentFormCategory;
    }
    if (this.addPaymentFoodValue) {
      this.addPaymentValue = this.addPaymentFoodValue;
      this.checkFormAndSave();
    } else if (this.addPaymentTransportValue) {
      this.addPaymentValue = this.addPaymentTransportValue;
      this.checkFormAndSave();
    } else if (this.addPaymentEntertainmentValue) {
      this.addPaymentValue = this.addPaymentEntertainmentValue;
      this.checkFormAndSave();
    }

    const page = this.$route.params.page;
    if (page) {
      this.changePage(Number(page) - 1);
    } else {
      this.changePage(0);
    }
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
