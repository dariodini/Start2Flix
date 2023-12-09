import axios from 'axios'
const API_KEY = import.meta.env.VITE_APP_API_KEY

const state = {
  movies: [],
  isMoviesLoading: false,
  popularMovies:[],
  isPopularMoviesLoading: false,
  topRatedMovies:[],
  isTopRatedMoviesLoading: false,
  movieDetails: [],
  ismovieDetailsLoading: false,
  series: [],
  isSeriesLoading: false,
  popularSeries: [],
  isPopularSeriesLoading: false,
  topRatedSeries: [],
  isTopRatedSeriesLoading: false,
  filteredProducts: [],
  isFilteredProductsLoading: false,
  productsInList: [],
  productsInListLoading: false
}

const getters = {
  movies(state) {
    return state.movies
  },
  isMoviesLoading(state) {
    return state.isMoviesLoading
  },
  popularMovies(state) {
    return state.popularMovies
  },
  isPopularMoviesLoading(state) {
    return state.isPopularMoviesLoading
  },
  topRatedMovies(state) {
    return state.topRatedMovies
  },
  isTopRatedMoviesLoading(state) {
    return state.isTopRatedMoviesLoading
  },
  movieDetails(state) {
    return state.movieDetails
  },
  isMovieDetailsLoading(state) {
    return state.ismovieDetailsLoading
  },
  series(state) {
    return state.series
  },
  isSeriesLoading(state) {
    return state.isSeriesLoading
  },
  popularSeries(state) {
    return state.popularSeries
  },
  isPopularSeriesLoading(state) {
    return state.isPopularSeriesLoading
  },
  topRatedSeries(state) {
    return state.topRatedSeries
  },
  isTopRatedSeriesLoading(state) {
    return state.isTopRatedSeriesLoading
  },
  filteredProducts(state) {
    return state.filteredProducts
  },
  isFilteredProductsLoading(state) {
    return state.isFilteredProductsLoading
  },
  productsInList(state) {
    return state.productsInList
  },
  productsInListLoading(state) {
    return state.productsInListLoading
  }
}

const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies
  },
  SET_MOVIES_LOADING(state, isMoviesLoading) {
    state.isMoviesLoading = isMoviesLoading
  },
  SET_POPULAR_MOVIES(state, popularMovies) {
    state.popularMovies = popularMovies
  },
  SET_POPULAR_MOVIES_LOADING(state, isPopularMoviesLoading) {
    state.isPopularMoviesLoading = isPopularMoviesLoading
  },
  SET_TOP_RATED_MOVIES(state, topRatedMovies) {
    state.topRatedMovies = topRatedMovies
  },
  SET_TOP_RATED_MOVIES_LOADING(state, isTopRatedMoviesLoading) {
    state.isTopRatedMoviesLoading = isTopRatedMoviesLoading
  },
  SET_MOVIE_DETAILS(state, movieDetails) {
    state.movieDetails = movieDetails
  },
  SET_MOVIE_DETAILS_LOADING(state, isMovieDetailsLoading) {
    state.ismovieDetailsLoading = isMovieDetailsLoading
  },
  SET_SERIES(state, series) {
    state.series = series
  },
  SET_SERIES_LOADING(state, isSeriesLoading) {
    state.isSeriesLoading = isSeriesLoading
  },
  SET_POPULAR_SERIES(state, popularSeries) {
    state.popularSeries = popularSeries
  },
  SET_POPULAR_SERIES_LOADING(state, isPopularSeriesLoading) {
    state.isPopularSeriesLoading = isPopularSeriesLoading
  },
  SET_TOP_RATED_SERIES(state, topRatedSeries) {
    state.topRatedSeries = topRatedSeries
  },
  SET_TOP_RATED_SERIES_LOADING(state, isTopRatedSeriesLoading) {
    state.isTopRatedSeriesLoading = isTopRatedSeriesLoading
  },
  SET_FILTEREDPRODUCTS(state, products) {
    state.filteredProducts = products
  },
  SET_FILTEREDPRODUCTS_LOADING(state, isFilteredProductsLoading) {
    state.isFilteredProductsLoading = isFilteredProductsLoading
  },
  SET_PRODUCTS_IN_LIST(state, products) {
    state.productsInList = products
  },
  SET_PRODUCTS_IN_LIST_LOADING(state, isLoading) {
    state.productsInListLoading = isLoading
  }
}

