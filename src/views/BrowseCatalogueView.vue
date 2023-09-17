<template>
  <div v-if="!isFiltered">
    <product-section
      :isProductsLoading="isMoviesLoading"
      :products="movies"
      title="Movies"
    ></product-section>

    <product-section
      :isProductsLoading="isSeriesLoading"
      :products="series"
      title="Series"
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
    await this.$store.dispatch('fetchSeries')
  },
  computed: {
    ...mapGetters([
      'movies',
      'isMoviesLoading',
      'series',
      'isSeriesLoading',
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
