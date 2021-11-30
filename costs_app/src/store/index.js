import Vue from "vue";
import Vuex from "vuex";
const data = require("../assets/data.json");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    pagesCount: 0,
    serverData: data,
    summ: 0,
  },

  mutations: {
    deletePaymentData(state, item) {
      let rows = state.paymentsList;
      let filteredRows = rows.filter((r) => r.id !== item.id);
      state.paymentsList = [...filteredRows];
    },
    setPaymentListData(state, payload) {
      state.paymentsList = payload;
    },
    addPaymentListData(state, payload) {
      payload.id = data.length + 1;
      state.serverData.push(payload);
    },
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    setSumm(state, summ) {
      state.summ = summ;
    },
  },
  actions: {
    fetchData({ state, dispatch }, options) {
      return new Promise((resolve) => {

        setTimeout(() => {
          const itemsFromServer = state.serverData.slice(
            (options.page - 1) * options.itemsPerPage, options.page * options.itemsPerPage);
          resolve(itemsFromServer);
        }, 600);
      }).then(
        (items) => {
          dispatch("upgradeData", [...items]);
        },
        (err) => console.error(err)
      );
    },
    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = ["Sport", "Food", "Education", "Internet"];
          resolve(items);
        }, 500);
      }).then((res) => {
        commit("setCategoryList", res);
      });
    },
    upgradeData({ commit, dispatch }, payload) {
      dispatch("fetchCategoryList");
      commit("setPaymentListData", payload);
    },
    addData(context, payload) {
      console.log(context, payload);
    },
  },
  getters: {
    getTotal: (state) => state.serverData.length,
    getPaymentsList: (state) => state.paymentsList,
    getCategoryList: (state) => state.categoryList,
    getPageCount: (state) => state.pagesCount,
    getFullPaymentValue: (state) => state.summ,
  },
});
