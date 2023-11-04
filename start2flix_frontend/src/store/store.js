import { createStore } from 'vuex'
import createPersistedState from 'vuex-plugin-persistedstate'
import productStore from './products-store'
import userStore from './user-store'

const store = createStore({
  modules: {
    productStore,
    userStore,
  },
  plugins: [createPersistedState()]
});

export default store
