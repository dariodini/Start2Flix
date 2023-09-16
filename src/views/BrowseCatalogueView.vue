<template>
  <product-section
    :isProductsLoading="isMoviesLoading"
    :products="movies"
    title="Movies"
    @open-modal="openModal"
  ></product-section>

  <product-section
    :isProductsLoading="isSeriesLoading"
    :products="series"
    title="Series"
    @open-modal="openModal"
  ></product-section>

  <product-detail-modal
    :product="selectedProduct"
    v-if="showModal"
    @close-modal="closeModal"
  ></product-detail-modal>
</template>

<script>
import ProductSection from "../components/ProductSection.vue";
import ProductDetailModal from "../components/ProductDetailModal.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductDetailModal,
    ProductSection,
  },
  data() {
    return {
      showModal: false,
      selectedProduct: null,
    };
  },
  async beforeMount() {
    await this.$store.dispatch("fetchMovies");
    await this.$store.dispatch("fetchSeries");
  },
  computed: {
    ...mapGetters(["movies", "isMoviesLoading", "series", "isSeriesLoading"]),
  },
  created() {
    this.emitter.on("open-modal", this.handleOpenModal);
  },
  methods: {
    openModal(product) {
      this.showModal = true;
      this.selectedProduct = product;
    },
    closeModal() {
      this.showModal = false;
    },
    handleOpenModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
  },
};
</script>
