<template>
  <div class="index-content row">
    <h2 class="index-content__index col-md-3">
      <slot name="index"></slot>
    </h2>
    <div class="index-content__content col-md-9">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.index-content {
  border-top: 1px solid #999;
  padding: 1rem 0;

  &__index {
    font-size: 1.25rem;
    font-weight: 300;
    text-transform: uppercase;

    color: #737373;
  }

  &__content {
    padding-left: 2rem;
  }
}
</style>
