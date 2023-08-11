import {createStore} from 'vuex';

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
      commit('setEmail', email);
    }
  }
});

export default store
