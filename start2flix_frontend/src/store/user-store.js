import axios from 'axios'

const axiosCredentials = axios.create({
  withCredentials: true,
})

const state = {
  email: null,
  user: null,
  profiles: null,
  profile: null,
};

const getters = {
  getEmail(state) {
    return state.email
  },
  user(state) {
    return state.user
  },
  profiles(state) {
    return state.profiles
  },
  profile(state) {
    return state.profile
  },
};

const mutations = {
  SET_EMAIL(state, email) {
    state.email = email
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_PROFILES(state, profiles) {
    state.profiles = profiles
  },
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
};

const actions = {
  updateEmail({ commit }, email) {
    commit('SET_EMAIL', email)
  },
  async registerUser({ commit }, userData) {
    axiosCredentials
      .post('http://127.0.0.1:8000/api/utente', userData)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  async loginUser({ commit }, userData) {
    try {
      const response = await axiosCredentials.post(
        'http://127.0.0.1:8000/api/utente/login', userData);
      const user = response.data;
      commit('SET_USER', user.id);
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  async logoutUser({ dispatch }) {
    try {
      axiosCredentials.get('http://127.0.0.1:8000/api/utente/logout');
      dispatch('resetUser')
    } catch (error) {
      console.error(error);
    }
  },
  async addProfile({ commit }, userData) {
    axiosCredentials
      .post('http://127.0.0.1:8000/api/utente/profilo', userData)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  async getProfiles({ commit }) {
    try {
      const response = await axiosCredentials.get(
        'http://127.0.0.1:8000/api/utente/profili')
      commit('SET_PROFILES', response.data)
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async selectProfile({ commit }, data) {
    commit('SET_PROFILE', data);
    try {
      const formData = new FormData()
      formData.append('profile', JSON.stringify(data))
      const response = await axiosCredentials.post(
        'http://127.0.0.1:8000/api/utente/profilo/set', formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async checkUserStatus({ dispatch }) {
    try {
      await axiosCredentials.get('http://127.0.0.1:8000/api/utente/stato');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch('resetUser')
      }
    }
  },
  resetUser({ commit }) {
    commit('SET_USER', null);
    commit('SET_PROFILE', null);
    commit('SET_PROFILES', null);
  },
  async addProduct({ commit }, payload) {
    try {
      const formData = new FormData()
      formData.append('prodottoId', JSON.stringify(payload.productId))
      formData.append('type', payload.type)
      await axiosCredentials.post('http://127.0.0.1:8000/api/profilo/add-product', formData);
    } catch (error) {
      console.log(error)
    }
  },
  async removeProduct({ commit }, prodottoId) {
    try {
      const formData = new FormData()
      formData.append('prodottoId', JSON.stringify(prodottoId))
      await axiosCredentials.post('http://127.0.0.1:8000/api/profilo/remove-product', formData);
    } catch (error) {
      console.log(error)
    }
  },
  async checkProductInList({ commit }, prodottoId) {
    try {
      const formData = new FormData()
      formData.append('prodottoId', JSON.stringify(prodottoId))
      const response = await axiosCredentials.post('http://127.0.0.1:8000/api/profilo/check-product', formData);
      if (response && response.status === 200) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
