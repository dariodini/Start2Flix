<template>
  <product-section
    :notCarousel="true"
    :isProductsLoading="productsInListLoading"
    :products="productsInList"
    title="La mia lista"
    @open-modal="openModal"
  ></product-section>

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
      productsInList: {}
    }
  },
  async beforeMount() {
    await this.$store.dispatch('fetchProductsFromList')
    this.productsInList = this.$store.getters.productsInList
  },
  computed: {
    ...mapGetters(['productsInListLoading'])
  },
  created() {
    this.emitter.on('open-modal', this.handleOpenModal)
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
    }
  }
}
</script>
