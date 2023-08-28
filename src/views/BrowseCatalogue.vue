<template>
  <div class="products-container" v-if="!isMoviesLoading">
    <div class="section movies" v-if="movies.results.length > 0">
      <div class="section__title"><span>Movies</span></div>
      <div class="row">
        <div
          v-for="product in movies.results"
          :key="product.id"
          class="product col-xl-2 col-lg-3 col-md-4 col-sm-6 col-4"
        >
          <product-card :product="product" @open-modal="openModal"></product-card>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Caricamento in corso...</div>
</template>

<script>
import ProductCard from '../components/productcard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
  async beforeMount() {
    await this.$store.dispatch('fetchMovies')
  },
  computed: {
    ...mapGetters(['movies', 'isMoviesLoading'])
  },
};
</script>
