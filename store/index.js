import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ""
  },
  getters: {

  },
  mutations: {
    //存储token
    setToken(state, data) {
      state.token = data
      uni.setStorageSync('token', token);
    }
  },
  actions: {

  }
})

export default store
