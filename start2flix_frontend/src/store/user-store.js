import axios from 'axios'

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
    axios
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
      const response = await axios.post(
        'http://127.0.0.1:8000/api/utente/login', userData, {
        withCredentials: true
      });
      const user = response.data;
      commit('SET_USER', user.id);
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  async addProfile({ commit }, userData) {
    axios
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
      const response = await axios.get(
        'http://127.0.0.1:8000/api/utente/profili', {
        withCredentials: true
      })
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
      const response = await axios.post(
        'http://127.0.0.1:8000/api/utente/profilo/set', formData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async checkUserStatus({ dispatch }) {
    try {
      await axios.get('http://127.0.0.1:8000/api/utente/stato', {
        withCredentials: true
      });
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
  async addProduct({ commit }, prodottoId) {
    try {
      const formData = new FormData()
      formData.append('prodottoId', JSON.stringify(prodottoId))
      await axios.post('http://127.0.0.1:8000/api/profilo/add-product', formData, {
        withCredentials: true
      });
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
