import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    islogin: false,
    userInfo: {},
    token: localStorage.getItem("chat_token")
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    islogin(state) {
      return state.isLogin;
    }
  },

  mutations: {
    changeUserinfo(state, data) {
      state.userInfo = data;
    },
    islogin(state, data) {
      state.isLogin = data;
    }
  },
  actions: {
    changeUserinfo(context, data) {
      console.info(data,673726372637236);
      context.commit("changeUserinfo", data);
    },
    islogin(context, data) {
      context.commit("islogin", data);
    }
  }
});

export default Store;
