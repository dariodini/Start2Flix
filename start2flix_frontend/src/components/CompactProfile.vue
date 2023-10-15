<template>
  <button type="button">
    <img :src="$helpers.getImagePath(profile.image)" />
    <template v-if="!noName">
      {{ profile.nome }}
    </template>
  </button>
</template>

<script>
export default {
  props: ['profile', 'noName'],
  computed: {
    hideHeader() {
      return this.$route.meta.hideHeader
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  img {
    border-radius: 3px;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
</style>
