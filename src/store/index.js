import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loginState: '',
    Authorization: '',
    centerDialogVisible: false,
    toPath: '',
    username: '',
  },
  mutations: {

    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      state.username = user.username;
      state.loginState = true;
      console.log("store/index.js---到这里了!");
    },
    deleteLogin(state) {
      state.Authorization = '';
      state.loginState = false;
    },
    showDialog(state, val) {
      state.centerDialogVisible = val
    },
    savaToPath(state, path) {
      state.toPath = path
    }
  }
})

export default store
