import Vue from "vue";
import Vuex from "vuex";
const data = require("../assets/data.json");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    pages: {},
    pagesCount: 0,
    summ: 0
  },
  mutations: {
    setPaymentListData(state, payload) {
      state.paymentsList = payload;
    },
    addPaymentListData(state, payload) {
      let lastPageName = "page 0";
      let pageNames = Object.keys(data);
      if (pageNames) {
        lastPageName = pageNames[pageNames.length - 1];
      }
      let pageItems = data[lastPageName];
      payload.id = pageItems[pageItems.length - 1].id + 1;
      if (pageItems.length < 10) {
        pageItems.push(payload);
      } else {
        let nextPageNumber = parseInt(lastPageName.split(' ')[1]) + 1;
        data[`page ${nextPageNumber}`] = [];
        data[`page ${nextPageNumber}`].push(payload);
      }

      state.pagesCount = Object.keys(data).length;
      let summ = 0;
      for (let page of Object.keys(data)) {
        console.log(page);
        summ += data[page].reduce((s, c) => s + c.value, 0);
      }
      state.summ = summ;
    },
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    updatePages(state, payload) {
      state.pages[payload.name] = payload.items;
    },
    setPagesCount(state, count) {
      state.pagesCount = count;
    },
    setSumm(state, summ) {
      state.summ = summ;
    }
  },
  actions: {
    fetchData({ commit, dispatch }, pageNumber) {
      return new Promise(resolve => {
        let itemsFromState = this.state.pages[`${pageNumber}`];
        if (itemsFromState) {
          resolve(itemsFromState);
        } else {
          setTimeout(() => {
            const itemsFromServer = data["page " + (pageNumber + 1)];
            resolve(itemsFromServer);
          }, 1000);
        }
      }).then(
        items => {
          if (!this.state.pages[`${pageNumber}`]) {
            commit('updatePages', { name: `${pageNumber}`, items: items });
          }
          commit('setPagesCount', Object.keys(data).length);
          dispatch('upgradeData', [...items]);
          let summ = 0;
          for (let page of Object.keys(data)) {
            console.log(page);
            summ += data[page].reduce((s, c) => s + c.value, 0);
          }
          commit('setSumm', summ);
        },
        err => console.error(err));
    },
    fetchCategoryList({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const items = ['Sport', 'Food', 'Education', 'Internet'];
          resolve(items);
        }, 500);
      }).then(res => {
        commit('setCategoryList', res);
      });
    },
    upgradeData({ commit, dispatch }, payload) {
      dispatch('fetchCategoryList')
      commit('setPaymentListData', payload);
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getCategoryList: state => state.categoryList,
    getPageCount: state => state.pagesCount,
    getFullPaymentValue: state => state.summ,
  }
});
