<template>
  <div class="product-card">
    <div class="product-card__image-container" @click="openModal">
      <img
        :src="`https://image.tmdb.org/t/p/w780${product.poster_path}`"
        :alt="`Poster of '${product.title}'`"
        class="product-card__image d-block w-100"
      />
    </div>

    <div class="product-card__details">
      <div class="product-card__title">
        {{ title }}
      </div>
      <div class="product-card__actions">
        <div class="button-group">
          <button class="product-card__button play-button">
            <img src="../assets/play-button.svg" alt="Play button" />
          </button>
          <button class="product-card__button add-to-list-button">
            <img src="../assets/add-to-list.svg" alt="Add to list button" />
          </button>
        </div>
        <button class="product-card__button expand-button">
          <img src="../assets/expand-button.svg" alt="Expand button" @click="openModal" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    title() {
      if (this.props.product.media_type == 'movie') {
        return this.props.product.title
      } else {
        return this.props.product.name
      }
    }
  },
  methods: {
    openModal() {
      this.emitter.emit('open-modal', this.product)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  $self: &;
  transform-origin: center center;
  pointer-events: none;

  transform-origin: center;
  transition: 0.3s all ease-in-out;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    transition: 0.3s all ease-in-out;
    transform: scale(1.03);
    pointer-events: auto;

    #{$self}__details {
      opacity: 1;

      @media screen and (max-width: 576px) {
        opacity: 0;
      }
    }

    @media screen and (max-width: 576px) {
      transform: initial;
      box-shadow: none;
    }
  }

  &__image-container {
    img {
      width: 100%;
      cursor: pointer;
      pointer-events: auto;
    }
  }
  &__details {
    opacity: 0;
    padding: 14px;
    background-color: #141414;
    transition: 0.3s all ease-in-out;

    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  &__title {
    color: white;
    margin-bottom: 10px;
    font-weight: 500;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  &__button {
    border: 2px solid grey;
    background-color: transparent;
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

    img {
      width: 17px;
      height: 17px;
    }
  }
}

.play-button {
  border: 0;
  background-color: white;
  padding-left: 10px;

  @media screen and (min-width: 1050px) {
    padding-left: 6px;
  }

  @media screen and (min-width: 900px) {
    padding-left: 8px;
  }

  &:hover {
    border: 0;
  }
}

.expand-button {
  padding-top: 5px;
}
</style>
