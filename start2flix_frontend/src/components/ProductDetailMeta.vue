<template>
  <div class="product-detail-meta">
    <span class="product-detail-meta__name"> <slot name="name"></slot>:</span>

    <span class="product-detail-meta__content">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.product-detail-meta {
  margin-bottom: 1.5rem;
  &__name {
    display: block;
    font-size: clamp(0.7rem, 4vw, 0.9rem);
    margin-bottom: 0.5rem;
    color: #777;
  }
  &__content {
    font-size: clamp(0.8rem, 4vw, 1rem);
  }
}
</style>
