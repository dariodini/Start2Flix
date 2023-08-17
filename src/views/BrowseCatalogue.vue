<template>
  <div class="row">
    <div
      v-for="product in products"
      :key="product"
      class="col col-lg-2 col-md-4 col-sm-6 col-12 gy-5"
    >
      <product-card :product="product"></product-card>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [
        {
          title: 'Stranger Things',
          imageUrl: 'src/assets/stranger-things.jpeg'
        },
        {
          title: 'Stranger Things',
          imageUrl: 'src/assets/stranger-things.jpeg'
        },
        {
          title: 'Stranger Things',
          imageUrl: 'src/assets/stranger-things.jpeg'
        },
        {
          title: 'Stranger Things',
          imageUrl: 'src/assets/stranger-things.jpeg'
        }
      ]
    }
  }
}
</script>
