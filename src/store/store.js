import { createStore } from 'vuex';
// import createPersistedState from "vuex-plugin-persistedstate";
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const store = createStore({
  state: {
    email: null,
    movies: [],
    isMoviesLoading: false,
    movieDetails: [],
    ismovieDetailsLoading: false,
    series: [],
    isSeriesLoading: false,
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
    movieDetails(state){
      return state.movieDetails
    },
    isMovieDetailsLoading(state){
      return state.ismovieDetailsLoading
    },
    series(state){
      return state.series
    },
    isSeriesLoading(state){
      return state.isSeriesLoading
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
    SET_MOVIE_DETAILS(state, movieDetails){
      state.movieDetails = movieDetails
    },
    SET_MOVIE_DETAILS_LOADING(state, isMovieDetailsLoading){
      state.ismovieDetailsLoading = isMovieDetailsLoading
    },
    SET_SERIES(state, series){
      state.series = series
    },
    SET_SERIES_LOADING(state, isSeriesLoading){
      state.isSeriesLoading = isSeriesLoading
    },
  },
  actions: {
    updateEmail({ commit }, email) {
      commit('SET_EMAIL', email);
    },
    async fetchMovies({commit}){
      commit('SET_MOVIES_LOADING', true);
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/movie/day?language=it-IT&${API_KEY}`,
        headers: {
          accept: 'application/json',
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
    async fetchMovieDetails({commit}, id){
      commit('SET_MOVIE_DETAILS_LOADING', true);
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}?language=it-IT&${API_KEY}`,
        headers: {
          accept: 'application/json',
        }
      };
      try {
        const response = await axios.request(options);
        commit('SET_MOVIE_DETAILS', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_MOVIE_DETAILS_LOADING', false);
      }
    },
    async fetchSeries({commit}){
      commit('SET_SERIES_LOADING', true);
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/tv/day?language=it-IT&${API_KEY}`,
        headers: {
          accept: 'application/json',
        }
      };
      try {
        const response = await axios.request(options);
        commit('SET_SERIES', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_SERIES_LOADING', false);
      }
    },
  },
  // plugins: [createPersistedState()],
});

export default store;
