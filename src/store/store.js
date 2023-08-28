import { createStore } from 'vuex';
import createPersistedState from "vuex-plugin-persistedstate";
import axios from 'axios';

const store = createStore({
  state: {
    email: null
  },
  getters: {
    getEmail(state) {
      return state.email;
    }
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    }
  },
  actions: {
    updateEmail({ commit }, email) {
  plugins: [createPersistedState()],
});

export default store;
