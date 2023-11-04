<template>
  <div class="product-detail-modal">
    <div class="product-detail-modal__overlay" @click="closeModal"></div>
    <div class="product-detail-modal__content">
      <div class="product-detail-modal__header">
        <button>
          <img src="../assets/close-button.svg" alt="" @click="closeModal" />
        </button>
      </div>
      <div class="product-detail-modal__body">
        <div class="product-detail-modal__image-title">
          <img
            class="product-detail-modal__image"
            :src="`https://image.tmdb.org/t/p/original` + product.backdrop_path"
            :alt="`Poster of '` + product.title + `'`"
          />
          <div class="product-detail-modal__title-action">
            <span class="product-detail-modal__title">{{ title }}</span>
            <div class="button-group">
              <button class="button play-button">
                <img src="../assets/play-button.svg" alt="" />
                Riproduci
              </button>
              <button @click="addProductToList" class="button add-to-list-button">
                <img src="../assets/add-to-list.svg" alt="Add to list button" />
              </button>
            </div>
          </div>
        </div>
        <div class="product-detail-modal__meta">
          <product-detail-meta>
            <template v-slot:name>Trama</template>
            <p v-html="product.overview"></p>
          </product-detail-meta>
          <product-detail-meta>
            <template v-slot:name>Data d'uscita</template>
            {{ release_date }}
          </product-detail-meta>
          <product-detail-meta>
            <template v-slot:name>Valutazione</template>
            {{ product.vote_average }}
          </product-detail-meta>
        </div>
      </div>

      <div class="product-detail-modal__footer"></div>
    </div>
  </div>
</template>

<script>
import ProductDetailMeta from './ProductDetailMeta.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProductDetailMeta
  },
  props: ['product'],
  beforeMount() {
    this.$store.dispatch('fetchMovieDetails', this.product.id)
  },
  computed: {
    ...mapGetters(['movieDetails', 'isMovieDetailsLoading']),
    title() {
      if (this.product.media_type == 'movie') {
        return this.product.title
      } else {
        return this.product.name
      }
    },
    release_date() {
      if (this.product.media_type == 'movie') {
        return this.product.release_date
      } else {
        return this.product.first_air_date
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    addProductToList() {
      this.$store.dispatch('addProduct', this.product.id)
    }
  }
}
</script>

<style scoped lang="scss">
.product-detail-modal {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  &__content {
    overflow-y: auto;
    max-height: 80vh;
    background-color: #181818;
    z-index: 20;
    width: 80%;
    max-width: 1000px;
    color: white;
    position: relative;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0) 0px 7px 29px 0px;

    @media screen and (max-width: 577px) {
      width: 95%;
    }
  }

  &__header {
    button {
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      border: 0;
      outline: 0;
      background-color: transparent;
      border-radius: 50%;
      background-color: #181818;
      display: flex;
      align-items: center;
      padding: 7px;
      z-index: 10;
      img {
        width: 17px;
        height: 17px;
      }
    }
  }

  &__image-title {
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;

      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.3) 25%,
        rgba(242, 242, 242, 0) 40%
      );
    }
  }

  &__image {
    width: 100%;
    border-radius: 4px;
  }

  &__title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    text-shadow: 0px 0px 30px black;

    @media screen and (max-width: 768px) {
      width: 85%;
    }

    @media screen and (max-width: 370px) {
      width: 90%;
    }
  }

  &__title-action {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    position: absolute;
    bottom: 5%;
    left: 5%;
    z-index: 10;

    width: 45%;
  }

  &__meta {
    padding: 2rem 5%;
  }

  .play-button {
    border: 0;
    outline: 0;
    height: 35px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: clamp(0.6rem, 4vw, 0.875rem);
    font-weight: 600;
    padding: 0 clamp(12px, 4vw, 25px);
    margin: 4px;

    @media screen and (max-width: 370px) {
      height: 30px;
    }

    img {
      width: 17px;
      height: 19px;

      @media screen and (max-width: 370px) {
        width: 15px;
        height: 13px;
      }
    }
  }

  .add-to-list-button {
    border: 2px solid grey;
    background-color: rgba(42, 42, 42, 0.6);
    width: 35px;
    height: 35px;
    margin: 4px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border: 2px solid rgb(229, 229, 229);
    }

    @media screen and (max-width: 370px) {
      width: 30px;
      height: 30px;
    }

    img {
      width: 17px;
      height: 17px;

      @media screen and (max-width: 370px) {
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>
