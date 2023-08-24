<template>
  <div class="product-card">
    <div class="product-card__image-container">
      <img :src="product.imageUrl" :alt="product.title" class="product-card__image" />
    </div>
    <div class="product-card__details">
      <div class="product-card__title">{{ product.title }}</div>
      <div class="product-card__actions">
        <button class="product-card__button play-button">
          <img src="../assets/play-button.svg" alt="Play button" />
        </button>
        <button class="product-card__button add-to-list-button">
          <img src="../assets/add-to-list.svg" alt="Add to list button" />
        </button>
        <button class="product-card__button expand-button">
          <img src="../assets/expand-button.svg" alt="Expand button" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
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
    transition: 0.4s all ease-in-out;
    transform: scale(1.1);
    pointer-events: auto;
    #{$self}__details {
      opacity: 1;
    }
  }

  &__image-container {
    img {
      width: 100%;
      pointer-events: auto;
    }
  }
  &__details {
    opacity: 0;
    padding: 16px;
    background-color: #141414;
  }
  &__title {
    color: white;
    margin-bottom: 10px;
    font-weight: 500;
  }

  &__actions {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: row;
  }

  &__button {
    border: 2px solid grey;
    background-color: transparent;
    width: 42px;
    height: 42px;
    margin: 4px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border: 2px solid rgb(229, 229, 229);
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
}
.play-button {
  border: 0;
  background-color: white;
  padding-left: 10px;

  &:hover {
    border: 0;
  }
}

.add-to-list-button {
  img {
    width: 22px;
    height: 22px;
  }
}
.expand-button {
  margin-left: 30px;
  padding-top: 6px;

  img {
    width: 20px;
    height: 11px;
  }
}
</style>
