<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-2">My presonal cost</div>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark v-on="on"
              >ADD NEW COST<v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <add-payment-form :data="dialogData" @close="closeDialog" />
        </v-dialog>

        <v-data-table
          dense
          :options.sync="options"
          :server-items-length="total"
          :headers="headers"
          :items="paymentsList"
          item-key="name"
          class="elevation-1 mt-4"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-2">Chart</div>
        <d-chart :chData="chartData"></d-chart>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import AddPaymentForm from "../components/AddPaymentForm.vue";

import DChart from "../components/DChart.vue";
export default {
  name: "Dashboard",
  components: {
    AddPaymentForm,
    DChart,
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
      dialog: false,
      chartData: {},
      editedIndex: -1,
      addPaymentDialogVisibility: false,
      addPaymentFormVisibility: false,
      addPaymentFormDate: "",
      addPaymentCategoty: "",
      addPaymentValue: "",
      options: {},
      dialogData: {},
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Date", value: "date", sortable: false },
        { text: "Category", value: "category", sortable: false },
        { text: "Value", value: "value", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ...mapMutations({
      addData: "addPaymentListData",
    }),

    addDataToPaymentList(item) {
      this.addData(item);
    },
    closeDialog() {
      if (this.editedIndex < 0) {
        this.addDataToPaymentList(this.dialogData);
      }
      this.dialog = false;
      this.$nextTick(() => {
        this.dialogData = {};
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.paymentsList.indexOf(item);
      this.dialogData = item;
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store.commit("deletePaymentData", item);
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
    getDataFromApi() {
      this.$store.dispatch("fetchData", this.options);
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
      category: "getCategoryList",
      total: "getTotal",
    }),
  },
  watch: {
    paymentsList: {
      handler(v) {
        const s = {
          Sport: 0,
          Food: 0,
          Education: 0,
          Internet: 0,
        };

        v.forEach((e) => {
          s[e.category] += e.value;
        });

        this.chartData = s;
      },
      deep: true,
    },
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    this.getDataFromApi();
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
