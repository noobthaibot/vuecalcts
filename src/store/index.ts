import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
type Cart = {
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    setCart: (state: any, item: Cart) => {
      if (item.name && item.price && item.quantity) {
        return state.cart.push(item);
      } else {
        alert("please enter valid values");
      }
    },
    deleteItem: (state: any) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].checked === true) {
          state.cart.splice(i, 1);
        }
      }
    },
    setCheckboxes: (state) => {
      state.cart.map((el: Cart) => {
        el.checked = true;
      });
    },
  },
  plugins: [createPersistedState()],
  actions: {
    addItemToCart({ commit }, item: Cart) {
      commit("setCart", item);
    },
    deleteItemFromCart({ commit }, item) {
      commit("deleteItem", item);
    },
    checkItems({ commit }, item) {
      commit("setCheckboxes", item);
    },
  },
  modules: {},
  getters: {
    cart(state) {
      return state.cart;
    },
  },
});