const actions = {
  async fetchMovies({ commit }) {
    commit('SET_MOVIES_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/trending/movie/day?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      const filteredData = {
        ...response.data,
        results: response.data.results.filter((data) => data.poster_path && data.backdrop_path)
      }
      commit('SET_MOVIES', filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_MOVIES_LOADING', false)
    }
  },
  async fetchPopularMovies({ commit }) {
    commit('SET_POPULAR_MOVIES_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/popular?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      const filteredData = {
        ...response.data,
        results: response.data.results.map((data) => ({
            ...data,
            media_type: 'movie'
        })).filter((data) => data.poster_path && data.backdrop_path)
      }
      commit('SET_POPULAR_MOVIES', filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_POPULAR_MOVIES_LOADING', false)
    }
  },
  async fetchTopRatedMovies({ commit }) {
    commit('SET_TOP_RATED_MOVIES_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/top_rated?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      const filteredData = {
        ...response.data,
        results: response.data.results.filter((data) => data.poster_path && data.backdrop_path)
      }
      commit('SET_TOP_RATED_MOVIES', filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_TOP_RATED_MOVIES_LOADING', false)
    }
  },
  async fetchMovieDetails({ commit }, id) {
    commit('SET_MOVIE_DETAILS_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      commit('SET_MOVIE_DETAILS', response.data)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_MOVIE_DETAILS_LOADING', false)
    }
  },
  async fetchSeries({ commit }) {
    commit('SET_SERIES_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/trending/tv/day?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      const filteredData = {
        ...response.data,
        results: response.data.results.filter((data) => data.poster_path && data.backdrop_path)
      }
      commit('SET_SERIES', filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_SERIES_LOADING', false)
    }
  },
  async fetchPopularSeries({ commit }) {
    commit('SET_POPULAR_SERIES_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/popular?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      const filteredData = {
        ...response.data,
        results: response.data.results.map((data) => ({
            ...data,
            media_type: 'tv'
        })).filter((data) => data.poster_path && data.backdrop_path)
      }
      commit('SET_POPULAR_SERIES', filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_POPULAR_SERIES_LOADING', false)
    }
  },
  async fetchTopRatedSeries({ commit }) {
    commit('SET_TOP_RATED_SERIES_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/top_rated?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      const filteredData = {
        ...response.data,
        results: response.data.results.filter((data) => data.poster_path && data.backdrop_path)
      }
      commit('SET_TOP_RATED_SERIES', filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_TOP_RATED_SERIES_LOADING', false)
    }
  },
  async filterProducts({ commit }, terms) {
    commit('SET_FILTEREDPRODUCTS_LOADING', true)
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/multi?query=${terms}&language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request(options)
      const filteredData = {
        ...response.data,
        results: response.data.results.filter((data) => data.poster_path && data.backdrop_path)
      }
      commit('SET_FILTEREDPRODUCTS', filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      commit('SET_FILTEREDPRODUCTS_LOADING', false)
    }
  },
  async fetchProductsFromList({ commit, dispatch }) {
    commit('SET_PRODUCTS_IN_LIST_LOADING', true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/profilo/get-products', {
        withCredentials: true
      });

      if (response.data) {
        const products = { results: [] };
        const productPromises = response.data.map(async function (product) {
          try {
            const options = await dispatch('generateOptions', product);
            const responseProduct = await axios.request(options);
            return responseProduct.data;
          } catch (error) {
            console.error(error);
            return {};
          }
        });
        const resolvedProducts = await Promise.all(productPromises);
        products.results = resolvedProducts;
        commit('SET_PRODUCTS_IN_LIST', products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_PRODUCTS_IN_LIST_LOADING', false);
    }
  },
  generateOptions(context, product) {
    let type = product.type == 'movie' ? 'movie' : 'tv'
    return {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${type}/${product.fkProdottoId}?language=it-IT&${API_KEY}`,
      headers: {
        accept: 'application/json',
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
