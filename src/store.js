import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tree: {}
  },
  mutations: {
    SET_TREE(state, payload) {
      state.tree = payload;
    },
  },
  actions: {
    GET_TREE: ({ commit }) => {
      api.getData().then(r => {
        console.log(r)
        commit('SET_TREE', r.base);
      })
    },
  },
  getters: {
    tree(state) {
      return state.tree
    },
  },
  plugins: [createPersistedState()],
})
