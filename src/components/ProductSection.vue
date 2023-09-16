<template>
  <div class="products-container" v-if="!isProductsLoading">
    <div class="section" v-if="exists">
      <div class="section__title">
        <span>{{ title }}</span>
      </div>
      <div class="row-slider">
        <button class="carousel-button prev-button" @click="scrollLeft">
          <img src="../assets/left-arrow.svg" alt="" class="carousel-button-icon" />
        </button>
        <div class="row" :ref="computedRefName">
          <div
            v-for="product in products.results"
            :key="product.id"
            class="product col-xl-2 col-lg-3 col-md-4 col-sm-6 col-4"
          >
            <product-card :product="product"></product-card>
          </div>
        </div>
        <button class="carousel-button next-button" @click="scrollRight">
          <img src="../assets/right-arrow.svg" alt="" class="carousel-button-icon" />
        </button>
      </div>
    </div>
  </div>
  <div v-else>Caricamento in corso...</div>
</template>

<script>
import ProductCard from './productcard.vue'

export default {
  props: ['isProductsLoading', 'products', 'title'],
  components: {
    ProductCard
  },
  computed: {
    exists() {
      return this.products.results?.length > 0
    },
    computedRefName() {
      return this.title + '-row'
    }
  },
  methods: {
    scrollLeft() {
      this.$refs[this.computedRefName].scrollLeft -= 200
    },
    scrollRight() {
      this.$refs[this.computedRefName].scrollLeft += 200
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  .row-slider {
    position: relative;
  }

  .row {
    padding: 1rem;
    flex-wrap: nowrap;
    overflow: auto;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    .product {
      scroll-snap-align: start;
      transition: box-shadow 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }
  .carousel-button {
    position: absolute;
    top: 35%;
    z-index: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    font-size: 2rem;
    border: none;
    border-radius: 50%;
    background: radial-gradient(rgb(164, 164, 164), rgba(0, 0, 0, 0));
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media screen and (min-width: 1200px) and (max-width: 1367px) {
      top: 30%;
    }
    @media screen and (max-width: 576px) {
      display: none;
    }

    &:hover {
      .carousel-button-icon {
        transform: scale(1.1);
      }
    }
    .carousel-button-icon {
      width: 40px;
    }

    &.prev-button {
      left: 0;
    }

    &.next-button {
      right: 0;
    }
  }
}
</style>
