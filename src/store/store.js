import { createStore } from 'vuex';
import createPersistedState from "vuex-plugin-persistedstate";
import axios from 'axios';

const API_KEY = import.meta.env.VUE_APP_API_KEY;

const store = createStore({
  state: {
    email: null,
    movies: [],
    isMoviesLoading: false,
  },
  getters: {
    getEmail(state) {
      return state.email;
    },
    movies(state){
      return state.movies
    },
    isMoviesLoading(state){
      return state.isMoviesLoading
    },
  },
  mutations: {
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_MOVIES(state, movies){
      state.movies = movies
    },
    SET_MOVIES_LOADING(state, isMoviesLoading){
      state.isMoviesLoading = isMoviesLoading
    },
    }
  },
  actions: {
    updateEmail({ commit }, email) {
      commit('SET_EMAIL', email);
    },
    async fetchMovies({commit}){
      commit('SET_MOVIES_LOADING', true);
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/movie/day?language=it-IT',
        headers: {
          accept: 'application/json',
          Authorization: API_KEY
        }
      };
      try {
        const response = await axios.request(options);
        commit('SET_MOVIES', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_MOVIES_LOADING', false);
      }
    },
  plugins: [createPersistedState()],
});

export default store;
