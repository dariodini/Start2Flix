<template>
  <div v-if="!isFiltered">
    <product-section
      :isProductsLoading="isMoviesLoading"
      :products="movies"
      title="Film"
    ></product-section>

    <product-section
      :isProductsLoading="isPopularMoviesLoading"
      :products="popularMovies"
      title="Film più popolari"
    ></product-section>

    <product-section
      :isProductsLoading="isTopRatedMoviesLoading"
      :products="topRatedMovies"
      title="Film più visti di sempre"
    ></product-section>

    <product-section
      :isProductsLoading="isSeriesLoading"
      :products="series"
      title="Serie TV"
    ></product-section>

    <product-section
      :isProductsLoading="isPopularSeriesLoading"
      :products="popularSeries"
      title="Serie TV più popolari"
    ></product-section>

    <product-section
      :isProductsLoading="isTopRatedSeriesLoading"
      :products="topRatedSeries"
      title="Serie TV più viste di sempre"
    ></product-section>
  </div>

  <div v-else>
    <product-section
      :notCarousel="true"
      :isProductsLoading="isFilteredProductsLoading"
      :products="filteredProducts"
      title="Titoli che potrebbero corrispondere con quello che stai cercando:"
    ></product-section>
  </div>

  <product-detail-modal
    :product="selectedProduct"
    v-if="showModal"
    @close-modal="closeModal"
  ></product-detail-modal>
</template>

<script>
import ProductSection from '../components/ProductSection.vue'
import ProductDetailModal from '../components/ProductDetailModal.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProductDetailModal,
    ProductSection
  },
  data() {
    return {
      showModal: false,
      selectedProduct: null,
      isFiltered: false
    }
  },
  async beforeMount() {
    await this.$store.dispatch('fetchMovies')
    await this.$store.dispatch('fetchPopularMovies')
    await this.$store.dispatch('fetchTopRatedMovies')
    await this.$store.dispatch('fetchSeries')
    await this.$store.dispatch('fetchPopularSeries')
    await this.$store.dispatch('fetchTopRatedSeries')
  },
  computed: {
    ...mapGetters([
      'movies',
      'isMoviesLoading',
      'topRatedMovies',
      'isTopRatedMoviesLoading',
      'popularMovies',
      'isPopularMoviesLoading',
      'series',
      'isSeriesLoading',
      'popularSeries',
      'isPopularSeriesLoading',
      'topRatedSeries',
      'isTopRatedSeriesLoading',
      'filteredProducts',
      'isFilteredProductsLoading'
    ])
  },
  created() {
    this.emitter.on('open-modal', this.handleOpenModal)
    this.emitter.on('filter-products', this.filterResults)
  },
  methods: {
    openModal(product) {
      this.showModal = true
      this.selectedProduct = product
    },
    closeModal() {
      this.showModal = false
    },
    handleOpenModal(product) {
      this.selectedProduct = product
      this.showModal = true
    },
    async filterResults(terms) {
      if (terms.length > 0) {
        this.isFiltered = true
        await this.$store.dispatch('filterProducts', terms)
      } else this.isFiltered = false
    }
  }
}
</script>
